<template>
  <div style="width:100%;min-height:100vh;background-color:#F4F5FA;">
    <div class="content">
      <div>
        <div style="height:80px;"></div>

        <div style="max-width:420px;margin:0 auto;background-color:white;padding:46px;">
          <div class="pcContent">
            <div style="font-size:16px;text-align:left;"><b>登录</b></div>
            <div v-if="errMsg != ''" class="margin24">
              <a-alert
                 :message="errMsg"
                 type="error"
                 closable
                 @close="onAltertClose"
               />
            </div>
            <div style="height:24px;"></div>
            <div>
              <a-form
                :form="pwdForm"
                class="textleft"
                @submit="handleSubmit"
              >
                <a-form-item>
                  <a-input
                    maxlength="11"
                    size="large"
                    autocomplete=off
                    onkeyup="this.value=this.value.replace(/\D/g,'')"
                    onafterpaste="this.value=this.value.replace(/\D/g,'')"
                    v-decorator="[
                      'account',
                      { rules: [{ required: true, type: 'string', min:11, max:11,  message: '请输入11位手机号码' }] }
                    ]"
                    placeholder="11位手机号码"
                  >
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input
                    maxlength="16"
                    size="large"
                    v-decorator="[
                      'pwd',
                      { rules: [{ required: true, type: 'string', min:6, max:16, whitespace:true, message: '请输入密码' }] }
                    ]"
                    type="password"
                    placeholder="请输入密码"
                  >
                  </a-input>
                </a-form-item>

                <a-button
                  type="primary"
                  size="large"
                  html-type="submit"
                  block
                >
                  登录
                </a-button>
              </a-form>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import auth from '../auth'
import UserService from '@/services/UserService'
const UserServiceApi = new UserService() 

export default {
  data () {
    return {
      name: 'Login',
      redirectURL: '/erp/purchase/dangerLine',
      errMsg: "",
      clickable: false,
      pwdForm: this.$form.createForm(this),
    }
  },
  methods: {
    submit(values) {
      UserServiceApi.login(values).then(res => {
        if (res.ret === 0) {
          auth.setLoginSession(res.data)
          if (this.redirectURL) {
            this.goto(this.redirectURL)
          } else {
            this.goto('/')
          }
        } else {
          this.errMsg = res.msg
        }
      })
    },
    goto(path) {
      this.$router.push({path: path})
    },
    handleSubmit (e) {
      e.preventDefault();
      this.pwdForm.validateFields((err, values) => {
        if (!err) {
          this.submit(values)
        }
      });
    },
    onAltertClose() {
      this.errMsg = ""
    },
  },
  mounted: function () {
    this.redirectURL = this.$route.query.to
  },
}
</script>
<style scoped>

body {
  width:1280px;
}

.margin24 {
  margin-top: 24px;
}

.textleft {
  text-align:left;
}

.textright {
  text-align:right;
}

.content {
    width:100%;
    margin: 0 auto;
    height:100vh;
}
</style>
