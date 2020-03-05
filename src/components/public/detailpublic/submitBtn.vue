<!--
 * @Description: 提交表单按钮
 * @Author: sdt
 * @Date: 2019-07-12 18:44:20
 * @LastEditTime: 2019-07-31 15:03:25
 * @LastEditors: Please set LastEditors
 -->

 <template>
  <a-button @click="submitBtn" class="greenBtn submitBtn" html-type="submit">提交{{params.title}}</a-button>
</template>

 <script>
export default {
  name: "submitBtn",
  props: {
    params: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    submitBtn() {
      this.$emit("handleTrigger", { action: "submitBtn" });
    }
  }
};
</script>

 <style lang="scss" scoped>
.submitBtn {
  margin-left: 24px;
}
</style>
 
 
 
