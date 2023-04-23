import Cookies from 'js-cookie';
// cookie保存的天数
import config from '@/config';
import { forEach, hasOneOf, objEqual } from '@/libs/tools';
import _ from 'underscore';
import { createHash } from 'crypto';
import html2canvas from "html2canvas";
import JSPDF from "jspdf";
import { JSEncrypt } from 'jsencrypt';

export const getRandom = () => {
  return Math.floor(Math.random() * 999999).toString();
}

export const isInPrerenderMode = window.__IS_IN_PRERENDER_MODE || false;
export const delayAfterRender = isInPrerenderMode ? 500 : 0;

export const TOKEN_KEY = 'token';
export const SESSION_KEY = 'sessionid';
export const ID_TYPE_DCT = {
  '1': '身份证',
  '2': '护照',
  '3': '其他'
};

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 });
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  else return false;
};

export const setSession = (session) => {
  Cookies.set(SESSION_KEY, session, { expires: config.cookieExpires || 1 });
};

export const getSession = () => {
  const session = Cookies.get(SESSION_KEY);
  if (session) return session;
  else return false;
};

export const removeCookies = () => {
  Cookies.remove('avatar');
  Cookies.remove('token');
  Cookies.remove('nickname');
  Cookies.remove('last_login_time');
};

export const hasChild = (item) => {
  return item.children && item.children.length !== 0;
};

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  // console.log('list: ' + JSON.stringify(list, null, 4));
  // console.log("getMenuByRouter permission: " + permission)
  let res = [];
  forEach(list, (item) => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta,
      };
      if (
        (hasChild(item) || (item.meta && item.meta.showAlways)) &&
        showThisMenuEle(item, access)
      ) {
        // console.log("item: " + JSON.stringify(item))
        obj.children = getMenuByRouter(item.children, access);
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj);
    }
  });
  return res;
};
/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = { ...homeRoute, icon: homeRoute.meta.icon };
  let routeMetched = route.matched;
  if (routeMetched.some((item) => item.name === homeRoute.name)) return [homeItem];
  let res = routeMetched
    .filter((item) => {
      return item.meta === undefined || !item.meta.hide;
    })
    .map((item) => {
      let meta = { ...item.meta };
      if (meta.title && typeof meta.title === 'function') meta.title = meta.title(route);
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: meta,
      };
      return obj;
    });
  res = res.filter((item) => {
    return !item.meta.hideInMenu;
  });
  return [{ ...homeItem, to: homeRoute.path }, ...res];
};

export const getRouteTitleHandled = (route) => {
  let router = { ...route };
  let meta = { ...route.meta };
  if (meta.title && typeof meta.title === 'function') meta.title = meta.title(router);
  router.meta = meta;
  return router;
};

export const showTitle = (item, vm) =>
  vm.$config.useI18n ? vm.$t(item.name) : (item.meta && item.meta.title) || item.name;

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = (list) => {
  localStorage.tagNaveList = JSON.stringify(list);
};
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList;
  return list ? JSON.parse(list) : [];
};

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'homePage') => {
  let i = -1;
  let len = routers.length;
  let homeRoute = {};
  while (++i < len) {
    let item = routers[i];
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children);
      if (res.name) return res;
    } else {
      if (item.name === homeName) homeRoute = item;
    }
  }
  return homeRoute;
};

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute;
  let newList = [...list];
  if (newList.findIndex((item) => item.name === name) >= 0) return newList;
  else newList.push({ name, path, meta });
  return newList;
};

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access);
  else return true;
};

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some((item) => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children);
      } else if (item.name === name) {
        return hasAccess(access, item);
      }
    });
  };

  return routePermissionJudge(routes);
};

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url) => {
  const keyValueArr = url.split('?')[1].split('&');
  let paramObj = {};
  keyValueArr.forEach((item) => {
    const keyValue = item.split('=');
    paramObj[keyValue[0]] = keyValue[1];
  });
  return paramObj;
};

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {};
  if (list.length === 2) {
    res = getHomeRoute(list);
  } else {
    const index = list.findIndex((item) => routeEqual(item, route));
    if (index === list.length - 1) res = list[list.length - 2];
    else res = list[index + 1];
  }
  return res;
};

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1;
  while (++i < times) {
    callback(i);
  }
};

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
  let nameSplit = file.name.split('.');
  let format = nameSplit[nameSplit.length - 1];
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsText(file); // 以文本格式读取
    let arr = [];
    reader.onload = function(evt) {
      let data = evt.target.result; // 读到的数据
      let pasteData = data.trim();
      arr = pasteData
        .split(/[\n\u0085\u2028\u2029]|\r\n?/g)
        .map((row) => {
          return row.split('\t');
        })
        .map((item) => {
          return item[0].split(',');
        });
      if (format === 'csv') resolve(arr);
      else reject(new Error('[Format Error]:你上传的不是Csv文件'));
    };
  });
};

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
  let columns = [];
  let tableData = [];
  if (array.length > 1) {
    let titles = array.shift();
    columns = titles.map((item) => {
      return {
        title: item,
        key: item,
      };
    });
    tableData = array.map((item) => {
      let res = {};
      item.forEach((col, i) => {
        res[titles[i]] = col;
      });
      return res;
    });
  }
  return {
    columns,
    tableData,
  };
};

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode;
    } else {
      return findNodeUpper(ele.parentNode, tag);
    }
  }
};

