<!--
 * @Description: 盘盈盘亏按钮
 * @Author: sdt
 * @Date: 2019-07-17 13:56:08
 * @LastEditTime: 2019-07-19 11:13:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-button class="greenBtn" @click="adjustInventory">盘盈盘亏</a-button>
</template>

<script>
export default {
  name: "adjustInventoryBtn",
  methods: {
    adjustInventory() {
      this.$emit("handleTrigger", {action: 'adjustInventory'});
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
