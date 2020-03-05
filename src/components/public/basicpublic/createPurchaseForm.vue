<!--
 * @Description: 生成采购申请单按钮
 * @Author: sdt
 * @Date: 2019-07-11 15:50:38
 * @LastEditTime: 2019-07-19 11:04:17
 * @LastEditors: Please set LastEditors
 -->

<template>
  <a-button class="greenBtn" @click="createPurForm">生成采购申请单</a-button>
</template>
<script>
export default {
  name: "createPurchaseForm",
  methods: {
    createPurForm() {
      this.$emit("handleTrigger", {action: 'createPurchaseForm'});
    }
  }
};
</script>
<style lang="scss">
</style>
