<template>
  <div class="body">
    <div v-if="loading">
      <div style="height:10vh;"></div>
      <p style="text-align:center;">
        <inline-loading></inline-loading>
      </p>
    </div>

    <div v-transfer-dom>
      <confirm v-model="showRefuse"
        title="审批意见"
        @on-confirm="creditRefuse"
        @on-hide="resrtConfirm"
      >
      <slot>
        <x-textarea v-model="refuseReason" style="border-top: 1px solid #F8F8F8;border-bottom: 1px solid #F8F8F8;padding-left: 0px;" placeholder="请输入不通过原因"></x-textarea>
      </slot>
      </confirm>
    </div>

    <div v-if="!loading">
      <tab v-model="step" bar-active-color="#108EE9" active-color="#108EE9" :line-width="2">
        <tab-item @on-item-click="stepChange(0)">待办</tab-item>
        <tab-item @on-item-click="stepChange(1)">已办</tab-item>
      </tab>

      <div v-for="(item, index) in applications[step+1]" :key="item.purOrdId + index" >
        <div class="itemTag">
          <div style="border-bottom:1px solid #E5E5E5;padding: 13px 0 8px 0;">
            <flexbox>
             <flexbox-item :span="12"><div class="textleft" style="font-size:16px;">申请单号：{{item.purOrdNo}}</div></flexbox-item>
           </flexbox>
          </div>

          <div style="margin-top:18px;">
            <flexbox>
              <flexbox-item><div class="textleft">申请日期</div></flexbox-item>
              <flexbox-item><div class="textright pr15">{{item.reqTime}}</div></flexbox-item>
            </flexbox>
            <flexbox class="mt6">
              <flexbox-item><div class="textleft">申请人</div></flexbox-item>
              <flexbox-item><div class="textright pr15">{{item.name}}</div></flexbox-item>
            </flexbox>
            <flexbox class="mt6">
              <flexbox-item><div class="textleft">申请状态</div></flexbox-item>
              <flexbox-item><div class="textright pr15">{{statusText(item.status)}}</div></flexbox-item>
            </flexbox>
          </div>

          <div class="mt12">
            <div class="pr15 textright">
              <span v-if="item.status == 2">
                <x-button mini style="width:90px;color: white;background-color:#1890FF!important;margin-right:10px;" @click.native="accept(item.purOrdId)"><span style="font-size:13px;">审核通过</span></x-button>
                <x-button mini style="width:100px;color: white;background-color:#FF7774!important;margin-right:10px;" @click.native="refuse(item.purOrdId)"><span style="font-size:13px;">审核不通过</span></x-button>
              </span>
              <x-button mini v-if="item.status == 3" style="width:90px;background-color:#1890FF!important;margin-right:10px;"><span style="font-size:13px;color:white;">已通过</span></x-button>
              <x-button mini v-if="item.status == 4" style="width:90px;background-color:#FF7774!important;margin-right:10px;" ><span style="font-size:13px;color:white;">已拒绝</span></x-button>
              <x-button mini style="width:90px;background-color:#F8F8F8!important;border-right:0.5px solid #D8D8D8;" @click.native="showDetail(item.purOrdId)"><span style="font-size:13px;">查看详情</span></x-button>
            </div>
          </div>
        </div>
      </div>
      <toast v-model="show" type="text" width="5.4rem" :time="1200"><div style="padding: 0 0.5rem;text-align:center;">{{errMsg}}</div></toast>
    </div>
  </div>
</template>

<script>

  import auth from '../../auth.js'

  import { Toast, Tab, TransferDom, Confirm, TabItem, Flexbox, FlexboxItem, XButton, InlineLoading, XTextarea } from 'vux'

  import CreditService from '../../services/CreditService'
  const CreditServiceApi = new CreditService()

  export default {
    directives: {
      TransferDom,
    },
    components: {
      Tab,
      TabItem,
      Flexbox,
      FlexboxItem,
      XButton,
      Toast,
      InlineLoading,
      Confirm,
      XTextarea,
    },
    data () {
      return {
        showAccept: false,
        showRefuse: false,
        currentID: '',
        refuseReason: '',
        loading: true,
        type: 'credit',
        step: 0,
        show: false,
        errMsg: '',
        paginate: {
          page: 1,
          pageSize: 5,
        },
        applications: {
          1: [],
          2: [],
        }
      }
    },
    methods: {
      stepChange(step) {
        this.step = step
        this.getList()
      },
      resrtConfirm() {
        this.currentID = ''
        this.refuseReason = ''
      },
      statusText(status) {
        if (status == 1) {
          return '待提交'
        } else if (status == 2) {
          return '待审核'
        } else if (status == 3) {
          return '审核通过'
        } else if (status == 4) {
          return '审核不通过'
        } else {
          return '未知 #' + status
        }
      },
      showDetail(id) {
        this.goto('/detail/' + id)
      },
      goto(path) {
        this.$router.push({path:path})
      },
      accept(id) {
        this.creditAccept(id)
      },
      refuse(id) {
        this.currentID = id
        this.showRefuse = true
      },
      creditAccept(id) {
        CreditServiceApi.creditAccept(id).then(res => {
          if (res.ret == 0) {
            this.errMsg = '审核成功'
            this.show = true
            this.getList()
          } else {
            this.errMsg = res.msg
            this.show = true
          }
        })
      },
      creditRefuse() {
        CreditServiceApi.creditRefuse(this.currentID, {revOpin: this.refuseReason}).then(res => {
          if (res.ret == 0) {
            this.errMsg = '审核已拒绝'
            this.show = true
            this.getList()
          } else {
            this.errMsg = res.msg
            this.show = true
          }
           this.resrtConfirm()
        })
      },
      getList() {
        // this.loading = false
        // this.applications[this.step + 1]  = [
        //   {
        //     purOrdId: 1,
        //     purOrdNo: 'aaaaa',
        //     reqTime: '2019-01-01 12:00',
        //     name: 'xxx',
        //     status: 2
        //   },
        //   {
        //     purOrdId: 1,
        //     purOrdNo: 'aaaaa',
        //     reqTime: '2019-01-01 12:00',
        //     name: 'xxx',
        //     status: 3
        //   },
        //   {
        //     purOrdId: 1,
        //     purOrdNo: 'aaaaa',
        //     reqTime: '2019-01-01 12:00',
        //     name: 'xxx',
        //     status: 4
        //   }
        // ]
        // return

        CreditServiceApi.getList(this.step + 1).then(res => {
          if (res.ret == 0 ) {
            this.applications[this.step + 1] = res.data
            this.loading = false
          } else {
            this.loading = false
            this.errMsg = res.msg
            this.show = true
          }
        })
      }
    },
    mounted: function() {
      if(!auth.isLogin()) {
        // this.goto('/credit/login')
        // window.location.href = "http://dev.bdlifescience.com/login"
      }
      this.getList()
    }
  }

</script>

<style>

  .body {
    background-color:#F4F5FA;
    min-height:100vh;
  }

  .itemTag {
    padding-left:15px;
    padding-bottom: 15px;
    margin-top: 12px;
    background-color: white;
  }

  .textleft {
    text-align: left;
  }

  .textright {
    text-align: right;
  }

  .pr15 {
    padding-right: 15px;
  }
  .mt12 {
    margin-top: 12px;
  }

  .mt6 {
    margin-top: 6px;
  }

  .weui-dialog__bd {
    padding: 0px;
  }

</style>
