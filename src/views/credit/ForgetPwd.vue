<template>
  <div class="bgcover">
    <div class="content">
        <div style="height:80px;"></div>
        <div class="content-bg">
          <div class="pcContent">
            <div class="textleft" style="font-size:16px;"><b>{{ titleText }}</b></div>
            <div style="height:25px;"></div>
            <div v-if="step == 2">
              <a-form
                :form="pwdForm"
                class="textleft"
                @submit="handleSubmit"
              >
                <a-form-item>
                  <a-input
                    v-on:focus="focused = true"
                    v-on:blur="focused = false"
                    maxlength="16"
                    size="large"
                    v-decorator="[
                      'pwd',
                      { rules: [{ required: true, type: 'string', min:6, max:16, whitespace:false, message: '请输入6-16位密码' }] }
                    ]"
                    type="password"
                    placeholder="请输入6-16位密码"
                  >
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input
                    v-on:focus="focused = true"
                    v-on:blur="focused = false"
                    maxlength="16"
                    size="large"
                    v-decorator="[
                      'confirmPwd',
                      { rules: [{ required: true, type: 'string', min:6, max:16, whitespace:false, message: '请再次输入密码' }] }
                    ]"
                    type="password"
                    placeholder="请再次输入密码"
                  >
                  </a-input>
                </a-form-item>

                <a-button
                  type="primary"
                  size="large"
                  html-type="submit"
                  block
                >
                  完成
                </a-button>
              </a-form>
            </div>

            <div v-if="step == 1">
              <a-form
                :form="validateForm"
                class="textleft"
                @submit="nextstep"
              >
                <a-form-item>
                  <a-input
                    maxlength="11"
                    size="large"
                    autocomplete=off
                    v-on:focus="focused = true"
                    v-on:blur="focused = false"
                    onkeyup="this.value=this.value.replace(/\D/g,'')"
                    onafterpaste="this.value=this.value.replace(/\D/g,'')"
                    v-on:keyup="clickableCheck"
                    v-decorator="[
                      'phoneNum',
                      { rules: [{ required: true, type: 'string', min:11, max:11,  message: '请输入11位手机号码' }] }
                    ]"
                    placeholder="11位手机号码"
                  >
                  </a-input>
                </a-form-item>

                <a-form-item>
                  <a-row :gutter="{xs:0, lg:7}" type="flex" justify="space-between">
                    <a-col :xs="14" :lg="18">
                      <a-input
                        maxlength="4"
                        size="large"
                        v-on:focus="focused = true"
                        v-on:blur="focused = false"
                        onkeyup="this.value=this.value.replace(/\D/g,'')"
                        onafterpaste="this.value=this.value.replace(/\D/g,'')"
                        v-on:keyup="clickableCheck"
                        v-decorator="[
                          'captcha',
                          { rules: [{ required: true, type:'string', len:4, message: '请输入验证码!' }] }
                        ]"
                        placeholder="请输入验证码"
                      >
                      </a-input>
                    </a-col>
                    <a-col :xs="10" :lg="6" class='textright'>
                      <div>
                        <a-button    size="large" style="width:100px;padding:0px;">
                          <img style="width:100px;height:42px;" @click="captchaReload" :src='"/api/credit/captcha" + "?_=" + captchaRandomID'>
                        </a-button>
                      </div>
                    </a-col>
                  </a-row>
                </a-form-item>

                <a-form-item>
                  <a-row :gutter="{xs:0, lg:7}" type="flex" justify="space-between">
                      <a-col :xs="14" :lg="18">
                      <a-input
                        autocomplete=off
                        maxlength="4"
                        size="large"
                        :disabled="smsDisabled"
                        v-on:focus="focused = true"
                        v-on:blur="focused = false"
                        onkeyup="this.value=this.value.replace(/\D/g,'')"
                        onafterpaste="this.value=this.value.replace(/\D/g,'')"
                        v-decorator="[
                          'code',
                          { rules: [{ required: true, type:'string', min:4, max:4, message: '请输入短信验证码!' }] }
                        ]"
                        placeholder="短信验证码"
                      >
                      </a-input>
                    </a-col>
                    <a-col :xs="10" :lg="6" class='textright'>
                      <a-button  size="large" :disabled="!clickable" @click="getSmsCode" style="width:100px;">
                        <span v-if="smsWait" style="font-size:12px;">{{counter}}秒后重发</span>
                        <span  v-else style="font-size:12px;">短信验证码</span>
                      </a-button>
                    </a-col>
                  </a-row>
                </a-form-item>

                <a-button
                  type="primary"
                  size="large"
                  html-type="submit"
                  block
                >
                  下一步
                </a-button>
              </a-form>
              </div>
          </div>
        </div>
        <div style="position:absolute;left:50%;bottom:54px;" v-show="!focused">
          <div style="position:relative;left: -50%;">
            <span style="color:gray">copyright<a-icon type="copyright" />2018北斗生命科学</span>
          </div>
        </div>
    </div>
     <toast v-model="show" width="4.5rem" :time="1200" type="text"><div  style="margin:0 0.4rem;">{{errMsg}}</div></toast>
     <toast v-model="showSuccess" @on-hide="goto('/patient/login')" type="success" width="5.4rem" :time="800"><div style="padding: 0 0.5rem;text-align:center;">{{successMsg}}</div></toast>
  </div>
