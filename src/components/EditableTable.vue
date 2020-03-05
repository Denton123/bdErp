<template>
  <div>
    <div v-if="loading">
      <a-spin />
    </div>
    <div v-if="!loading">
      <a-table
        :columns="tableInfo.columns"
        :dataSource="tableData"
        rowKey="serial"
        bordered
        style="margin-top:12px;"
        @change="pageChange"
        :pagination="isPage ? pagination :false"
        :style="'width:' + tableInfo.width"
        :rowClassName="() => { return 'row-height'}"
        :rowSelection="tableInfo.rowSelection ? rowSelection : null"
        :scroll="{y: 470, x: 'max-content'}"
      >
        <!-- 必填 -->
        <span :slot="item.name" v-for="(item,id) in tableInfo.required" :key="id">
          <span>{{item.title}}</span>
          <b class="required">*</b>
        </span>
        <a slot="log" slot-scope="text, record" @click="showLog(record.id)">查看</a>
        <!-- <span v-if="isvalidPTime"> -->
        <template slot="outvalidPTime" slot-scope="text, record">
          <span>{{outvalidPTime}}</span>
        </template>
        <!-- </span> -->
        <!-- 状态 -->
        <template slot="status" slot-scope="text, record">
          <span v-html="statusText(text, record)"></span>
        </template>
        <template slot="acptStatus" slot-scope="text, record">
          <span v-html="acptStatusText(text, record)"></span>
        </template>
        <template slot="operate" slot-scope="record">
          <div class="editable-row-operations">
            <span v-for="(item, index) in tableInfo.operates" :key="index">
              <span v-if="record.editable">
                <span>
                  <a @click="evt => saveRow(evt, record.serial, record)">{{item.editSubmitTitle}}</a>
                  <a @click="() => cancelRow(record.serial, record.id)">{{item.editCancelTitle}}</a>
                </span>
              </span>
              <span v-else>
                <span v-if="item.action=='edit' && record.baseStatus !== 2">
                  <a @click="evt => editRow(evt, record.serial)">{{item.title}}</a>
                </span>

                <span v-if="record.status && record.status === 1 || !record.status">
                  <span v-if="item.action == 'delete'">
                    <a-popconfirm
                      title="确认删除?"
                      @confirm="evt => deleteRow(evt, record.serial, record)"
                    >
                      <a>{{item.title}}</a>
                    </a-popconfirm>
                  </span>
                </span>

                <span v-if="item.action == 'deleteRow'">
                  <a-popconfirm title="确认删除?" @confirm="evt => deletCache(evt, record.serial)">
                    <a>{{item.title}}</a>
                  </a-popconfirm>
                </span>

                <span v-if="item.action == 'detail'">
                  <a @click="() => detailRow(record.serial)">{{item.title}}</a>
                </span>

                <span v-if="record.status == 1||record.status == 4">
                  <span v-if="item.action == 'modify'">
                    <a @click="() => modifyRow(record.serial)">{{item.title}}</a>
                  </span>
                </span>

                <span v-if="item.action == 'revoke'">
                  <a-popconfirm title="确定撤回？" @confirm="evt => revokeRow(evt, record.serial)">
                    <a>{{item.title}}</a>
                  </a-popconfirm>
                </span>
                <span v-if="item.action == 'switch'">
                  <span v-if="record.start">禁用</span>
                  <a v-else @click="evt => switchRow(evt, record.serial)">{{item.title}}</a>
                </span>
              </span>
            </span>
          </div>
        </template>

        <template
          v-for="(col, index) in tableInfo.slotCols"
          :slot="col.key"
          slot-scope="text, record"
        >
          <div :key="index" v-if="!record.editable || (record.id && !col.editable)">
            <span v-if="col.renderType == 'html'" v-html="htmlText(col, text)"></span>
            <span v-else-if="col.type=='time'">{{handleTime(col, text)}}</span>
            <span v-else-if="col.renderType == 'status'" v-html="statusText(text)"></span>
            <span v-else-if="col.renderType == 'acptStatus'">{{acptStatusText(text)}}</span>
            <span v-else>{{ displayText(col, text)}}</span>
          </div>

          <div :key="index" v-if="record.editable && (!record.id || col.editable)">
            <div
              v-if="col.editType == 'select' && record.isAdd && col.key == 'instName' || col.editType == 'select' && col.key !== 'instName'"
            >
              <a-select
                :placeholder="col.placeholder"
                v-model="record[col.key]"
                showSearch
                :filterOption="filterOption"
                style="width:100%;"
                @change="() =>editSelectChange(record[col.key], col.isHandleChange, record, col.changeUrl, col.numUrl, col.isGetDetail)"
              >
                <a-select-option
                  :value="opt.key"
                  :key="i"
                  v-for="(opt, i) in col.editOpts"
                >{{opt.value}}</a-select-option>
              </a-select>
            </div>
            <div v-if="col.editType == 'select'&& col.key == 'instName'&& !record.isAdd">
              <span>{{record[col.key]}}</span>
            </div>
            <div v-if="!col.hasOwnProperty('editType') || col.editType == 'input'">
              <a-input v-model="record[col.key]" :placeholder="col.placeholder" />
            </div>
            <div v-if="col.editType == 'inputCount'">
              <a-input
                v-model="record[col.key]"
                :placeholder="col.placeholder"
                oninput="value=value.replace(/[^(\-?)\d+]/ig,'')"
              />
            </div>
            <div v-if="!col.hasOwnProperty('editType') || col.editType == 'inputNum'">
              <a-input
                v-model="record[col.key]"
                oninput="value=value.replace(/[^\d]/g,'')"
                :placeholder="col.placeholder"
                @change="onNumChange(record, record.serial, col.editable)"
              />
            </div>
            <div v-if="!col.hasOwnProperty('editType') || col.editType == 'count'">
              <a-input
                v-model="record[col.key]"
                oninput="value=value.replace(/[^-\d]*/g,'')"
                :placeholder="col.placeholder"
              />
            </div>
            <div v-if="!col.hasOwnProperty('editType') || col.editType == 'inputAfter'">
              <a-input
                v-model="record[col.key]"
                oninput="value= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                :placeholder="col.placeholder"
                @change="onPriceChange(record, record.serial,col.editable)"
              />
            </div>
            <div v-if="!col.hasOwnProperty('editType') || col.editType == 'date'">
              <!-- <span>{{record}}{{record[col.key]}}</span> -->
              <a-date-picker
                v-model="record[col.key]"
                :format="col.format"
                :placeholder="col.placeholder"
                style="width: 100%"
                @change="onDateChange(col,record)"
              />
            </div>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();