export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode;
  if (parentNode) {
    let classList = parentNode.classList;
    if (classList && classes.every((className) => classList.contains(className))) {
      return parentNode;
    } else {
      return findNodeUpperByClasses(parentNode, classes);
    }
  }
};

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase();
  if (ele.childNodes.length) {
    let i = -1;
    let len = ele.childNodes.length;
    while (++i < len) {
      let child = ele.childNodes[i];
      if (child.tagName === tagName) return child;
      else return findNodeDownward(child, tag);
    }
  }
};

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access);
};

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {};
  const params2 = route2.params || {};
  const query1 = route1.query || {};
  const query2 = route2.query || {};
  return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2);
};

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length;
  let res = false;
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true;
  });
  return res;
};

export const localSave = (key, value) => {
  localStorage.setItem(key, value);
};

export const localRead = (key) => {
  return localStorage.getItem(key) || '';
};

export const formatMoney = (s, type) => {
  if (/[^0-9.]/.test(s)) return '0.00';
  if (s == null || s == 'null' || s == '') return '0.00';
  s = s.toString().replace(/^(\d*)$/, '$1.');
  s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
  s = s.replace('.', ',');
  var re = /(\d)(\d{3},)/;
  while (re.test(s)) s = s.replace(re, '$1,$2');
  s = s.replace(/,(\d\d)$/, '.$1');
  if (type == 0) {
    var a = s.split('.');
    if (a[1] == '00') {
      s = a[0];
    }
  }
  return s;
};

// 合并数组，且去重
export const concatArray = (array, uniq = true) => {
  if (!_.isArray(array)) {
    return array;
  }
  let arr = Array.prototype.concat.apply([], array);
  return uniq ? _.uniq(arr) : arr;
};

export const setUserName = (username) => {
  Cookies.set('username', username, { expires: config.cookieExpires || 1 || 1 })
}

export const getUserName = () => {
  const userName = Cookies.get('username')
  if (userName) return userName
  else return false
}

export const setCookiesItem = (key, value) => {
  Cookies.set(key, value, { expires: config.cookieExpires || 1 || 1 })
}

export const getCookiesItem = (key) => {
  const value = Cookies.get(key)
  if (value) return value
  else return false
}

export const getUserInfo = () => {
  const userInfo = localRead('userInfo');
  if (userInfo) {
    return JSON.stringify(userInfo)
  } else {
    return {}
  }
}

// rsa encrypt
const PUB_KEY = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmNyKjsL3UNklCfhIj7In9kNxj
Tqwi76f6pSuXfSNiJuoVtKZNyDCCW5Edzo0HHglLlpskVN8s3JV4lmXTU14BUYW/
/B982hwUAgPElyo3BXpd66VN8U9A9FuddaK7gvK8+FOsOHT0a+vGb7/Uk3HpJ1AJ
oO3Zt0Dqyc0dL/7hLwIDAQAB
-----END PUBLIC KEY-----
`;
export const encryptByPubKey = (rawData) => {
  let crypto;
  try {
    crypto = require('crypto');
  } catch (err) {
    console.log('crypto support is disabled!');
  }
  var buffer = Buffer.from(rawData);
  var encrypted = crypto.publicEncrypt(PUB_KEY, buffer);
  return encrypted.toString("base64");
}

// rsa encrypt
const RSA_PUB_KEY = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDESPaIBt+nS0EQmHcmI8llMFec
cO6XMP3D1T28vPjH6KJ9CCurMH2Ag5lSWF0fe3nQDGTVTz7oMEikqqNmP5Njkxay
dP4QAsfeBKHibnsCY/4MbhvpJqEGAuhZi/AD2zj2sAv+Aa46FLehjxQXZejL2tUl
eh0DW6YBXU2ov8MiHQIDAQAB
-----END PUBLIC KEY-----
`;
export const rsaEncryptByPubKey = (rawData) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(RSA_PUB_KEY);
  return encrypt.encrypt(rawData);
}


