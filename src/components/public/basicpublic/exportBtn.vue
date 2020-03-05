<!--
 * @Description: 导出按钮
 * @Author: sdt
 * @Date: 2019-07-17 13:41:18
 * @LastEditTime: 2019-11-26 16:47:57
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
        console.log('22222')
      this.$emit('handleExportCsv')
    }
  }
};
</script>

<style lang="scss" scoped>
.exportCSV{
  margin-left: 24px;
}
</style>