const cloneDeep = require("clone-deep");
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    tableInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    rowInc: {
      type: Number,
      default() {
        return 1;
      }
    },
    pagination: {
      type: Object,
      default() {
        return {
          total: 0,
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true
        };
      }
    },
    rowSelectedFlag: {
      type: Number,
      default() {
        return 0;
      }
    },
    loading: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      cacheData: [],
      emptyRow: {},
      selectedRowKeys: [],
      selectRowIDs: [],
      isScroll: false,
      isPage: true,
      singlecount: 1,
      checkcount: 1,
      dataArray: this.tableData,
      tableScroll: {},
      outvalidPTime: ""
    };
  },
  watch: {
    rowInc(newVal, oldVal) {
      const inc = newVal - oldVal;
      if (inc > 0) {
        this.newRow(inc);
      }
    },
    rowSelectedFlag() {
      this.$emit("on-action", {
        action: "rowKeys",
        data: this.selectedRowKeys
      });
    },
    $route: {
      handler: function(route) {
        this.getSelectData();
        // this.count = 0;
        this.singlecount = 1;
        this.checkcount = this.tableData.length;
        this.selectRowIDs = [];
        this.selectedRowKeys = [];
        this.isScroll = route.params.model === "applicationAdd" ? true : false;
        this.isPage =
          route.query.type === "add" || route.query.id ? false : true;
        this.tableScroll = {y:470, x: "max-content" };
      }
    },
    tableData: {
      handler(val, oldVal) {},
      deep: true
    }
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: this.onSelectChange
        // onSelection: this.onSelection,
      };
    }
  },
  methods: {
    moment,
    getCurrentData() {
      return new Date().toLocaleDateString();
    },
    // 数量变动
    onNumChange(v, serial) {
      let data = this.tableData;
      this.$emit("on-action", {
        action: "numChange",
        data: { v, serial, data }
      });
    },
    // 价格变动
    onPriceChange(v, serial) {
      let data = this.tableData;
      this.$emit("on-action", {
        action: "priceChange",
        data: { v, serial, data }
      });
    },
    // 处理文本数据
    htmlText(text) {
      switch (text) {
        case 1:
          return `<span style="color:blue">正常</span>`;
          break;
        case 2:
          return `<span style="color:red">待维修</span>`;
          break;
        case 3:
          return `<span style="color:purple">报废</span>`;
          break;
        case 4:
          return `<span style="color:grey">停用</span>`;
          break;
      }
    },
    // 显示下拉数据
    displayText(col, text) {
      if (col.editType == "select") {
        const target = col.editOpts.filter(opt => opt.value == text)[0];
        if (target) {
          return target.value;
        }
      }
      return text;
    },
    // 选择表格复选框
    onSelectChange(selectRowKeys, selectRows) {
      let ids = [];
      selectRows.map(row => {
        if (row.id) {
          ids.push(row.id);
        }
      });
      this.selectRowIDs = ids;
      this.selectedRowKeys = selectRowKeys;
    },
    doRefresh() {
      // this.$emit("on-action", { action: "pageChange" });
    },
    // 页数切换
    pageChange(page) {
      this.$emit("on-action", { action: "pageChange", data: page });
      // this.doRefresh();
    },
    // 编辑行
    editRow(evt, sno) {
      const newData = [...this.tableData];
      const target = newData.filter(item => sno === item.serial)[0];
      for (let i in target) {
        if (i.indexOf("Time") !== -1 && target[i] !== null) {
          target[i] = moment(target[i]);
        }
        this.tableInfo.slotCols.forEach(v => {
          if (this.$route.params.sublead == "instrument" && v.key == "status") {
            switch (target[v.key]) {
              case 0:
                target[v.key] = "";
                break;
              case 1:
                target[v.key] = "正常";
                break;
              case 2:
                target[v.key] = "待维修";
                break;
              case 3:
                target[v.key] = "报废";
                break;
              case 4:
                target[v.key] = "停用";
                break;
            }
          } else if (
            this.$route.params.sublead == "usable" &&
            v.key == "status"
          ) {
            switch (target[v.key]) {
              case 0:
                target[v.key] = "";
                break;
              case 1:
                target[v.key] = "启用";
                break;
              case 2:
                target[v.key] = "禁用";
                break;
            }
          }
        });
      }
      if (target) {
        target.editable = true;
        this.$emit("on-action", { action: "editRow", data: newData });
      }
      this.getSelectData(sno);
    },
    // 启用禁用
    switchRow(evt, sno) {
      const newData = [...this.tableData];
      const target = newData.filter(item => sno === item.serial)[0];
      if (target) {
        target.start = true;
        this.tableData = newData;
        this.$emit("on-action", { action: "switch", data: target.id });
      }
    },
    // 取消
    cancelRow(sno, cancelId) {
      this.backCache(sno, cancelId);
    },
    // 查看行详情
    detailRow(sno) {
      const newData = [...this.tableData];
      const target = newData.filter(item => sno == item.serial)[0];
      let id;
      for (let i in target) {
        if (i.indexOf("Id") !== -1) {
          id = i;
        }
      }
      if (target) {
        this.$emit("on-action", {
          action: "detail",
          data: target[id],
          evt: null
        });
      }
    },
    // 修改行
    modifyRow(sno) {
      const newData = [...this.tableData];
      const target = newData.filter(item => sno == item.serial)[0];
      let id;
      for (let i in target) {
        if (i.indexOf("Id") !== -1) {
          id = i;
        }
      }
      if (target) {
        this.$emit("on-action", {
          action: "modify",
          data: target[id],
          evt: null
        });
      }
    },
    // 撤回
    revokeRow(evt, sno) {
      const newData = [...this.tableData];
      const target = newData.filter(item => sno == item.serial)[0];
      if (target) {
        if (target.purOrdId) {
          let promise = Promise.resolve();
          evt.waitUntil = p => (promise = p);
          this.$emit("on-action", {
            action: "revoke",
            data: target.purOrdId,
            evt: evt
          });
        } else {
          this.$message.error("该记录尚未提交、无需撤销");
        }
      } else {
        this.$message.error("撤回失败");
      }
    },
    // 删除行
    deleteRow(evt, sno, record) {
      const newData = [...this.tableData];
      const target = newData.filter(item => sno == item.serial)[0];
      const index = newData.findIndex(item => sno === item.serial);
      if (target) {
        let id;
        for (let i in target) {
          if (i.indexOf("Id") !== -1) {
            id = i;
          }
        }
        delete target.editable;
        if (target[id]) {
          let promise = Promise.resolve();
          evt.waitUntil = p => (promise = p);
          this.$emit("on-action", {
            action: "delete",
            sno: target[id],
            evt: evt,
            data: record
          });
        } else {
        }
      } else {
        this.$message.error("数据异常、删除失败");
      }
    },
    deletCache(evt, sno) {
      this.$emit("on-action", { action: "deleteCache", data: sno });
    },
    // 保存行
    saveRow(evt, sno, row) {
      this.$emit("on-action", { action: "save", sno: sno });
    },
    backCache(sno, id) {
      this.$emit("on-action", { action: "cancelId", data: { sno } });
    },
    setCache(newData) {
      this.cacheData = newData.map(item => ({ ...item }));
    },
    // 新建行
    newRow(inc) {
      const route = this.$route;
      this.singlecount = this.singlecount + 1;
      this.checkcount = this.checkcount + 1;
      if (route.params.model.indexOf("BatchAdd") !== -1) {
        if (this.tableData.length !== 0 && this.tableData[0].editable) {
          this.$message.error("请填写完之后再添加");
          return;
        } else {
          for (let i = 0; i < inc; i++) {
            let er = cloneDeep(this.emptyRow);
            this.tableInfo.columns.forEach(v => {
              if (v.dataIndex) {
                if (v.dataIndex.indexOf("Time") !== -1) {
                  er[v.dataIndex] = moment(new Date().toLocaleDateString());
                } else {
                  er[v.dataIndex] = "";
                }
              }
            });
            er.serial = this.tableData.length + 1;
            this.tableData.push(er);
          }
        }
      } else if (route.params.model.indexOf("BatchAdd") === -1) {
        if (this.$route.params.model === "instrumentlist") {
          if (this.tableData.length !== 0 && this.tableData[0].editable) {
            this.$message.error("请填写完之后再添加");
            return;
          } else {
            for (let i = 0; i < inc; i++) {
              let er = cloneDeep(this.emptyRow);
              this.tableInfo.columns.forEach(v => {
                if (v.dataIndex) {
                  if (v.dataIndex.indexOf("Time") !== -1) {
                    // er[v.dataIndex] = moment(new Date().toLocaleDateString());
                  } else {
                    er[v.dataIndex] = "";
                  }
                }
              });
              er.isAdd = true;
              er.serial = 0;
              this.tableData.unshift(er);
            }
          }
        } else {
          let canAdd = true;
          this.tableData.length !== 0 &&
            this.tableData.forEach(v => {
              if (v.editable) {
                canAdd = false;
                return;
              } else {
                canAdd = true;
              }
            });
          if (!canAdd) {
            this.$message.error("请填写完之后再添加");
          }
          if (canAdd) {
            for (let i = 0; i < inc; i++) {
              let er = cloneDeep(this.emptyRow);
              this.tableInfo.columns.forEach(v => {
                if (v.dataIndex) {
                  if (v.dataIndex.indexOf("Time") !== -1) {
                    // er[v.dataIndex] = moment(new Date().toLocaleDateString());
                  } else {
                    er[v.dataIndex] = "";
                  }
                }
              });
              // console.log(er, this.tableData[this.tableData.length - 1]);
              er.serial = this.tableData[this.tableData.length - 1].serial + 1;
              this.tableData.push(er);
            }
          }
        }
      }
      this.getSelectData(this.tableData.length);
    },
    // 初始空行
    initEmptyRow() {
      const columns = [...this.tableInfo.columns];
      let emptyRow = { editable: true };
      columns.map(col => {
        if (col.dataIndex) {
          emptyRow[col.dataIndex] = "";
        }
      });
      this.emptyRow = emptyRow;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    // 查看日志
    showLog(id) {
      this.$emit("on-action", { action: "log", data: id });
    },
    handleTime(col, text) {
      if (text == undefined) {
        text = null;
      }
      if (text !== null) {
        let reset = moment(text).format("YYYY-MM-DD");
        return reset;
      }
    },
    // 获取下拉数据
    getSelectData(sno) {
      const target = this.tableData.filter(item => item.serial !== sno);
      let targetArr = [];
      let flag =
        this.$route.params.model.indexOf("inAdd") === -1 &&
        this.$route.params.model.indexOf("outAdd") === -1
          ? true
          : false;
      if (this.tableInfo.slotCols) {
        this.tableInfo.slotCols.forEach(v => {
          if (v.editType === "select" && v.isDefault) {
            BaseServiceApi.getApi(`/${v.defaultUrl}`).then(res => {
              if (res.ret == 0) {
                let data = res.data.list ? res.data.list : res.data;
                v.editOpts = [];
                // 屏蔽掉了物料名称去重
                if (target.length && flag) {
                  target.forEach(targetItem => {
                    if (targetItem.matId) {
                      targetArr.push(targetItem.matId);
                    }
                  });
                  data.forEach(dataItem => {
                    if (!targetArr.includes(dataItem.key)) {
                      v.editOpts.push({
                        key: dataItem["key"],
                        value: dataItem["value"]
                      });
                    }
                  });
                } else {
                  data.forEach(item => {
                    v.editOpts.push({ key: item["key"], value: item["value"] });
                  });
                }
              }
            });
          }
        });
      }
    },
    // 下拉触发获取数据
    editSelectChange(key, isChange, record, selectUrl, numUrl, isGetDetail) {
      this.getSelectData(record.serial);
      const target = this.tableData.filter(
        item => record.serial === item.serial
      )[0];
      let resData;
      if (isChange) {
        BaseServiceApi.getApi(`/${selectUrl}/${key}`).then(res => {
          if (res.ret === 0) {
            let matId;
            this.tableData.forEach(v => {
              if (v.serial === record.serial) {
                for (let i in res.data) {
                  if (i === "status" || i === "adjStatus") {
                    switch (res.data[i]) {
                      case 1:
                        v[i] = "正常";
                        break;
                      case 2:
                        v[i] = "待维修";
                        break;
                      case 3:
                        v[i] = "报废";
                        break;
                      case 4:
                        v[i] = "停用";
                        break;
                    }
                  } else {
                    v[i] = res.data[i];
                    if (this.$route.params.model === "inAdd") {
                      v["total"] = "";
                    }
                  }
                  matId = res.data.matId;
                  resData = res.data;
                  // console.log(resData)
                }
              }
            });
            // 下拉获取物料批号
            if (!resData.matBatNo && numUrl) {
              let matArr = [];
              BaseServiceApi.getApi(`/${numUrl}/${matId}`).then(res => {
                if (res.ret === 0) {
                  // console.log(res, this.tableData);
                  // this.tableData.forEach(v => {
                  //   if (v.matId == target.matId) {

                  //   }
                  // })
                  this.tableInfo.slotCols.forEach(v => {
                    if (v.key === "matBatNo") {
                      v.editOpts = [];
                      res.data.forEach(item => {
                        v.editOpts.push({
                          key: item["value"],
                          value: item["value"]
                        });
                      });
                      if (this.tableData.length > 1) {
                        this.tableData.forEach(j => {
                          if (j.matId == target.matId && !j.editable) {
                            v.editOpts.forEach((opt, index) => {
                              if (opt.key == j.matBatNo) {
                                v.editOpts.splice(index, 1);
                              }
                            });
                            // console.log(v.editOpts, "editOpts");
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
          }
        });
      } else if (isGetDetail) {
        BaseServiceApi.getApi(
          `/${selectUrl}/${record.matId}/${record.matBatNo}`
        ).then(res => {
          if (res.ret == 0) {
            record.totalSum = res.data.total;
            record.stoLoc = res.data.stoLoc;
            this.outvalidPTime = res.data.validPTime.split(" ")[0];
            // console.log(this.outvalidPTime)
          }
        });
      }
    },
    acptStatusText(text) {
      switch (text) {
        case 1:
          return "合格";
          break;
        case 2:
          return "不合格";
          break;
      }
    },
    // 状态文字转化
    statusText(text) {
      if (this.$route.params.sublead === "instrument") {
        switch (text) {
          case 1:
            return `<span style="color:#87d068">正常</span>`;
            break;
          case 2:
            return `<span style="color:#f50">待维修</span>`;
            break;
          case 3:
            return `<span style="color:purple">报废</span>`;
            break;
          case 4:
            return `<span style="color:grey">停用</span>`;
            break;
        }
      } else if (this.$route.params.sublead === "usable") {
        switch (text) {
          case 1:
            return `<span style="color:#87d068">启用</span>`;
            break;
          case 2:
            return `<span style="color:#f50">禁用</span>`;
            break;
        }
      } else {
        switch (text) {
          case 1:
            return "待提交";
            break;
          case 2:
            return "待审核";
            break;
          case 3:
            return "审核通过";
            break;
          case 4:
            return "审核不通过";
            break;
        }
      }
    },
    getId(target) {
      let id;
      for (let i in target) {
        if (i.indexOf("Id") !== -1) {
          id = i;
        }
      }
    },
    onDateChange(col, row) {
      // recCalTime,calCycle,nextCalTime
      if (col.isChange) {
        let rec = moment(row.recCalTime).format("YYYY-MM-DD");
        rec = rec.split("-");
        let nDate = new Date(rec[1] + "-" + rec[2] + "-" + rec[0]);
        let millSeconds = Math.abs(nDate) + row.calCycle * 24 * 60 * 60 * 1000;
        let rData = new Date(millSeconds);
        let year = rData.getFullYear();
        let month = rData.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var date = rData.getDate();
        if (date < 10) date = "0" + date;
        row.nextCalTime = moment(year + "-" + month + "-" + date);
      }
    }
  },
  created: function() {
    this.cacheData = this.tableData.map(item => ({ ...item }));
    this.initEmptyRow();
  },
  mounted() {
    this.tableScroll = {y:470, x: "max-content" };
  }
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>

<style lang="scss">
.ant-select-dropdown {
  width: auto !important;
}
.ant-calendar-picker {
  width: 100%;
}
.ant-table td {
  word-break: break-all;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 10px 10px;
}
.ant-table-bordered.ant-table-fixed-header .ant-table-placeholder {
  border: 1px solid #e8e8e8;
  width: calc(100% - 16px);
  border-top: none;
}
.required {
  color: red;
}
.has-error .ant-form-explain{
  text-align: left;
}
</style>

