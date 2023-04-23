<template>
  <div v-viewer="options" class="images clearfix">
    <template v-for="item in images">
      <img :src="item.url" :data-source="item.url" class="image" :key="item.url" :alt="item.url.split('?image=').pop()">
      </template>
  </div>
</template>
<script>
// const sourceImages = [{
//     url: 'https://icloudportal.com:7443/api/attachments/-8ad470a9-4774-4f21-8fc0-166b7eb834b4.pdf',
//   },
//   {
//     url: 'https://icloudportal.com:7443/api/attachments/1216159561-9d888b13-d76c-4889-bdfe-18b1ca3f3642.jpg',
//   }
// ];
// const base = parseInt((Math.random() * 60), 10) + 10
// for (let i = 0; i < 10; i++) {
//   sourceImages.push({
//     thumbnail: `https://picsum.photos/id/${base + i}/346/216`,
//     source: `https://picsum.photos/id/${base + i}/1440/900`
//   })
// }
import _ from 'underscore';
const picExt = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'avi', 'mov', 'rmvb', 'mp4', 'rm'];
export default {
  props: {
    sourceImages: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      options: {
        toolbar: true,
        url: 'data-source',
        navbar: false,
        title: false
      },
      // images: [...sourceImages].splice(0, 5)
    }
  },
  computed: {
    // attachment() {
    //   return this.$store.state.bills.attachment;
    // },
    // currentBill() {
    //   return this.$store.state.bills.currentBill;
    // },
    images() {
      return this.sourceImages;
    }
  },
  methods: {
    // getImages() {
    //   console.log("this.attachment ===> ", this.attachment);
    //   return _.filter(this.attachment, cur => {
    //     return picExt.indexOf(cur.name.split('.').pop().toLowerCase()) > -1;
    //   });

    // }
    // getImages() {
    //   console.log("this.attachments ===> ", this.attachments);
    //   let tmp = _.filter(this.currentBill.attachments , cur => { 
    //     return picExt.indexOf(cur.name.split('.').pop().toLowerCase()) > -1; 
    //   });
    //   // console.log("========> attachment: ", tmp)
    //   return _.filter(this.currentBill.attachments, cur => { 
    //     return picExt.indexOf(cur.name.split('.').pop().toLowerCase()) > -1; 
    //   });
    // }
  },
  // watch: {
  //   attachment(val) {
  //     console.log("watch attachment ===> ", val);
  //   }
  // }
}
</script>
<style scoped>
.image {
  width: calc(20% - 10px);
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}
</style>