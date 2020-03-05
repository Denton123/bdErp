<!--
 * @Description: 基础模块搜索
 * @Author: sdt
 * @Date: 2019-07-10 13:40:08
 * @LastEditTime: 2019-11-07 16:42:39
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div id="search-form" v-if="searchComponent.length !== 0">
    <a-form :form="form" @submit="handleSearch" layout="inline">
      <a-form-item v-for="(item, index) in searchComponent" :key="index">
        <!-- 输入框 -->
        <a-input
          v-if="item.type=='text'"
          :placeholder="item.placeholder"
          v-decorator="[`${item.name}`]"
        />
        <!-- 日期区域选择 -->
        <a-range-picker
          v-else-if="item.type=='dateRange'"
          v-decorator="[`${item.name}`]"
          :placeholder="item.placeholder"
        />
        <!-- 日期选择 -->
        <a-date-picker
          v-else-if="item.type=='date'"
          v-decorator="[`${item.name}`]"
          :placeholder="item.placeholder"
        />
        <!-- 下拉选择 -->
        <a-select
          v-else-if="item.type === 'select'"
          v-decorator="[`${item.name}`]"
          style="width:174px;"
          :placeholder="item.placeholder"
        >
          <a-select-option
            v-for="(selectItem, index) in item.options"
            :key="index"
            :value="selectItem.key"
          >{{selectItem.value}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin-right:16px;">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  props: {
    searchComponent: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    // 查询操作
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let fields = {};
          for (let i in values) {
            if (i === "date") {
              fields["startTime"] = values["date"]
                ? values["date"][0].format("YYYY-MM-DD")
                : undefined;
              fields["endTime"] = values["date"]
                ? values["date"][1].format("YYYY-MM-DD")
                : undefined;
            } else if (i.indexOf('Time') !== -1 && values[i] !== undefined) {
              fields[i] = values[i].format('YYYY-MM-DD')
            }else {
              fields[i] = values[i];
            }
          }
          this.$emit('handleSearch', fields)
        }
      });
    },
    // 重置
    handleReset() {
      this.form.resetFields();
      this.$emit('handleReset')
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.form.resetFields();
      }
    }
  }
};
</script>

<style lang="scss">
</style>