/**
 * @param {string} algorithm
 * @param {any} content
 *  @return {string}
 */
export const encrypt = (algorithm, content) => {
  let hash = createHash(algorithm)
  hash.update(content)
  return hash.digest('hex')
}

/**
 * @param {any} content
 *  @return {string}
 */
export const sha1 = (content) => encrypt('sha1', content)

// 币种符号
export const currency = {
  'CNY': '￥',
  'HKD': 'HK＄',
  'USD': '＄',
  'EUR': '€',
  'GBP': '￡',
  'JPY': 'J￥',
  'KRW': '₩'
}


/**
 * @param {any} content
 *  @return {string}
 */
export const md5 = (content) => encrypt('md5', content)

// 校验是否为合法手机号码
export const isPhone = (str) => {
  const reg = /^[1][3-9]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/;
  if (!reg.test(str)) {
    return false;
  } else {
    return true;
  }
}

// 根据部门树形结构,返回叶子节点部门数组
export const buildChildDepartmentArray = (selectDepartData, merchantDepartData) => {
  //判断两个参数是否为数组
  let tmp = [];
  selectDepartData.map(function(item, index) {
    if (item) {
      tmp.push(item);
      //查找父id是当前id的数组
      let curDepart = _.filter(merchantDepartData, cur => {return cur.parentid == item});
      if (curDepart.length !== 0) {
        let departments = _.pluck(curDepart,'department_id');
        let res = buildChildDepartmentArray(departments, merchantDepartData);
        tmp = _.union(tmp, res);
      }
    }

  });
  // console.log("buildChildDepartmentArray=====finished---tmp>>>" + JSON.stringify(tmp));
  return tmp;
}

// 根据叶子节点部门数组和部门组织数组，返回部门树形结构
export const buildDepartmentTree = (childData, departmentData) => {
  //判断两个参数是否为数组
  let tmp = [];
  childData.map(function(item, index) {
    if (item) {
      let curDepart = _.find(departmentData, cur => {return cur.department_id == item});
      if (curDepart) {
        let newDepart = {
          department_id: curDepart.department_id,
          parentid: curDepart.parentid,
          name: curDepart.name
        };
        tmp.push(newDepart);

        if (curDepart.parentid == ""){

        }
        else{
          let inDepart = [];
          inDepart.push(curDepart.parentid);
          let res = buildDepartmentTree(inDepart, departmentData);
          let uniontmp = _.union(tmp, res);
          tmp = _.uniq(uniontmp, true, 'department_id');
        }
      }
    }

  });
  return tmp;
}

// 递归返回树形结构，默认主ID字段名为 code，父id字段名为 parents， 根据数据可自定义
export const buildTree = (queryArr, sub = {}, currentKey = 'code', parentsKey = 'parents', child = 'children', root = '0') => {
  // console.log("buildTree--->>>" + root + "--->>>" + JSON.stringify(queryArr));
  let tmp = [];
  let rootTree={
    department_id: '0',
    parentid: "",
    name: "全部部门",
  };
  let query = JSON.parse(JSON.stringify(queryArr));
  if (root == '0'){
    query.map(function(item, i) {
      if (!sub[currentKey]) {
        if (item[parentsKey] === '') {
          item[parentsKey] = '0';
        }
      }
    });
    query.push(rootTree);
  }

  query.map(function(item, i) {
    if (item) {
      _.extend(item, { id: item[currentKey] });
      _.extend(item, { title: item['name'] });
    }
    if (!sub[currentKey]) {
      if (item[parentsKey] === '') {
        query[i] = false;
        item['checked'] = true;
        tmp.push(item);
      }
    } else {
      if (sub[currentKey] === item[parentsKey]) {
        query[i] = false;
        item['checked'] = true;
        tmp.push(item);
      }
    }
  })
  if (tmp.length === 0) {
    return;
  }
  sub = tmp;
  if (sub.length > 0) {
    // console.log("sub ===> ", sub)
    sub.map(function(cur, c) {
      let res = buildTree(query, cur, currentKey, parentsKey, child, '1');
      if (res) {
        sub[c][child] = res;
      }
    });
  }
  return sub;
}

