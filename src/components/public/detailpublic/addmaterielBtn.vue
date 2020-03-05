<!--
 * @Description: 添加物料按钮
 * @Author: your name
 * @Date: 2019-07-12 18:01:19
 * @LastEditTime: 2019-08-02 14:10:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-button @click="addmateriel" type="primary" class="addmaterielBtn">{{params.title}}</a-button>
</template>

<script>
export default {
  name: "addmaterielBtn",
  props: {
    params: {
      type: Object,
      default () {
        return {
          title: '添加物料'
        }
      }
    }
  },
  methods: {
    addmateriel() {
      this.$emit("handleTrigger", {action: 'addmateriel'});
    }
  }
};
</script>

<style lang="scss" scoped>
.addmaterielBtn {
  margin-left: 24px;
}
</style>


