<!--
 * @Description: 打印
 * @Author: sdt
 * @Date: 2019-08-12 10:26:09
 * @LastEditTime: 2020-01-16 17:02:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="print">
    <div class="printLogo">
      <img :src="logoSrc" alt />
    </div>
    <h1>{{models.title}}</h1>
    <div>
      <a-row class="headRow">
        <a-col :span="12" v-for="(key, value) in models.headDesc" :key="key">
          <span>{{key}}：</span>
          <span>{{headData[value] ? headData[value] : ''}}</span>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-table :columns="columns" :dataSource="data" bordered rowKey="serial" :pagination="false">
        <template slot="acptStatus" slot-scope="text, record">
          <a-radio-group :defaultValue="text">
            <a-radio :value="1">合格</a-radio>
            <a-radio :value="2">不合格</a-radio>
          </a-radio-group>
        </template>
        <template slot="title">
          <a-row class="tableTitle">
            <template v-for="(key, value) in models.tableDesc">
              <a-col :span="5" v-if="key=='到货日期'" :key="key" class="tableTitle_row">
                <span class="tableTitleLeft" style="width:50%">{{key}}</span>
                <span
                  class="tableTitleRight"
                  style="width:50%"
                >{{headData[value] ? headData[value] : ''}}</span>
              </a-col>
              <a-col :span="11" :key="key" v-else-if="key=='供应商'" class="tableTitle_row">
                <span class="tableTitleLeft" style="width:20%">{{key}}</span>
                <span
                  class="tableTitleRight"
                  style="width:80%"
                >{{headData[value] ? headData[value] : ''}}</span>
              </a-col>
              <a-col :span="8" :key="key" v-else class="tableTitle_row">
                <span class="tableTitleLeft" style="width:30%">{{key}}</span>
                <span
                  class="tableTitleRight"
                  style="width:70%"
                >{{headData[value] ? headData[value] : ''}}</span>
              </a-col>
            </template>
          </a-row>
        </template>
        <template slot="footer">
          <template v-if="models.key == 'application'">
            <a-row style="height: 200px;">
              <a-col :span="2" class="tableFootKey" style="border-right: 1px solid #e8e8e8">审批部门审批</a-col>
              <a-col
                :span="10"
                style="border-right: 1px solid #e8e8e8;height:200px;"
                class="tableFootValue"
              >
                <span>签字：</span>
                <span style="padding: 0 30px 0 150px;display:inline-block;">年</span>
                <span style="padding: 0 30px 0 0;display:inline-block;">月</span>
                <span>日</span>
              </a-col>
              <a-col :span="2" class="tableFootKey" style="border-right: 1px solid #e8e8e8">采购部审批</a-col>
              <a-col :span="10" class="tableFootValue"  style="border-right: 1px solid #e8e8e8;height:200px;">
                <span>签字：</span>
                <span style="padding: 0 30px 0 150px;display:inline-block;">年</span>
                <span style="padding: 0 30px 0 0;display:inline-block;">月</span>
                <span>日</span>
              </a-col>
            </a-row>
            <!-- <a-row class="tableFoot">
              <a-col :span="8"></a-col>
              <a-col :span="8" class="tableFootCenter">签字：</a-col>
              <a-col :span="8" class="tableFootRight">
                <span>年</span>
                <span>月</span>
                <span>日</span>
              </a-col>
            </a-row>-->
          </template>
          <template v-else-if="models.key == 'in'">
            <div style="text-align:left;border-bottom:1px solid #e8e8e8;">
              <p>验收确认内容如下，如验收不合格，可将不合格情况填写在对应行备注中：</p>
              <p>1.包装外观是否完好，包装字迹清晰。</p>
              <p>2.运输条件是否满足要求。</p>
              <p>3.肉眼观察颜色正常、无杂质，有批号、浓度、生产日期、保存条件、保质期、试剂质检报告。</p>
              <p>4.检查送货单单据数量、实收货物数量与采购订单数量是否一致。</p>
              <p>5.是否具有出厂检验合格证明。</p>
              <p>6.有效期满足使用要求。</p>
            </div>
            <a-row class="inRow">
              <a-col :span="12" v-for="(key, value) in models.inFoot" :key="key">
                <span>{{key}}：</span>
                <!-- <span>{{headData[value]}}</span> -->
              </a-col>
            </a-row>
          </template>
          <template v-else-if="models.key == 'out'">
            <a-row class="outRow">
              <a-col :span="8" v-for="(key, value) in models.outFoot" :key="key">
                <span>{{key}}：</span>
                <!-- <span>{{headData[value]}}</span> -->
              </a-col>
            </a-row>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import printMsg from "@/views/basicModel/basicMsg/printMsg";
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();