// 递归返回树形结构，默认主ID字段名为 code，父id字段名为 parents， 根据数据可自定义
export const buildTreeChecked = (queryArr, sub = {}, currentKey = 'code', parentsKey = 'parents', child = 'children', root = '0', CheckedArr) => {
  // console.log("buildTree--->>>" + root + "--->>>" + JSON.stringify(queryArr));
  let tmp = [];
  let rootTree={
    department_id: '0',
    parentid: "",
    name: "全部部门",
  };
  let query = JSON.parse(JSON.stringify(queryArr));
  if (root == '0'){
    query.map(function(item, i) {
      if (!sub[currentKey]) {
        if (item[parentsKey] === '') {
          item[parentsKey] = '0';
        }
      }
    });
    query.push(rootTree);
  }

  query.map(function(item, i) {
    if (item) {
      _.extend(item, { id: item[currentKey] });
      _.extend(item, { title: item['name'] });
    }
    if (!sub[currentKey]) {
      if (item[parentsKey] === '') {
        query[i] = false;
        tmp.push(item);
      }
    } else {
      if (sub[currentKey] === item[parentsKey]) {
        query[i] = false;
        let pos = _.indexOf(CheckedArr, item[currentKey]);
        if (pos != -1){
          item['checked'] = true;
        }
        tmp.push(item);
      }
    }
  })
  if (tmp.length === 0) {
    return;
  }
  sub = tmp;
  if (sub.length > 0) {
    // console.log("sub ===> ", sub)
    sub.map(function(cur, c) {
      let res = buildTreeChecked(query, cur, currentKey, parentsKey, child, '1', CheckedArr);
      if (res) {
        sub[c][child] = res;
      }
    });
  }
  return sub;
}


// 递归返回树形结构，默认主ID字段名为 code，父id字段名为 parents， 根据数据可自定义
export const getTreeNodesValue = (queryArr, currentKey = 'code', child = 'children', key = '') => {
  let tmp = [];
  let query = JSON.parse(JSON.stringify(queryArr));

  query.map(function(item, i) {
    if (item[currentKey] != undefined && item) {
      tmp.push(key==''?item[currentKey]:key + '-' + item[currentKey]);
    }
    if (item[child] != undefined && item[child].length > 0) {
      let res = getTreeNodesValue(item[child], currentKey, child, key==''?item[currentKey]:key + '-' + item[currentKey]);
      if (res.length > 0){
        tmp.push(...res);
      }
    }
  })

  return tmp;
}

// 递归返回树形结构，默认主ID字段名为 code，父id字段名为 parents， 根据数据可自定义
export const getTreeNodes = (queryArr, currentKey = 'code', child = 'children') => {
  let tmp = [];
  let query = JSON.parse(JSON.stringify(queryArr));

  query.map(function(item, i) {
    if (item[currentKey] != undefined && item) {
      tmp.push(item[currentKey]);
    }
    if (item[child] != undefined && item[child].length > 0) {
      let res = getTreeNodes(item[child], currentKey, child);
      if (res.length > 0){
        tmp.push(...res);
      }
    }
  })

  return tmp;
}

// 递归返回树形结构中某一个关键字对应的节点数据，根据数据可自定义
export const getTreeNodeItem = (queryArr, currentKey = 'code', child = 'children', key) => {
  let tmp = [];
  queryArr.map(function(item, i) {
    if (item[currentKey] != undefined && item) {
      if (item[currentKey] == key){
        tmp.push(item);
      }
    }
    if (item[child] != undefined && item[child].length > 0) {
      let res = getTreeNodeItem(item[child], currentKey, child, key);
      if (res.length > 0){
        tmp.push(...res);
      }
    }
  })

  return tmp;
}

// 递归返回树形结构中某一个关键字对应的节点数据，根据数据可自定义
export const getTreeNodeItemName = (queryArr, currentKey = 'code', child = 'children', keys, currentName) => {
  let tmp = [];
  queryArr.map(function(item, i) {
    if (item[currentKey] != undefined && item) {
      _.find(keys, function(key){
        if (item[currentKey] == key){
          tmp.push({id:item[currentKey],name:item[currentName],level:item.level});
        }
      });

    }
    if (item[child] != undefined && item[child].length > 0) {
      let res = getTreeNodeItemName(item[child], currentKey, child, keys, currentName);
      if (res.length > 0){
        tmp.push(...res);
      }
    }
  });

  return tmp;
}

