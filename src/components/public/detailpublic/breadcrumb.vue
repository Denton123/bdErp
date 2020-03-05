<!--
 * @Description: 详情页面包屑
 * @Author: sdt
 * @Date: 2019-07-12 14:50:49
 * @LastEditTime: 2019-07-12 16:02:14
 * @LastEditors: Please set LastEditors
 -->

 <template>
  <div>
    <a-breadcrumb separator=">">
      <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
        <router-link :to="item.href">{{item.title}}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

 <script>
export default {
  name: "breadcrumb",
  props: {
    breadcrumb: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

 <style lang="scss" scoped>
</style>
 
 
 
