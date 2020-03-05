<!--
 * @Description: 跳转到详情页按钮
 * @Author: sdt
 * @Date: 2019-07-11 15:50:38
 * @LastEditTime: 2019-07-19 11:09:24
 * @LastEditors: Please set LastEditors
 -->

<template>
  <a-button class="greenBtn" @click="createPurchaseForm">{{params.title}}</a-button>
</template>
<script>
export default {
  name: "toDetail",
  props: {
    params: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    createPurchaseForm() {
      this.$emit("handleTrigger", {action: 'addData', params: this.params});
    }
  }
};
</script>
<style lang="scss">
.createPurchaseForm {
  background: #52c41a;
  color: #fff;
  &:hover,
  &:focus,
  &:active {
    background: #52c41a;
    color: #fff;
    border-color: #52c41a;
  }
}
</style>
