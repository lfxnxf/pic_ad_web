<!-- 部门树 -->
<template>
  <div >
    <!-- <Tree id="tree" :data="treeData" @on-check-change="choiceTree" ref="tree" show-checkbox multiple @click.stop="treeData[0]['expand']=true;"></Tree>  -->
    <Tree
        id="tree"
        :data="departmentList"
        @on-check-change="choiceTree"
        ref="tree"
        show-checkbox
        empty-text="暂无部门数据"
        multiple>
    </Tree>
  </div>
</template>

<script>
import _ from 'underscore';
import {buildChildDepartmentArray, buildDepartmentTree, buildTree} from "@/libs/util";
export default {
  data () {
    return {
      times: 0,
      timer: null,
      treeData: []
    };
  },

  components: {},

  computed: {
    departmentList(){
      let departments = this.$store.state.user.merchantDepartmentList;
      if (departments.length == 0){
        this.times++ ;

        if (this.times > 5){
          // clearTimeout(this.timer);
          let that = this;
          this.timer = setTimeout(() => {
            that.getDepartmentList();
          },3000);
        }
        else{
          this.getDepartmentList();
        }
      }

      return this.$store.state.user.merchantDepartmentList;
    }
  },

  methods: {
    //获取部门列表
    getDepartmentList: async function() {
      let params = {
        merchant_id: this.$store.state.user.curMerchantId,
        level: 1,
      };

      let res = await this.$store.dispatch('getMerchantDepartmentList', params);

      if (res.data.length > 0){
        this.times = 0;
      }

      // console.log("getDepartmentList===times>>>" + JSON.stringify(this.times))

      // await this.$store.dispatch('getMerchantDepartmentList', params).then(res=>{
      //   if(res.return_code==0){
      //     this.treeData = res.data;
      //   }
      // }).catch(err=>{
      //
      // });
    },

    // //获取部门列表
    // queryDepartment: async function() {
    //   let params = {
    //     org_id: this.$store.state.user.curOrgId,
    //     sessionid: this.$store.state.user.token,
    //     limit: 2000
    //   };
    //   return await this.$store.dispatch('departmentList', params);
    // },
    //
    // //获取该食堂商户下所有子部门列表
    // queryChildDepartment: async function() {
    //   let params = {
    //     merchant_id: this.$store.state.user.curMerchantId,
    //   };
    //   return await this.$store.dispatch('userChildDepartment', params);
    // },
    //    //获取当前食堂商户的部门树
    // getMerchantDepartment: async function() {
    //   let departTree = buildDepartmentTree(this.$store.state.user.userChildDepartmentList,this.$store.state.user.empDepartmentList);
    //   this.$store.commit('UpdateDepartmentList', departTree);
    //   if (departTree.length > 0) {
    //     this.treeData = buildTree(departTree, {}, 'department_id', 'parentid', 'children');
    //   }
    // },
    choiceTree(data){
      let choicesData=this.$refs.tree.getCheckedNodes(); //方法的运用 getSelectedNodes也是如此用法
      let departments = _.pluck(choicesData, 'department_id');
      this.$emit('formDepartments', departments);
    },

  },

  mounted() {
    // this.getDepartmentList();
  },

  // created(){
  //   document.addEventListener('click', e => {
  //     let self = document.getElementById('tree');
  //     if(!self.contains(e.target)){
  //       this.treeData[0]['expand'] = false;
  //     }
  //   })
  // },
  destroyed(){
    // this.treeData[0]['expand'] = false;
    this.departmentList[0]['expand'] = false;
  }
}

</script>
<style lang='less' scoped>
</style>