</template>

<script>
// import auth from '../../auth.js'
import { Toast } from 'vux'
import CreditService from '../../services/CreditService'
const CreditServiceApi = new CreditService()

export default {
  components: {
    Toast,
  },
  data () {
    return {
      // captchaID: '_' + Math.random().toString(36).substr(2, 17),
      focused: false,
      captchaRandomID: Math.random(),
      smsWait: false,
      smsDisabled:true,
      counter: 120,
      timer: null,
      clickable: false,
      phoneNum: '',
      step: 1,
      errMsg: '',
      successMsg: '',
      show: false,
      showSuccess: false,
      pwdForm: this.$form.createForm(this),
      validateForm: this.$form.createForm(this),
    }
  },
  computed: {
    titleText() {
      if (this.step == 1) {
        return '找回密码'
      } else {
        return '修改密码'
      }
    }
  },
  methods: {
    nextstep (e) {
      e.preventDefault();
      this.validateForm.validateFields((err, values) => {
        if (!err) {
          values.captchaID = this.captchaID
          CreditServiceApi.forgetPwdValidate(values).then(res => {
            if (res.ret === 0) {
              this.phoneNum = values.phoneNum
              this.step = 2
            } else {
              this.errMsg = res.msg
              this.show = true
              this.captchaReload()
            }
          })
        }
      });
    },
    handleSubmit (e) {
      e.preventDefault();
      this.pwdForm.validateFields((err, values) => {
        if (!err) {
          if (values.pwd == values.confirmPwd) {
            values.phoneNum = this.phoneNum
            CreditServiceApi.forgetPwdChange(values).then(res => {
              if (res.ret === 0) {
                this.successMsg = '密码修改成功'
                this.showSuccess = true
              } else {
                this.show = true
                this.errMsg = ""
              }
            })
          } else {
            this.show = true
            this.errMsg = '两次输入密码不一致'
          }
        }
      });
    },
    forgetPwd() {
      this.goto('/patient/forget')
    },
    goto (path) {
      this.$router.push({path: path})
    },
    captchaReload() {
      this.captchaRandomID = Math.random()
    },
    getSmsCode() {
      this.smsWait = true
      this.clickable = false
      this.countDown()
      CreditServiceApi.getCpSmsCode({phoneNum: this.validateForm.getFieldValue("phoneNum")}).then(res => {
        if (res.ret == 1) {
          this.errMsg = "获取短信验证码失败"
          this.show = true
        } else {
          this.smsDisabled = false
        }
      })
    },
    countDown() {
      this.timer = setInterval(() => {
        this.counter--
        if (this.counter === 0) {
          this.clearTimer()
        }
      }, 1000);
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.counter = 120
      this.smsWait = false
      this.clickableCheck()
    },
    clickableCheck() {
      let pn = this.validateForm.getFieldValue("phoneNum")
      let captcha = this.validateForm.getFieldValue('captcha')
      if (pn && pn.length == 11 && captcha && captcha.length == 4 && !this.timer) {
        this.clickable = true
      } else {
        this.clickable = false
      }
    }
  },
  mounted: function () {
   //  let detectBack = {
   //   initialize: () => {
   //     window.addEventListener('popstate', e => {
   //         if (e.state) {
   //           if (this.$store.state.loginRedirect == 1) {
   //              this.$store.commit('setLoginRedirect', 0)
   //              this.$router.go(-2)
   //           }
   //         }
   //     }, false);
   //   }
   // }
   // detectBack.initialize();
   // let target = this.$route.params.target
   // this.target = target
  },
}
</script>
<style scoped>


@media only screen and (max-width:768px) {
  .bgcover {
    background-image: url("/img/login_ph_bg.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width:100%;
    min-height:100vh;
  }

  .pcContent {
    /* padding:40px 35px; */
    /* min-height:330px; */
  }
}


@media only screen and (min-width:768px) {
  .pcContent {
    /* background-color:white; */
    /* padding:40px 35px; */
    /* min-height:330px; */
  }

  .bgcover {
    background-image: url("/img/login_bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width:100%;
    min-height:100vh;
  }
}

.margin24 {
  margin-top: 24px;
}

.login-div {
  margin-right: 25px;
  display: inline-block;
}

.login-icon {
  width: 50px;
  height:50px;
}

.textleft {
  text-align:left;
}

.textright {
  text-align:right;
}

.content-bg {
  background-color: white;
  margin: 0 25px;
  padding: 25px 25px 38px 25px;

}

.content {
    width:100%;
    margin: 0 auto;
    height:100vh;
}
</style>