// 导出页面为PDF格式
export const ExportSavePdf = (element, pdfName, currentTime, direction = 'p') => {
  // var element = document.getElementById("statPrint")
  html2canvas(element, {
    dpi: 300,
    useCORS: true, // 如果说所生成的页面中带有跨域的图片，这个useCors需要设置为True 否则画布被污染不会显示
    logging: false,
  }).then(function (canvas) {
    // let [imgX, imgY] = [595.28, 841.89];
    // let pdf = new jsPDF('p', 'pt', 'a4');
    // for (let [index, item] of pageList.entries()) {
    //   for (let j = 0; j < item.imageList.length; j++) {
    //     const image = item.imageList[j];
    //     let imgHeight = imgX / (image.width / image.height); //根据宽度计算高度
    //     pdf.addImage(image.data, 'JPEG', 0, 0, imgX, imgHeight);
    //     pdf.addPage();
    //   }
    // }
    // let targetPage = pdf.internal.getNumberOfPages();
    // pdf.deletePage(targetPage); // 删除最后一页
    // pdf.save(`测试.pdf`);


    // let pdf = new jsPDF('p', 'pt', [pdfX, pdfY]);
    // 第一个参数： l：横向  p：纵向
    // 第二个参数：测量单位（"pt"，"mm", "cm", "m", "in" or "px"）
    // 第三个参数：可以是下面格式，默认为“a4”
    let pdf = new JSPDF(direction, "mm", "a4") // A4纸，横向
    let ctx = canvas.getContext("2d")
    let a4w = 190;
    let a4h = 277; // A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
    if (direction == 'l'){
      a4w = 277;
      a4h = 190;
    }
    let imgHeight = Math.floor(a4h * canvas.width / a4w); // 按A4显示比例换算一页图像的像素高度
    let renderedHeight = 0;

    while (renderedHeight < canvas.height) {
      let page = document.createElement("canvas");
      page.width = canvas.width;
      page.height = Math.min(imgHeight, canvas.height - renderedHeight);// 可能内容不足一页

      // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
      page.getContext("2d").putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
      pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)); // 添加图像到页面，保留10mm边距

      renderedHeight += imgHeight;
      if (renderedHeight < canvas.height) {
        pdf.addPage();
      }// 如果后面还有内容，添加一个空页
      // delete page;
    }
    pdf.save(pdfName + currentTime);
  })
}

export const previewImg = (ele) => {
  window.scrollTo(0, 0);
  let eleW = ele.offsetWidth;// 获得该容器的宽
  let eleH = ele.offsetHeight;// 获得该容器的高
  let eleOffsetTop = ele.offsetTop;  // 获得该容器到文档顶部的距离
  let eleOffsetLeft = ele.offsetLeft; // 获得该容器到文档最左的距离

  var canvas = document.createElement("canvas");
  var abs = 0;

  let win_in = document.documentElement.clientWidth || document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
  let win_out = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）

  if (win_out > win_in) {
    abs = (win_out - win_in) / 2;    // 获得滚动条宽度的一半
  }
  canvas.width = eleW * 2;
  canvas.height = eleH * 2;

  var context = canvas.getContext("2d");
  context.scale(2, 2);
  context.translate(-eleOffsetLeft - abs, -eleOffsetTop);
  var baseSrc = ''
  html2canvas(ele, {
    dpi: 300,
    scale: 2,//处理图片模糊
    useCORS: true  //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
  }).then((canvas) => {
    var pageData = canvas.toDataURL('image/jpeg', 1.0);
    baseSrc = pageData
  })

  return baseSrc;
}


// 金额格式化
export const numberFormat = (number, decimals = 2, decPoint = '.', thousandsSep = ',', roundtag = 'round') => {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * roundtag:舍入参数，默认 'ceil' 向上取,'floor'向下取,'round' 四舍五入
   * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  roundtag = roundtag || 'ceil' // 'ceil','floor','round'
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  let s = ''
  let toFixedFix = function(n, prec) {
    let k = Math.pow(10, prec)
    console.log()

    return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * 获取 blob
 * @param  {String} url 目标文件地址
 * @return {cb}
 */
function getBlob(url,cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    if (xhr.status === 200) {
      cb(xhr.response);
    }
  };
  xhr.send();
}

/**
 * 保存
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement('a');
    var body = document.querySelector('body');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    // fix Firefox
    link.style.display = 'none';
    body.appendChild(link);
    link.click();
    body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };
}

/**
 * 下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
export function downloadFile(url, filename) {
  getBlob(url, function(blob) {
    saveAs(blob, filename);
  });
};



