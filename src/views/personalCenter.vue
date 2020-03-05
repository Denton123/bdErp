<!--
 * @Description: 个人中心
 * @Author: your name
 * @Date: 2019-07-16 09:50:49
 * @LastEditTime: 2019-08-01 13:43:31
 * @LastEditors: Please set LastEditors
 -->
 
<template>
  <div class="content">
    <a-row>
      <a-col :lg="{span:10, offset:7}">
        <div>
          <a-row class="mt29">
            <a-col :lg="{span:6}" class="textright">个人信息：</a-col>
            <a-col :lg="{span:18}" class="textleft">
              <a @click="changeName">修改</a> 
            </a-col>
          </a-row>
          <a-row>
            <a-col :lg="{span:6}" class="textright">登录密码：</a-col>
            <a-col :lg="{span:18}" class="textleft">
              <a @click="changePwd">修改</a>
            </a-col>
          </a-row>

          <a-row>
            <a-col :lg="{span:6}" class="textright"></a-col>
          </a-row>
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
  name: "personalCenter",
  data() {
    return {
      name: "个人信息",
      visible: false,
      defaultImg: {
        // id: 0,
        // img: "/img/u.png",
        // color: "blue"
      },
      images: [
        // {
        //   id: 1,
        //   img: "/img/u.png",
        //   color: "green"
        // },
        // {
        //   id: 3,
        //   img: "/img/u.png",
        //   color: "red"
        // }
      ]
    };
  },
  methods: {
    backClick() {},
    goto(path, name, params) {
      this.$router.push({ path: path, name: name, params: params });
    },
    changePwd() {
      this.goto("/erp/changePwd", "changePwd", { title: "修改密码" });
    },

    changeName() {
      this.goto("/erp/changeName", "changeName", { title: "修改个人信息" });
    },
    // changeImg(index, img) {
    //   UserServiceApi.modifyInfo({ id: img.id }).then(res => {
    //     if (res.ret == 0) {
    //       this.images.splice(index, 1, this.defaultImg);
    //       this.defaultImg = img;
    //       this.visible = false;
    //       localStorage.setItem(auth.session.userIcon, img.img);
    //       this.$message.success("操作成功");
    //       this.goto("/erp/personalCenter");
    //     } else {
    //       this.visible = false;
    //       this.$message.error("服务器未响应，请稍后再试");
    //     }
    //   });
    // },
    // getAccountImages() {
    //   UserServiceApi.getHPList().then(res => {
    //     if (res.ret == 0) {
    //       this.defaultImg = res.data.defaultImg;
    //       this.images = res.data.images;
    //       this.$message.success("操作成功")
    //     } else {
    //       this.visible = false;
    //       this.$message.error("服务器未响应，请稍后再试");
    //     }
    //   });
    // }
  },
  mounted() {
    // if (!auth.isLogin()) {
    //   this.goto("/erp/purchase/dangerLine");
    // } else {
    //   // this.getAccountImages();
    // }
  }
};
</script>

<style lang="scss" scoped>
.content {
  max-width: 1000px;
  width: 100%;
  margin-top: 26px;
  margin: 0 auto;
  background-color: white;
  margin-top: 19px;
  //   min-height: 100vh;
}
.ant-row {
  line-height: 62px;
}
.clickable {
  cursor: pointer;
}

.mt29 {
  margin-top: 29px;
}

.mlr10 {
  margin-left: 10px;
  margin-right: 10px;
}

.textright {
  text-align: right;
}

.textleft {
  text-align: left;
}
</style>

