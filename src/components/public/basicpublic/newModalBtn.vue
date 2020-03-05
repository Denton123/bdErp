<!--
 * @Description: 新建模态框按钮
 * @Author: sdt
 * @Date: 2019-07-17 16:49:54
 * @LastEditTime: 2019-07-22 14:19:42
 * @LastEditors: Please set LastEditors
 -->

<template>
  <a-button @click="newModal" type="primary" class="newModal">新建调整单</a-button>
</template>

<script>
export default {
  name: "newModal",
  methods: {
    newModal() {
      this.$emit("handleTrigger", {action: 'newModal'});
    }
  }
};
</script>

<style lang="scss" scoped>
.newModal{
  margin-left: 24px;
}
</style>


