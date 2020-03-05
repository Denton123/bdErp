<template>
  <div>
    <a-row type="flex" justify="space-between">
      <a-col :lg="{span:4, offset:0}" :xs="{span:9, offset:0}"><div @click="goto('/')" style="font-size:18px;line-height:25px;text-align:left;padding:19px 0 20px 24px;cursor: pointer;"><b>北斗生命科学</b></div></a-col>
      <a-col  :lg="{span:20, offset:0}" :xs="{span:15, offset:0}" v-if="isLogin">
        <div style="text-align:right;padding:17px 24px 16px 0;">
          <img style="height:31px;width:31px;vertical-align:middle;margin-right:16px;" src="/img/u.png" />
          <span>{{displayName}}</span>
          <span style="margin-left:16px;cursor: pointer;" @click="logout">退出</span>
        </div>
      </a-col>

      <a-col  :lg="{span:20, offset:0}" :xs="{span:15, offset:0}" v-if="!isLogin">
        <div style="text-align:right;padding:17px 24px 16px 0;">
          <span style="cursor: pointer;" @click="goto('/login')">登录</span> / <span style="cursor: pointer;" @click="goto('/register')">注册</span>
        </div>
      </a-col>
    </a-row>
  </div>

</template>

<script>
import auth from '../auth.js'

export default {
  data () {
    return {
      name: '首页',
      displayName: '',
      accountType: '',
      isLogin: false,
    }
  },
  methods: {
    goto(path) {
      this.$router.push({path: path})
    },
    logout() {
      auth.logout()
      this.displayName = ''
      this.isLogin = false
    }
  },
  mounted: function () {
    if (auth.isLogin()) {
      this.isLogin = true
      this.displayName = JSON.parse(localStorage.getItem(auth.jwt.info)).displayName
      this.accountType = JSON.parse(localStorage.getItem(auth.jwt.info)).accountType
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .bgcover {
    background-image: url("/img/hbg.png");
    background-size: 100%, auto;
    background-repeat: no-repeat;
  }

  .hide {
    display: none;
  }
  .show {
    display: block;
  }
  .t180 {
    margin:0 auto;
    margin-top: 180px;
  }

  .t240 {
    margin:0 auto;
    margin-top: 240px;
  }


.content {
    width:100%;
    /* max-width: 380px; */
    margin: 0 auto;
}
</style>
