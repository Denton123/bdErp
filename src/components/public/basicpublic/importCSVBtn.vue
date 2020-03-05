<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-18 14:01:09
 * @LastEditTime: 2019-08-08 18:49:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-button @click="importCSV" type="primary" class="importCSV">导入csv</a-button>
</template>

<script>
export default {
  name: "importCSV",
  methods: {
    importCSV() {
      this.$emit("handleTrigger", {action: 'importCSV'});
    }
  }
};
</script>

<style lang="scss" scoped>
.importCSV{
  margin-left: 24px;
}
</style>
