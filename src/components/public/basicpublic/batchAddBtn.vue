<!--
 * @Description: 批量添加按钮
 * @Author: sdt
 * @Date: 2019-07-18 10:40:00
 * @LastEditTime: 2019-07-19 11:04:36
 * @LastEditors: Please set LastEditors
 -->

 <template>
  <a-button class="greenBtn" @click="batchAdd">批量添加</a-button>
</template>

 <script>
export default {
  name: "batchAddBtn",
  props: {
    params: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    batchAdd() {
        this.$emit('handleTrigger', {action: 'batchAdd', params: this.params})
    }
  }
};
</script>

 <style lang="scss" scoped>
</style>
 
 
 
