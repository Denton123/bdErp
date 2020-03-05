<!--
 * @Description: 详情头部表单
 * @Author: sdt
 * @Date: 2019-07-12 17:15:04
 * @LastEditTime: 2019-12-06 13:23:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div
    class="detail-form-wrap"
    :class="isMt ? 'mt50' : '' "
    id="components-form-demo-advanced-search"
  >
    <a-form :form="form" @submit="handleSubmit" layout="inline" class="ant-advanced-search-form">
      <!-- <a-row :gutter="24">
        <a-col :span="6" v-for="i in 10" :key="i">
          <a-form-item label="test">
            <a-input placeholder="placeholder" />
          </a-form-item>
        </a-col>
      </a-row>-->
      <a-row :gutter="24">
        <a-col :span="6" v-for="(item, index) in submitComponent" :key="index">
          <!-- <template> -->
          <a-form-item
            :label="item.label"
            v-if="item.type=='text'"
            v-show="show(item.name)"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              v-decorator="[`${item.name}`, {rules: isRules ? item.rules : null}]"
              :placeholder="item.placeholder"
              :disabled="isDisabled || item.isDisabled"
            />
          </a-form-item>
          <a-form-item
            v-else-if="item.type=='date'"
            :label="item.label"
            :key="index"
            v-show="show(item.name)"
            :label-col="labelCol"
          >
            <a-date-picker
              :placeholder="item.placeholder"
              v-decorator="[`${item.name}`, {rules: isRules ? item.rules : null}]"
              :format="item.format"
              :showTime="item.showTime"
              :disabled="isDisabled || item.isDisabled"
            />
          </a-form-item>
          <!-- </template> -->
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
const cloneDeep = require("clone-deep");
export default {
  name: "DetailForm",
  data() {
    return {
      form: this.$form.createForm(this),
      // 详情不可编辑
      isDisabled: false,
      // 新增和详情的规则
      isRules: false,
      isShow: false,
      checkArr: ["revName", "revTime", "revTime"],
      isMt: true,
      labelCol: {
        // xs: { span: 24 },
        // sm: { span: 8 }
        sm: { span: 11 }
      },
      wrapperCol: {
        sm: { span: 15 }
        // xs: { span: 24 },
        // sm: { span: 12 }
      }
    };
  },
  props: {
    submitComponent: {
      type: Array,
      default() {
        return [];
      }
    },
    detailFields: {
      type: Object,
      default() {
        return {};
      }
    },
    amount: {
      type: Number,
      default() {
        return 0;
      }
    },
    isToSub: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    show(name) {
      if (name === "revName" || name === "revOpin" || name === "revTime") {
        if (this.isToSub) {
          return true;
        }
      } else {
        return true;
      }
    },
    handleSubmit(test) {
      let formObj;
      this.form.validateFields((err, values) => {
        if (!err) {
          for (let i in values) {
            if (i.indexOf("Time") !== -1 && values[i] !== null) {
              values[i] = values[i].format("YYYY-MM-DD");
            } else {
              values[i] = values[i];
            }
          }
          formObj = values;
        }
      });
      return formObj;
    },
    handleDifference(route) {
      this.isDisabled =
        route.query.id && route.params.model.indexOf("Detail") !== -1
          ? true
          : false;
      this.isRules =
        route.query.id && route.params.model.indexOf("Detail") !== -1
          ? false
          : true;
      if (this.detailFields.status !== 3) {
        this.isShow = true;
      }
    }
  },
  mounted() {
    const route = this.$route;
    this.handleDifference(route);
    this.isMt =
      route.params.model.indexOf("uncheckApplicationDetail") !== -1 ||
      route.params.model.indexOf("checkedApplicationDetail") !== -1
        ? false
        : true;
  },
  watch: {
    detailFields: {
      handler(newName, oldName) {
        this.form = this.$form.createForm(this, {
          mapPropsToFields: () => {
            let fieldObj = {};
            this.submitComponent.forEach(v => {
              fieldObj[v.name] = this.$form.createFormField({
                value: this.detailFields[v.name]
              });
            });
            return fieldObj;
          }
        });
      },
      deep: true,
      immediate: true
    },
    $route: {
      handler: function(v) {
        this.handleDifference(v);
        this.isMt =
          v.params.model.indexOf("uncheckApplicationDetail") !== -1 ||
          v.params.model.indexOf("checkedApplicationDetail") !== -1
            ? false
            : true;
      }
    },
    // 总计金额
    amount: {
      handler(v) {
        this.form.setFieldsValue({
          amount: v
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// .detail-form-wrap {
//   background-color: rgba(250, 250, 250, 1);
//   border: 1px solid rgba(233, 233, 233, 1);
//   border-radius: 2px;
//   // margin-top: 50px;
//   width: 100%;

//   .formItem {
//     display: inline-block;
//     width: 20%;
//     border: 1px solid red;

//     .ant-form-item {
//       // width: 20%;
//       border: 1px solid red;
//     }
//   }
//   .ant-form {
//     text-align: left;
//     margin-left: 20px;
//     padding-top: 24px;
//   }
//   .ant-form-inline .ant-form-item {
//     // margin-right: 42px;
//     margin-right: 0;
//     margin-bottom: 24px;
//     width: 20%;
//     // border: 1px solid;
//     display: inline-flex;
//   }
// }
.mt50 {
  margin-top: 50px;
}
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding-left: 0;
  padding-bottom: 0;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  // text-align: center;
  padding-top: 80px;
}
.has-error .ant-form-explain,
.has-error .ant-form-split {
  text-align: left !important;
}
.ant-form-explain {
  text-align: left !important;
}
</style>


