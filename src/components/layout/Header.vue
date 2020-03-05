<template>
  <div style="height:65px;">
    <b class="system-logo">北斗库存管理系统</b>
    <a-row>
      <a-col :lg="{span:4, offset:0}">
        <div style="line-height:65px;;text-align:left;">
          <!-- <b>{{getBreadcrumb}}</b> -->
        </div>
      </a-col>

      <a-col :lg="{span:26, offset:0}" style="padding-right:5px;">
        <div style="line-height:65px;text-align:right;">
          <img :src="usericon" style="width:31px;height:31px;" />
          <div style="display:inline-block;line-height:65px;padding-left:12px;">{{ username }}</div>
          <!-- <div
            style="display:inline-block;line-height:65px;padding-left:12px;cursor:pointer;"
            @click="logout"
          >退出</div>-->
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import auth from "../../auth";
import UserService from "@/services/UserService";
const UserServiceApi = new UserService();
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();
export default {
  data() {
    return {
      username: "",
      usericon: "",
      timer: null
    };
  },
  methods: {
    goto(path, params) {
      this.$router.push({ path: path, params: params });
    },
    handleImg(gender) {
      switch (gender) {
        case "0":
          this.usericon = require("../../assets/user0.png");
          break;
        case "1":
          this.usericon = require("../../assets/user1.png");
          break;
        case "2":
          this.usericon = require("../../assets/user2.png");
      }
    }
  },
  beforeCreate() {
    BaseServiceApi.getRole("/user/api/getUserInfo", {}).then(res => {
      if (res.ret == 0) {
        this.username = res.data.name;
        this.handleImg(`${res.data.gender}`);
      }
    });
  },
  mounted() {},
  watch: {}
};
</script>

<style lang="scss">
.system-logo {
  float: left;
  font-size: 18px;
}
.ant-layout-header {
  border-bottom: 1px solid rgb(216, 216, 216);
}
</style>

