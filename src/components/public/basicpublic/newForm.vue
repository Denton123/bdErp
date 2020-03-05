<!--
 * @Description: 新增表单
 * @Author: sdt
 * @Date: 2019-07-17 16:57:49
 * @LastEditTime: 2019-08-09 10:34:56
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div>
    <a-modal
      title="新建调整单"
      :visible="formVisible"
      @ok="handleNew"
      @cancel="handleCancel"
      okText="确认"
    >
      <a-form :form="form" @submit="handleNew">
        <a-form-item
          v-for="(item, index) in newComponent"
          :key="index"
          :label="item.label"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :class="[item.type==='inputArr' ? 'noMt' : '']"
        >
          <!-- 下拉选择 -->
          <a-select v-if="item.type === 'select'" v-decorator="[`${item.name}`]">
            <a-select-option
              v-for="(selectItem, index) in item.options"
              :key="index"
              :value="selectItem.value"
            >{{selectItem.value}}</a-select-option>
          </a-select>
          <!-- 输入框 -->
          <a-input
            v-else-if="item.type==='input'"
            v-decorator="[`${item.name}`]"
            :placeholder="item.placeholder"
          />
          <!-- 输入框组合 -->
          <div v-else-if="item.type==='inputArr'" class="inputArr">
            <a-form-item>
              <a-input v-decorator="[`${item.startname}`]" :placeholder="item.placeholder" />
            </a-form-item>

            <span class="sperator">至</span>
            <a-form-item>
              <a-input v-decorator="[`${item.endname}`]" :placeholder="item.placeholder" />
            </a-form-item>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "newForm",
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
  },
  props: {
    formVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    newComponent: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    handleNew(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      });
    },
    handleCancel() {
      this.$emit("newFormCancel");
    }
  }
};
</script>

<style lang="scss" scoped>
.ant-row.ant-form-item {
  display: flex;
}
.inputArr {
  display: flex;
}
.sperator {
  margin: 0 8px;
}
.noMt {
  margin-bottom: 0;
}
</style>

