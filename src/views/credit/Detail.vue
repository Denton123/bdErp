<template>
  <div class="body">
    <div v-if="loading">
      <div style="height:10vh;"></div>
      <p style="text-align:center;">
        <inline-loading></inline-loading>
      </p>
    </div>

    <div v-if="!loading">
      <ApplicationDetailComponent :data="detailData"></ApplicationDetailComponent>
      <div class="mt25" style="padding-bottom:16px;">
        <box gap="16px 20px 0px">
          <x-button type="primary" @click.native="ok" style="background-color:#1890FF!important;">确认</x-button>
        </box>
      </div>
    </div>

  </div>

</template>


<script>

  import {InlineLoading, XButton, Box } from 'vux'

  import ApplicationDetailComponent from '../../components/credit/Detail'
  import CreditService from '../../services/CreditService'
  const CreditServiceApi = new CreditService()


  export default {
    components: {
      ApplicationDetailComponent,
      XButton,
      Box,
      InlineLoading
    },
    data () {
      return {
        purOrdId: '',
        loading:true,
        detailData: {
          // dept: '测试',
          // group: 'test',
          // reqTime: '2019-01-01 12:00',
          // reqName: 'test',
          // revTime: '2019-01-01 12:00',
          // amount: 1234.12,
          // demTime: '2019-01-01 12:00',
          // instru: 'xxx',
          // revOpin: 'xxxx',
          // list: [
          //   {
          //     matNo: 1,
          //     goodsNo: 'aaaa1',
          //     matName: 'xxxx1',
          //     factory: 'aaacasdada',
          //     spec: 'xxx',
          //     unit: 2,
          //     total: 12,
          //     price: 1231.1
          //   },
          // ]
        },
      }
    },
    methods: {
      ok () {
        this.goto('/list')
      },
      cancel() {
        this.goto('/list')
      },
      goto(path) {
        this.$router.push({path: path})
      },
      getDetailInfo() {
        CreditServiceApi.getDetailInfo(this.purOrdId).then(res => {
          if (res.ret == 0) {
            this.detailData = res.data
            this.loading = false
          } else {
            this.cancel()
          }
        })
      }
    },
    mounted: function() {
      this.purOrdId = this.$route.params.id
      if (!this.purOrdId) {
        this.cancel()
      }
      this.getDetailInfo()
    }
  }

</script>

<style scoped>

  .body {
    background-color:#F4F5FA;
    min-height:100vh;
  }

  .mt25 {
    margin-top: 25px;
  }

</style>
