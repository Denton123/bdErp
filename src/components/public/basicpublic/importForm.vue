<!--
 * @Description: 导入表单
 * @Author: sdt
 * @Date: 2019-07-22 17:35:22
 * @LastEditTime: 2019-10-30 10:16:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <a-modal
      title="csv导入"
      :visible="formVisible"
      @ok="handleImport"
      @cancel="handleCancel"
      okText="确认"
      :width="900"
    >
      <a-upload-dragger
        name="file"
        :action="uploadAction"
        @change="handleUploadChange"
        :headers="headers"
        style="height:150px;"
        :fileList="fileList"
        :beforeUpload="beforeUpload"
      >
        <p class="ant-upload-text">点击或拖拽文件到这里上传</p>
      </a-upload-dragger>
      <a-button type="primary" class="downtemplate" @click="download">下载上传模板</a-button>
    </a-modal>
  </div>
</template>

<script>
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();
export default {
  name: "importForm",
  data() {
    return {
      fileList: [],
      isSuccessed: false,
      headers: {}
    };
  },
  props: {
    formVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    uploadAction: {
      type: String,
      default() {
        return "";
      }
    }
  },
  methods: {
    // 提交上传
    handleImport() {
      this.$emit("importFormCancel");
    },
    // 取消
    handleCancel() {
      this.$emit("importFormCancel");
    },
    // 上传
    handleUploadChange(info) {
      const status = info.file.status;
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          if (file.response.ret == 0) {
            file.url = file.response.url;
          } else {
            this.$message.error(file.response.msg);
            file.status = 'error'
          }
        }
        return file;
      });
      if (this.isSuccessed) {
        this.fileList = fileList;
      } else {
        this.fileList = [];
      }
    },
    beforeUpload(file) {
      const xlsType = file.type === "application/vnd.ms-excel";
      const xlsxType =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      this.isSuccessed = xlsType || xlsxType;
      if (!xlsType && !xlsxType) {
        this.$message.error("请上传xls/xlsx文件");
        this.fileList = [];
        return xlsType || xlsxType;
      }
    },
    download() {
      this.$emit("download");
    }
  },
  mounted() {
    let role = localStorage.getItem("IN_ERP_ROLE");
    let token = localStorage.getItem("token");
    this.headers = {
      Authorization: token,
      UserRole: role
    };
  },
  watch: {
    $route: {
      handler: function(v) {
        this.fileList = [];
      }
    },
    formVisible(v) {
      if (!v) {
        this.fileList = [];
      }
    }
  }
};
</script>

<style lang="scss">
.choseinp {
  width: 89.5%;
  border-right: none;
}
.choseBtn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.inputGroup {
  margin-top: 20px;
  overflow: hidden;
  display: flex;
}
.inputGroup .ant-upload-list {
  display: none !important;
}
.downtemplate {
  margin-top: 20px;
}
</style>

