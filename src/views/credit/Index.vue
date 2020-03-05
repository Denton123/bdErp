<template>
  <div style="background-color:#F4F5FA;min-height:100vh;">
    <!-- <div style="background:white;">
      <HeaderComponent></HeaderComponent>
    </div>-->

    <div class="bgcover">
      <div style="padding-top:1.5rem;">
        <a-row>
          <!-- <a-col :lg="{span:24}" :xs="{span:0}"><div style="font-size:32px;line-height:45px;"><b>北斗生命科学服务中心</b></div></a-col> -->
          <a-col :lg="{span:24}" :xs="{span:24}">
            <div style="font-size:21px;">
              <b>北斗生命科学审批中心</b>
            </div>
          </a-col>
        </a-row>
        <a-row style="margin-top:10px;margin-bottom:10px;">
          <a-col :lg="{span:2, offset:11}" :xs="{span:6, offset:9}">
            <div style="padding:0 25%;">
              <div style="border:1.5px solid #1890FF"></div>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :lg="{span:24}" :xs="{span:24}">
            <div>让审批更容易</div>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="content" style="max-width:1200px;width:100%;">
      <a-row>
        <a-col :lg="{span:20, offset:2}" :xs="{span:24, offset:0}">
          <a-row :key="index" v-for="(item, index) in tabs" style="text-align:left;">
            <a-col :xs="{span:24, offset:0}" style="background-color:white;">
              <div style="padding:25px 23px 25px 23px">
                <a-row>
                  <a-col :lg="{span:16}" :xs="{span:16}">
                    <div style="font-size:18px;">
                      <b>{{ item.title }}</b>
                    </div>
                    <div style="margin-top:10px;">{{ item.descr }}</div>
                    <a-button
                      type="primary"
                      style="margin-top:16px;"
                      @click="doClick(item.path)"
                    >{{ item.btn }}</a-button>
                  </a-col>

                  <a-col :lg="{span:8}" :xs="{span:8}">
                    <div style="text-align:right;padding-top:13px;">
                      <img :src="item.img" />
                    </div>
                  </a-col>
                </a-row>
              </div>
            </a-col>
            <a-col :lg="{span:0}" :xs="{span:24}" style="height:12px;"></a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>

    <a-row>
      <!-- <a-col :lg="{span:24}" :xs="{span:0}" style="height:360px;"></a-col> -->
    </a-row>
  </div>
</template>

<script>
// import HeaderComponent from '../../components/credit/Header.vue'
import auth from "@/auth";
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();
export default {
  components: {},
  data() {
    return {
      name: "首页",
      displayName: "",
      isLogin: false,
      tabs: [
        {
          title: "授信审批",
          descr: "在这您可以查看与您相关的授信订单",
          img: require("../../assets/h2.png"),
          btn: "开始审批",
          path: "http://work.bdlifescience.com/reception/credit/orderList"
        },
        {
          title: "采购审批",
          descr: "您可以在此查看与您相关的采购订单。",
          img: require("../../assets/h3.png"),
          btn: "开始审批",
          path: "credit/list"
        }
      ]
    };
  },
  methods: {
    goto(path) {
      this.$router.push({ path: path });
    },
    doClick(path) {
      window.location.href = path;
    },
    // 判断是否是登录成功之后进入系统的
    hasLogin() {
      let prevLink = document.referrer;
      let baseUrl = "";
      baseUrl =
        window.location.href.indexOf("dev") !== -1
          ? "http://dev.work.bdlifescience.com"
          : window.location.href.indexOf("test") !== -1
          ? "http://test.work.bdlifescience.com"
          : "http://work.bdlifescience.com";
      if (prevLink.indexOf(baseUrl) !== -1 && prevLink !== "") {
        return;
      } else {
        if (!auth.isLogin()) {
          window.location.href = `${baseUrl}/login`;
        }
      }
    }
  },
  beforeCreate() {
    BaseServiceApi.getRole("/user/api/navigation", {}).then(res => {
      res.data.forEach(v => {
        if (v.enName == "inventory") {
          v.roles.forEach(i => {
            localStorage.setItem("IN_CREDIT_ROLE", i.code);
          });
        }
      });
    });
  },
  mounted: function() {
    this.hasLogin();
  },
  created: function() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bgcover {
  background-image: url("/img/sales_home.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  /* width:375px; */
  height: 180px;
}

/* @media only screen and (min-width: 768px) {
    .whole-page {
      height:100vh
    }
  } */

.hide {
  display: none;
}
.show {
  display: block;
}
.t180 {
  margin: 0 auto;
  margin-top: 180px;
}

.t240 {
  margin: 0 auto;
  margin-top: 240px;
}

.content {
  width: 100%;
  padding: 12px 12px;
  margin: 0 auto;
}
</style>