export default {
  name: "print",
  data() {
    return {
      models: {},
      columns: [],
      data: [],
      headData: [],
      logoSrc: require("../assets/printLogo.png")
    };
  },
  props: {},
  methods: {
    // 处理表格头部
    handleColumns() {
      const { thead, props, width } = this.models;
      this.columns = [];
      thead &&
        thead.forEach(v => {
          this.columns.push({
            title: v
          });
        });
      for (let i in props) {
        this.columns[i].dataIndex = props[i];
        this.columns[i].scopedSlots = { customRender: `${props[i]}` };
      }
       if (width) {
        for (let i in width) {
          this.columns[i].width = width[i];
        }
      }
      // console.log(width,this.columns)
    }
  },
  computed: {
    type() {
      return this.$route.params.model;
    }
  },
  created: function() {
    this.models = printMsg[this.type];
    this.handleColumns();
    const localData = JSON.parse(localStorage.getItem("data"));
    this.data = localData.list;
    this.data = this.data.map((item, index) => {
      item.serial = index + 1;
      return item;
    });
    this.headData = localData;
    this.data.forEach(v => {
      v['instru'] = this.headData.instru
      v['demTime'] = this.headData.demTime
    })
    this.headData["applicationNum"] = "BD-QP-03-01";
    this.headData["createdDate"] = "2019年7月10日";
    this.headData["inNum"] = "BD-QP-17-04";
    this.headData["outNum"] = "BD-QP-17-05";
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化DOM触发打印事件
      setTimeout(() => {
        window.print();
      }, 1000);
    });
  }
};
</script>


<style lang="scss">
.print {
  width: 70%;
  margin: 0 auto;
  h1 {
    margin-bottom: 30px;
  }
  .ant-col-12 {
    text-align: left;
  }
  .ant-table.ant-table-bordered .ant-table-title {
    padding-left: 0 !important;
    padding-right: 0 !important;
    padding: 0 !important;
  }
  .tableTitleLeft {
    display: inline-block;
    // width: 50%;
    border-right: 1px solid #e8e8e8;
    text-align: left;
    padding-left: 15px;
  }
  .tableTitleRight {
    display: inline-block;
    // width: 50%;
    border-right: 1px solid #e8e8e8;
  }
  .tableTitle .tableTitle_row {
    display: flex;
    height: 40px;
    line-height: 40px;
  }
  .tableTitle .tableTitle_row {
    &:last-child {
      .tableTitleRight {
        border-right: none;
      }
    }
  }
  .ant-table-footer {
    // height: 140px;
    padding: 0;
  }
  .tableFootLeft {
    text-align: left;
  }
  .ant-col-24 {
    height: 80px;
  }
  .tableFootRight span {
    padding-right: 30px;
  }
  .inRow {
    // margin-top: 20px;
    .ant-col-12 {
      margin-top: 10px;
    }
  }
  .outRow {
    // margin-top: 20px;
    .ant-col-8 {
      text-align: left;
      margin-top: 10px;
    }
  }
  .ant-table-thead > tr > th {
    font-weight: bold;
    background: transparent;
    text-align: center;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
  }
  .ant-table-footer {
    background: transparent;
  }
  .headRow {
    margin-bottom: 10px;
  }
  .printLogo {
    width: 222px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    margin-bottom: 0;
  }
  .tableFootKey {
    height: 200px;
    border-right: 1px solid #e8e8e8;
    padding: 68px 10px;
  }
  .tableFootValue {
    // text-align: right;
    line-height: 371px;
  }
}
</style>