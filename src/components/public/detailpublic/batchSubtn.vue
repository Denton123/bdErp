<!--
 * @Description: 批量提交按钮
 * @Author: sdt
 * @Date: 2019-07-31 10:13:55
 * @LastEditTime: 2019-07-31 10:14:48
 * @LastEditors: Please set LastEditors
 -->

 <template>
  <a-button @click="submitBtn" class="greenBtn submitBtn" html-type="submit">提交</a-button>
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
      this.$emit("handleTrigger", {action: 'batchsubBtn'});
    }
  }
};
</script>

 <style lang="scss" scoped>
 .submitBtn{
   margin-left: 24px;
 }
</style>
 
 
 
