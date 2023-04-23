import Vue from 'vue'
import XEUtils from 'xe-utils'
import {
  VXETable,
  Table,
  Column,
  Header,
  Footer,
  Filter,
  Edit,
  Menu,
  Icon,
  Export,
  Keyboard,
  Validator,
  Grid,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Textarea,
  Button,
  Modal,
  Tooltip,
  Form,
  Select,
  Switch,
  List
} from 'vxe-table'

// 按需加载的方式默认是不带国际化的，需要自行导入
// VXETable.setup({
//   i18n: (key, args) => i18n.t(key, args)
// })

VXETable.setup({
  zIndex: 10000,
  icon: {
    // table
    TABLE_SORT_ASC: 'vxe-icon--caret-top',
    TABLE_SORT_DESC: 'vxe-icon--caret-bottom',
    TABLE_FILTER_NONE: 'vxe-icon--funnel',
    TABLE_FILTER_MATCH: 'vxe-icon--funnel',
    // TABLE_EDIT: 'vxe-icon--edit-outline',
    TABLE_EDIT: '',
    TABLE_TREE_LOADED: 'vxe-icon--refresh roll',
    TABLE_TREE_OPEN: 'vxe-icon--caret-right rotate90',
    TABLE_TREE_CLOSE: 'vxe-icon--caret-right',
    TABLE_EXPAND_LOADED: 'vxe-icon--refresh roll',
    TABLE_EXPAND_OPEN: 'vxe-icon--arrow-right rotate90',
    TABLE_EXPAND_CLOSE: 'vxe-icon--arrow-right',

    // button
    BUTTON_DROPDOWN: 'vxe-icon--arrow-bottom',
    BUTTON_LOADING: 'vxe-icon--refresh roll',

    // select
    SELECT_OPEN: 'vxe-icon--caret-bottom rotate180',
    SELECT_CLOSE: 'vxe-icon--caret-bottom',

    // pager
    PAGER_JUMP_PREV: 'vxe-icon--d-arrow-left',
    PAGER_JUMP_NEXT: 'vxe-icon--d-arrow-right',
    PAGER_PREV_PAGE: 'vxe-icon--arrow-left',
    PAGER_NEXT_PAGE: 'vxe-icon--arrow-right',
    PAGER_JUMP_MORE: 'vxe-icon--more',

    // input
    INPUT_CLEAR: 'vxe-icon--close',
    INPUT_PWD: 'vxe-icon--eye-slash',
    INPUT_SHOW_PWD: 'vxe-icon--eye',
    INPUT_PREV_NUM: 'vxe-icon--caret-top',
    INPUT_NEXT_NUM: 'vxe-icon--caret-bottom',
    INPUT_DATE: 'vxe-icon--calendar',
    INPUT_SEARCH: 'vxe-icon--search',

    // modal
    MODAL_ZOOM_IN: 'vxe-icon--square',
    MODAL_ZOOM_OUT: 'vxe-icon--zoomout',
    MODAL_CLOSE: 'vxe-icon--close',
    MODAL_INFO: 'vxe-icon--info',
    MODAL_SUCCESS: 'vxe-icon--success',
    MODAL_WARNING: 'vxe-icon--warning',
    MODAL_ERROR: 'vxe-icon--error',
    MODAL_QUESTION: 'vxe-icon--question',
    MODAL_LOADING: 'vxe-icon--refresh roll',

    // toolbar
    TOOLBAR_TOOLS_REFRESH: 'vxe-icon--refresh',
    TOOLBAR_TOOLS_REFRESH_LOADING: 'vxe-icon--refresh roll',
    TOOLBAR_TOOLS_IMPORT: 'vxe-icon--upload',
    TOOLBAR_TOOLS_EXPORT: 'vxe-icon--download',
    TOOLBAR_TOOLS_ZOOM_IN: 'vxe-icon--zoomin',
    TOOLBAR_TOOLS_ZOOM_OUT: 'vxe-icon--zoomout',
    TOOLBAR_TOOLS_CUSTOM: 'vxe-icon--menu',

    // form
    FORM_PREFIX: 'vxe-icon--info',
    FORM_SUFFIX: 'vxe-icon--info',
    FORM_FOLDING: 'vxe-icon--arrow-top rotate180',
    FORM_UNFOLDING: 'vxe-icon--arrow-top'
  }
});

import VXETablePluginIView from 'vxe-table-plugin-iview'
import 'vxe-table-plugin-iview/dist/style.css'

VXETable.use(VXETablePluginIView)

// 表格模块
Vue.use(Icon)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Filter)
Vue.use(Edit)
Vue.use(Menu)
Vue.use(Export)
Vue.use(Keyboard)
Vue.use(Validator)

// 可选组件
Vue.use(Column)
Vue.use(Grid)
Vue.use(Tooltip)
Vue.use(Toolbar)
Vue.use(Pager)
Vue.use(Form)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Input)
Vue.use(Select)
Vue.use(Button)
Vue.use(Modal)
Vue.use(List)

// 安装表格
Vue.use(Table)

// 给 vue 实例挂载内部对象，例如：
Vue.prototype.$XModal = VXETable.modal
Vue.prototype.$XPrint = VXETable.print
Vue.prototype.$XSaveFile = VXETable.saveFile
Vue.prototype.$XReadFile = VXETable.readFile