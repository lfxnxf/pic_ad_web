<template>
  <div style="height: 100%" class="enterprise-main">
    <!-- header-nav -->
    <Header class="header-con">
        <nav-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">

          <!-- <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store> -->
        </nav-bar>
    </Header>
    <div class="container">
      <Sider
        hide-trigger
        collapsible
        :width="200"
        :collapsed-width="64"
        v-model="collapsed"
        class="left-sider"
        :style="{ overflow: 'hidden' }">
        <side-menu
          accordion
          ref="sideMenu"
          :active-name="$route.name"
          :collapsed="collapsed"
          @on-select="turnToPage"
          :menu-list="menuList">
        </side-menu>
      </Sider>
      <Layout id="content">
        <Content class="main-content-con">
          <Layout class="main-layout-con">
            <Content class="content-wrapper">
              <div v-if="false"  class="error-msg margin-bottom-10">
                账号异常通知：您的企业还未开通企业账单，
                <span class="blue-color" @click="toOpenEnterpriseBill">单击此处立即开通，</span>
                开通企业账单能得到哪些服务，
                <span class="blue-color">单击此处</span>
                浏览企业账单服务详情
              </div>
              <keep-alive>
                <router-view :key="$route.fullPath"/>
              </keep-alive>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
    <!-- 选择账单类型 -->
    <!-- <bill-type></bill-type> -->
    <!-- <EInBillType></EInBillType> -->
  </div>
</template>

<script>
import SideMenu from './components/side-menu';
import NavBar from './components/nav-bar';
// import BillType from '@/components/bill-type';
// import EInBillType from '@/views/enterprise/receivable/components/bill-type';
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util';
//计算router-view高度
// window.onresize = function(){
//   console.log(111111111)
//   var headerTop = document.getElementById('headerTop');
//   var content = document.getElementById('content');
//   var bodyH = document.body.clientHeight;
//   let topH = headerTop.offsetHeight;
//   content.style.height = bodyH - topH - 39 +'px';
// }

export default {
  name: 'Main',
  components: {
    SideMenu,
    NavBar,
  },
  data() {
    return {
      collapsed: false,
      // screenHeight: document.body.clientHeight,
    };
  },
  computed: {
    ...mapGetters(['errorCount']),
    // userName() {
    //   return this.$store.state.user.userName;
    // },

    menuList() {
      return this.$store.getters.menuList;
      
    },
    local() {
      return this.$store.state.app.local;
    },
    hasReadErrorPage() {
      return this.$store.state.app.hasReadErrorPage;
    },
  },
  methods: {
    ...mapMutations(['setBreadCrumb', 'setTagNavList', 'addTag', 'setLocal']),
    ...mapActions(['handleLogin']),
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === 'string') name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query,
      });
    },
    handleCollapsedChange(state) {
      this.collapsed = state;
    },

    handleClick(item) {
      this.turnToPage(item);
    },
    toOpenEnterpriseBill(){
      this.$router.push({name: 'MerchantInfo'})
    }

  },

  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
      // this.addTag({
      //   route: { name, query, params, meta },
      //   type: 'push',
      // });
      this.$refs.sideMenu.updateOpenName(newRoute.name);
    },

  },


};
</script>
<style lang="less" scoped>
@import './enterprise-main.less';

</style>
