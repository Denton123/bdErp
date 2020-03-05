<!--
 * @Description: 导出csv表单
 * @Author: sdt
 * @Date: 2019-07-22 16:38:27
 * @LastEditTime: 2019-12-18 10:15:08
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div>
    <a-modal
      title="导出"
      :visible="formVisible"
      @ok="handleExport"
      @cancel="handleCancel"
      okText="确认"
    >
      <a-form :form="form" @submit="handleExport">
        <a-form-item
          v-for="(item, index) in exportComponent"
          :key="index"
          :label="item.label"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :class="[item.type==='inputArr' || item.type==='dateArr' ? 'noMt' : '']"
        >
          <!-- 输入框 -->
          <a-input
            v-if="item.type === 'input'"
            v-decorator="[`${item.name}`]"
            :placeholder="item.placeholder"
          />
          <!-- 下拉选择 -->
          <a-select v-else-if="item.type === 'select'" v-decorator="[`${item.name}`]">
            <a-select-option
              v-for="(selectItem, index) in item.options"
              :key="index"
              :value="selectItem.key"
            >{{selectItem.value}}</a-select-option>
          </a-select>
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
          <!-- 日期选择器组合 -->
          <div v-else-if="item.type==='dateArr'" class="inputArr">
            <a-form-item>
              <a-date-picker
                v-decorator="[`${item.startTime}`]"
                :placeholder="item.startplaceholder"
              />
            </a-form-item>
            <span class="sperator">至</span>
            <a-form-item>
              <a-date-picker v-decorator="[`${item.endTime}`]" :placeholder="item.endplaceholder" />
            </a-form-item>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "exportForm",
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17}
      },
      exportParams:{}
    };
  },
  props: {
    formVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    exportComponent: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    handleExport(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.exportParams = values
          this.$emit('handleExport', values)
        }
      });
    },
    handleCancel() {
      this.$emit("exportFormCancel");
    }
  },
  watch: {
    formVisible(v) {
      if (!v) {
        this.form.resetFields();
      }
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


