<template>
  <div class="content">
    <div style="text-align:left;line-height:0px;">
      <a-input v-model="search.operator" maxlength="36" placeholder="操作人" style="width: 20%;margin-rignt:24px;"></a-input>
      <a-select
        placeholder="选择操作类型"
        :value="selectedType"
        style="width: 20%;margin-left:14px;"
        @change="handleChange"
      >
        <a-select-option v-for="opt in opts" :key="opt.value" :value="opt.value">
          {{opt.label}}
        </a-select-option>
      </a-select>

      <a-date-picker style="margin-left:14px;"  v-model="search.dateTime" :format="dateFormat" />

      <a-button type="primary" @click="doSearch" style="margin-left:24px;margin-right:10px;"> 查询 </a-button>
      <a-button type="default" @click="reset"> 重置 </a-button>
    </div>

    <a-row style="margin-top:20px;background-color:white;">
      <a-col :lg="{span:24, offset:0}">
        <a-table :columns="columns" :dataSource="operateLogs" :pagination="false" rowKey='id' :scroll="{ x: scrollWidth}">
          <template slot="type" slot-scope="text">
            {{getTypeText(text)}}
          </template>
        </a-table>
      </a-col>

      <a-col :lg="{span:22, offset:1}" style="margin-top:38px;margin-bottom:50px;text-align:right;">
        <a-pagination :pageSize.sync="pagenate.pageSize" :total="pagenate.totalSize" v-model="pagenate.currentPage" @change="changeSubmit"  @showSizeChange="changePageSize" showSizeChanger showQuickJumper />
      </a-col>
    </a-row>
  </div>

</template>


<script>

  import moment from 'moment';
  import CommonService from '../services/CommonService'
  const CommonServiceApi = new CommonService()

  const demoColumns = [
    {title: '操作人', dataIndex: 'operator', width: 200},
    {title: '操作时间', dataIndex: 'dateTime', width: 200},
    {title: '操作类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, width: 200},
    {title: '操作详情', fixed: "right", dataIndex: 'detail', width: 400},
  ]

  const demoColumns2 = [
    {title: '操作人', dataIndex: 'operator', width: 200},
    {title: '操作时间', dataIndex: 'dateTime', width: 200},
    {title: '操作类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, width: 200},
    {title: '操作详情', dataIndex: 'detail', width: 400},
  ]

  export default {
    name: 'OperateComponent',
    props: ['data'],
    data() {
      return {
        scrollWidth: '',
        pagenate: {
          pageSize: 10,
          currentPage: 1,
          totalSize: 10,
        },
        dateFormat: 'YYYY-MM-DD',
        selectedType: [],
        search: {
          operator: '',
          type: '',
          dateTime: moment(),
        },
        demoColumns,
        demoColumns2,
        columns: [],
        opts: [
          {
            label: '删除',
            value: '1'
          },
          {
            label: '新增',
            value: '2'
          }
        ],
        operateLogs: [
          {
            id: 1,
            operator: '张三',
            dateTime: '2019-03-13',
            type: '更新',
            detail: 'xxxxxxxxx',
          },
          {
            id: 2,
            operator: '张三',
            dateTime: '2019-03-13',
            type: '更新',
            detail: 'xxxxxxxxx',
          },
        ],
      }
    },
    methods: {
      doSearch() {
        this.pagenate.currentPage = 1
        this.operateLog()
      },
      getTypeText(type) {
        const types = [...this.opts]
        const target = types.filter(item => item.value == type)[0]
        if (target) {
          return target.label
        }
      },
      operateLog() {
        const data = Object.assign({}, this.search)
        data.dateTime = data.dateTime.format(this.dateFormat)
        CommonServiceApi.operateLog(this.data.m, this.data.id, Object.assign(data, {page: this.pagenate.currentPage, pageSize: this.pagenate.pageSize})).then(res => {
          if (res.ret == 0) {
            this.operateLogs = res.data.data
            this.pagenate.totalSize = res.data.total
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      options() {
        CommonServiceApi.operateOpts(this.data.m).then(res => {
          if (res.ret == 0) {
            this.opts = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      goto(path) {
        this.$router.push({path: path})
      },
      reset() {
        this.search.operator = ''
        this.search.type = ''
        this.selectedType = []
        this.search.dateTime = moment()
      },
      changeSubmit(page, pageSize) {
        this.pagenate.currentPage = page
        this.pagenate.pageSize = pageSize
        this.operateLog()
      },
      changePageSize(current, size) {
        this.pagenate.currentPage = 1
        this.pagenate.pageSize = size
        this.operateLog()
      },
      handleChange(val) {
        this.selectedType = val
        this.search.type = val
      },
      setColumns() {
        let demoCols = []
        demoCols = [...this.demoColumns2]
        this.scrollWidth = false

        // if (window.innerWidth - 200 > 1000) {
        //   demoCols = [...this.demoColumns2]
        //   // this.scrollWidth = window.innerWidth - 268
        //   this.scrollWidth = false
        // } else {
        //   demoCols = [...this.demoColumns]
        //   if (window.innerWidth - 200 < 1000) {
        //     this.scrollWidth = 1140
        //   } else {
        //     this.scrollWidth = window.innerWidth
        //   }
        // }

        this.columns = demoCols
      },
      resize() {
        this.setColumns()
      }
    },
    mounted: function() {
      this.$nextTick(() => {
        this.options()
        this.setColumns()
        this.operateLog()
        // window.onresize = this.resize;
      })
    }
  }

</script>

<style>

.content {
  width:100%;
  overflow-y: auto;
  max-height:100vh;
  padding-bottom: 20vh;
}
</style>


<style>
  .ant-input {
    padding: 0 11px;
  }
  .ant-btn {
    line-height: 1px;
  }
</style>
