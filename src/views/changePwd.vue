<!--
 * @Description: 修改密码
 * @Author: your name
 * @Date: 2019-07-16 13:53:29
 * @LastEditTime: 2019-08-02 16:10:13
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div>
    <a-row>
      <a-col :lg="{span:10, offset:7}">
        <div class="mt40">
          <a-form :form="form" class="textleft" @submit="handleSubmit">
            <a-form-item label="原密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                maxlength="16"
                size="default"
                v-decorator="[
                  'pwd',
                  { rules: [{ required: true, type: 'string', min:6, max:16, whitespace:true, message: '请输入6-16位密码' }] }
                ]"
                type="password"
                placeholder="请输入6-16位密码"
              ></a-input>
            </a-form-item>
            <a-form-item label="新密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                maxlength="16"
                size="default"
                v-decorator="[
                  'pwd1',
                  { rules: [{ required: true, type: 'string', min:6, max:16, whitespace:true, message: '请输入6-16位密码' }] }
                ]"
                type="password"
                placeholder="请输入6-16位密码"
              ></a-input>
            </a-form-item>
            <a-form-item
              autocomplete="off"
              maxlength="16"
              label="确认密码"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                maxlength="16"
                size="default"
                v-decorator="[
                  'pwd2',
                  { rules: [{ required: true, type: 'string', min:6, max:16, whitespace:true, message: '请输入6-16位密码' }] }
                ]"
                type="password"
                placeholder="请输入6-16位密码"
              ></a-input>
            </a-form-item>
            <a-row>
              <a-col :lg="{span:6}" class="textright"></a-col>
              <a-col :lg="{span:18}" class="textleft" style="margin-bottom:100px;">
                <a-button type="primary" html-type="submit">确认</a-button>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import auth from "@/auth.js";
import UserService from "@/services/UserService";
const UserServiceApi = new UserService();
export default {
  name: "changePwd",
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.pwd1 != values.pwd2) {
            this.$message.error("两次输入密码不匹配");
            return;
          }
          UserServiceApi.modifyPW(values).then(res => {
            if (res.ret == 0) {
              this.$message.success("操作成功");
              // 同时更新header部分用户名
              this.goto("/login");
            } else {
              this.$message.error(res.msg);
              // this.goto("/erp/personalCenter");
            }
          });
        }
      });
    },
    goto(path) {
      this.$router.push({ path: path });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


