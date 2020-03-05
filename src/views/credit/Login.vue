<template>
  <div class="bgcover">
    <div class="content">
        <div style="height:80px;"></div>
        <div class="content-bg">
          <div class="pcContent">
            <div class="textleft" style="font-size:16px;"><b>登录</b></div>
            <div style="height:25px;"></div>
            <div v-if="loginType == 1">
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
                    v-on:focus="focused = true"
                    v-on:blur="focused = false"
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
                    v-on:focus="focused = true"
                    v-on:blur="focused = false"
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

                <!-- <div class="margin24 textleft" style="font-size:12px;">未注册的手机号码验证后自动创建北斗生命账号</div> -->
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

            <div v-if="loginType == 2">
              <a-form
                :form="smsForm"
                class="textleft"
                @submit="handleSubmit1"
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
                  <a-row :gutter="{xs:0, lg:7}">
                      <a-col :xs="14" :lg="18">
                      <a-input
                        v-on:focus="focused = true"
                        v-on:blur="focused = false"
                        onkeyup="this.value=this.value.replace(/\D/g,'')"
                        onafterpaste="this.value=this.value.replace(/\D/g,'')"
                        autocomplete=off
                        :disabled="smsDisabled"
                        maxlength="4"
                        size="large"
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

                <!-- <div class="margin24 textleft" style="font-size:12px;">未注册的手机号码验证后自动创建北斗生命账号</div> -->
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

              <!-- <div class="margin24">
                <a-row>
                  <a-col :span="8" class="textleft"></a-col>
                  <a-col :span="10" class="textright"> <a @click="changeLoginType">{{ lgoinTypeText }}</a></a-col>
                  <a-col :span="6" class="textright"> <a @click="forgetPwd"> 忘记密码 </a></a-col>
                </a-row>
              </div> -->

              <!-- <div class="margin24 textleft">
                <div class="login-div">
                  <img class="login-icon" src="/img/qq.png" />
                </div>
                <div class="login-div">
                  <img class="login-icon" src="/img/wechat.png" />
                </div>
              </div> -->
          </div>
        </div>
        <div style="position:absolute;left:45%;bottom:1rem;"  v-show="!focused">
          <div style="position:relative;left: -45%;">
            <span style="color:gray">copyright<a-icon type="copyright"/>2018北斗生命科学</span>
          </div>
        </div>
    </div>
     <toast v-model="show" type="text" width="5.4rem" :time="1200">{{errMsg}}</toast>

  </div>
</template>

<script>

import auth from '../../auth.js'
import { Toast } from 'vux'
import CreditService from '../../services/CreditService'
const CreditServiceApi = new CreditService()

export default {
  components: {
    Toast,
  },
  data () {
    return {
      focused: false,
      type: 'credit',
      name: 'Login',
      smsWait: false,
      smsDisabled: true,
      counter: 120,
      timer: null,
      clickable: false,
      loginType: 1,
      errMsg: '',
      show: false,
      redirectURL: '',
      pwdForm: this.$form.createForm(this),
      smsForm: this.$form.createForm(this),
    }
  },
  computed: {
    lgoinTypeText: function() {
      if (this.loginType == 1) {
        return '短信验证码登录'
      } else if (this.loginType == 2) {
        return '密码登录'
      }
      return ''
    },
  },
  methods: {
    submit(values) {
      CreditServiceApi.login(this.loginType, values).then(res => {
        if (res.ret === 0) {
          auth.setLoginSession(res.data)
          if (this.redirectURL) {
            this.goto(this.redirectURL)
          } else {
            this.goto('/credit')
          }
        } else {
          this.show = true
          this.errMsg = res.msg
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault();
      this.pwdForm.validateFields((err, values) => {
        if (!err) {
          CreditServiceApi.login(values).then(res => {
            if (res.ret === 0) {
              auth.setLoginSession(res.data)
              if (this.redirectURL) {
                this.goto(this.redirectURL)
              } else {
                this.goto('/credit/list')
              }
            } else {
              this.show = true
              this.errMsg = res.msg
            }
          })
        }
      });
    },
    handleSubmit1 (e) {
      e.preventDefault();
      this.smsForm.validateFields((err, values) => {
        if (!err) {
          this.submit(values)
        }
      });
    },
    forgetPwd() {
      this.goto('/credit/forgetPwd')
    },
    goto (path) {
      this.$router.push({path: path})
    },
    changeLoginType() {
      if (this.loginType == 1) {
        this.loginType = 2
      } else if (this.loginType == 2) {
        this.loginType = 1
      }
    },

    getSmsCode() {
      this.smsWait = true
      this.clickable = false
      this.countDown()
      CreditServiceApi.getSmsCode({phoneNum: this.smsForm.getFieldValue("phoneNum")}).then(res => {
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
      let pn = this.smsForm.getFieldValue("phoneNum")
      if (pn && pn.length == 11 && !this.timer) {
        this.clickable = true
      } else {
        this.clickable = false
      }
    }
  },
  mounted: function () {
    this.redirectURL = this.$route.query.to
  },
}
</script>
<style scoped>

body {
	width: 375px;
}



@media only screen and (max-width:768px) {
  .bgcover {
    background-image: url("/img/login_ph_bg.png");
    background-size: cover;
    background-position: center;
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
