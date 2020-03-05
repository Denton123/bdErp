<!--
 * @Description: 修改用户名
 * @Author: your name
 * @Date: 2019-07-16 13:42:43
 * @LastEditTime: 2019-09-16 14:43:35
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div>
    <a-row>
      <a-col :lg="{span:10, offset:7}">
        <div>
          <a-form :form="form" class="textleft" @submit="handleSubmit">
            <a-form-item label="头像" :label-col="{ span: 6 }" :wrapper-col="{ span: 6 }">
              <a-popover placement="bottomLeft" trigger="click" v-model="visible">
                <template slot="content">
                  <a-avatar
                    v-for="(img, index) in images"
                    :key="index"
                    :src="img"
                    @click="changeImg(index, img)"
                    :size="60"
                    class="mlr10 clickable"
                  />
                </template>
                <a-avatar :size="60" class="clickable" :src="getUserIcon" />
              </a-popover>
            </a-form-item>
            <a-form-item label="性别" :label-col="{ span: 6 }" :wrapper-col="{ span: 6 }">
              <a-radio-group v-decorator="[
                    'gender'
                  ]">
                <a-radio value="1">男</a-radio>
                <a-radio value="2">女</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="用户名" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                size="default"
                maxlength="16"
                v-decorator="[
                    'name',
                    { rules: [{ required: true, type: 'string', max: 16, whitespace:true, message: '请输入用户名!' }] }
                  ]"
                placeholder="请输入用户名"
              />
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
  name: "ChangeName",
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      getUserIcon: "",
      defaultImg: {
        id: 0,
        img: "/img/u.png",
        color: "blue"
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
      ],
      imgId: ""
    };
  },
  computed: {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.gender == undefined) values.gender = 0;
          let form = {
            ...values,
            hp: this.imgId
          };
          UserServiceApi.modifyInfo(form).then(res => {
            if (res.ret == 0) {
              localStorage.setItem(auth.session.name, form.name);
              localStorage.setItem(auth.session.hp, form.hp);
              this.$message.success("操作成功");
              this.goto("/erp/personalCenter");
            } else {
              this.$message.error("服务器未响应，请稍后再试");
              // this.goto("/erp/personalCenter");
            }
          });
        }
      });
    },
    goto(path) {
      this.$router.push({ path: path });
    },
    changeImg(index, img) {
      this.imgId = index;
      this.getUserIcon = img;
      this.visible = false;
    },
    getAccountImages() {
      UserServiceApi.getHPList().then(res => {
        if (res.ret == 0) {
          // this.defaultImg = res.data;
          this.images = res.data[0];
        } else {
          this.visible = false;
          // this.$message.error("服务器未响应，请稍后再试");
        }
      });
    }
  },
  mounted() {
    this.getAccountImages();
    let img = localStorage.getItem(auth.session.hp);
    switch (img) {
      case "0":
        this.getUserIcon = "/api/images/user/1.png";
        break;
      case "1":
        this.getUserIcon = "/api/images/user/2.png";
        break;
      case "2":
        this.getUserIcon = "/api/images/user/3.png";
    }
    if (!auth.isLogin()) {
      // this.goto("/erp/purchase/dangerLine");
    } else {
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

