<!--
 * @Description: 导出按钮
 * @Author: sdt
 * @Date: 2019-07-17 13:41:18
 * @LastEditTime: 2019-12-18 10:14:58
 * @LastEditors: Please set LastEditors
 -->

<template>
  <a-button @click="exportCSV" class="greenBtn exportCSV">导出</a-button>
</template>

<script>
export default {
  name: "exportCSV",
  methods: {
    exportCSV() {
      this.$emit("handleTrigger", {action: 'exportCSV'});
    }
  }
};
</script>

<style lang="scss" scoped>
.exportCSV{
  margin-left: 24px;
}
</style>


