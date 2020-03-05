<!--
 * @Description: 一级页面中间模块架构
 * @Author: sdt
 * @Date: 2019-07-10 10:18:11
 * @LastEditTime: 2019-10-11 16:52:24
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="basic_content">
    <basic-model :models="mds()" />
  </div>
</template>

<script>
import BasicModel from "./basic_model";
import msg from "./basicMsg/message";
import detailMsg from "@/views/detailModel/detailMsg/detailMessage";
export default {
  name: "BasicContent",
  data() {
    let modelObj = {};
    Object.assign(modelObj, msg);
    let detailmodelObj = {};
    Object.assign(detailmodelObj, detailMsg);
    return {
      models: modelObj,
      detailmodels: detailmodelObj
    };
  },
  components: {
    BasicModel
  },
  methods: {
    mds() {
      let type = this.$route.params.model;
      if (this.$route.query.id) {
        return this.detailmodels[type];
     } else if (this.$route.query.type) {
       return this.detailmodels[type];
     }else {
        return this.models[type];
      }
    }
  },
  mounted() {
    window.document.title = '北斗生命科学'
  }
};
</script>

<style lang="scss" scoped>
.basic_content {
  height: 91vh;
  // margin: 20px;
  background-color: #ffffff;
  overflow: auto;
  padding-bottom: 100px;
  margin: 20px 0 0 20px;
}
</style>




