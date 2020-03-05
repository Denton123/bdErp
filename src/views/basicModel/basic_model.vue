<!--
 * @Description: 一级页面中间内容基础模块组件
 * @Author: sdt
 * @Date: 2019-07-10 10:48:44
 * @LastEditTime: 2020-01-09 15:00:27
 * @LastEditors: Please set LastEditors
 -->

 <template>
  <div class="basic-model">
    <!-- tabs标签 -->
    <a-tabs
      v-model="activeKey"
      type="editable-card"
      @edit="onEdit"
      hideAdd
      @tabClick="tabClick"
      class="basic-tab"
    >
      <a-tab-pane
        v-for="pane in panes"
        :tab="pane.title"
        :key="pane.key"
        :closable="pane.closable"
      />
    </a-tabs>
    <router-view />
    <!-- 搜索&操作 -->
    <div class="basic-operate" v-if="models.key" :class="isFLoat ? 'displayR' : 'displayF' ">
      <search-form
        :searchComponent="searchComponent"
        v-if="isNotAdd"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      />
      <div class="operate-btn" v-if="isAddOperate">
        <component
          v-for="(addOperate, index) in addComponent"
          :key="index"
          :is="addOperate.component"
          :params="addOperate.params"
          @handleTrigger="handleBtnOperate"
        />
      </div>
      <div class="operate-btn" v-else>
        <component
          v-for="(typeOperate,index) in typeComponent"
          :key="index"
          :is="typeOperate.component"
          :params="typeOperate.params"
          @handleTrigger="handleBtnOperate"
          @handleExportCsv="handleExportCsv"
        />
      </div>
    </div>
    <detail-form
      :submitComponent="submitComponent"
      v-if="submitComponent && models.key"
      :detailFields="detailFields"
      @handleTrigger="handleBtnOperate"
      ref="detailForm"
      :amount="amount"
      :isToSub="isToSub"
    />
    <!-- 数据列表 -->
    <div class="basic-table" v-if="models.key" :class="isBatch ? 'mt55' : 'null' ">
      <EditableTableComponent
        :tableInfo="tableInfo"
        :tableData="tableData"
        @on-action="doAction"
        :rowInc="rowInc"
        :pagination="pagination"
        :rowSelectedFlag="rowSelectedFlag"
        :loading="loading"
      />
    </div>
    <new-form
      v-if="models.key"
      :formVisible="newformVisible"
      @newFormCancel="newFormCancel"
      :newComponent="newComponent"
    />
    <export-form
      v-if="models.key"
      :formVisible="exportformVisible"
      @exportFormCancel="exportFormCancel"
      :exportComponent="exportComponent"
      @handleExport="handleExport"
    />
    <import-form
      :formVisible="importformVisible"
      @importFormCancel="importFormCancel"
      v-if="models.key"
      @handleImport="handleImport"
      :uploadAction="uploadAction"
      @download="download"
    />
  </div>
</template>

<script>
import SearchForm from "@/components/public/searchForm";
import computed from "./basicMsg/computed";
import msg from "./basicMsg/message";
import EditableTableComponent from "@/components/EditableTable.vue";
import DetailForm from "@/components/public/detailForm";
import newForm from "@/components/public/basicpublic/newForm";
import exportForm from "@/components/public/basicpublic/exportForm";
import importForm from "@/components/public/basicpublic/importForm";
import moment from "moment";

import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();
import auth from "@/auth";
const cloneDeep = require("clone-deep");
export default {
  name: "BasicModel",
  data() {
    const panes = [
      {
        title: msg["dangerLine"].tab,
        key: msg["dangerLine"].key,
        closable: false,
        data: "purchase",
        isDetail: false
      }
    ];
    return {
      // 表格列
      columns: [],
      // tab数据
      panes,
      // tab展开key
      activeKey: panes[0].key,
      // 列表数据
      tableData: [
        {
          // id: 6,
          serial: 1,
          matNo: "99AAA",
          goodsNo: "4",
          matName: "2",
          // key: 7,
          nextCalTime: moment("2018-05-22"),
          factory: 4
        }
      ],
      rowSelectedFlag: 0,
      pagination: {},
      rowInc: 2,
      pageSize: 20,
      // 列表信息
      tableInfo: {
        rowSelection: false,
        operates: [],
        columns: [],
        slotCols: []
      },
      isNotAdd: true,
      isAddOperate: false,
      rowKeys: [],
      // 是否显示新增表单
      newformVisible: false,
      // 详情头部表单的返回数据
      detailFields: {
        // amount: 0,
        // invOutOrdNo: '122'
        // reqTime: moment("2018-05-22"),
        // status: 1
      },
      // 是否是浮动样式
      isFLoat: false,
      rowedit: [],
      // 需要计算的数组
      accountObj: [],
      // 取消编辑的id
      cancelId: "",
      exportformVisible: false,
      importformVisible: false,
      // 表格表单
      tableForm: [],
      // 总计金额
      amount: 0,
      // 上传路径
      uploadAction: "",
      // 批量添加样式
      isBatch: false,
      // 修改页面是否显示审核组件
      isToSub: false,
      emptyRow: {},
      loading: true,
      searchParams: {},
      currentPage: 1,
      pageParams: {}
    };
  },
  props: {
    models: {
      type: Object,
      default() {
        return {
          // 表格头
          theads: [],
          // 表格字段
          props: [],
          // 表格列宽度
          width: [],
          fixed: [],
          // 搜索
          searchComponent: [],
          key: "",
          // 操作按钮
          typeComponent: [],
          tableOperation: [],
          submitComponent: [],
          addComponent: [],
          newComponent: [],
          exportComponent: [],
          required: []
        };
      }
    }
  },
  components: {
    SearchForm,
    EditableTableComponent,
    DetailForm,
    newForm,
    exportForm,
    importForm
  },
  mixins: [computed],
  methods: {
    handleBtnOperate(props) {
      switch (props.action) {
        case "batchAdd":
          this.batchAdd(props.params);
          break;
        case "createPurchaseForm":
          this.createPurForm();
          break;
        case "addData":
          this.addData(props.params);
          break;
        case "print":
          this.handlePrint();
          break;
        case "addmateriel":
          this.addmateriel();
          break;
        case "submitBtn":
          this.handleSubmit();
          break;
        case "adjustInventory":
          this.adjustInventory();
          break;
        case "newModal":
          this.showNewModal();
          break;
        case "exportCSV":
          this.showExportModal();
          break;
        case "importCSV":
          this.showImportModal();
          break;
        case "saveBtn":
          this.handleSave();
          break;
        case "batchsubBtn":
          this.batchSubmit();
      }
    },
    // 表格头数据处理
    handleTableData() {
      this.tableInfo.columns = [];
      this.theads &&
        this.theads.forEach(v => {
          this.tableInfo.columns.push({
            title: v
          });
        });

      for (let i in this.props) {
        if (this.props[i] !== "operate") {
          this.tableInfo.columns[i].dataIndex = this.props[i];
        } else {
          // this.tableInfo.columns[i].fixed = "right";
          // this.tableInfo.columns[i].width = 150;
        }
        this.tableInfo.columns[i].scopedSlots = {
          customRender: `${this.props[i]}`
        };
      }
      if (this.fixed) {
        for (let i in this.fixed) {
          if (this.fixed[i] !== null) {
            this.tableInfo.columns[i].fixed = this.fixed[i];
          }
        }
      }

      if (this.width) {
        for (let i in this.width) {
          this.tableInfo.columns[i].width = this.width[i];
        }
      }
      if (this.required) {
          this.tableInfo.columns.forEach(v => {
            this.required.forEach(i => {
              if (i.name.split("Title").indexOf(v.dataIndex) !== -1) {
                v.slots = {};
                v.slots = { title: i.name };
                delete v.title;
              }
            });
          });
          this.tableInfo.required = this.required;
        }
      // console.log(this.tableInfo.columns)
      const { rowSelection, operates, slotCols } = this.tableOperation;
      this.tableInfo.operates = operates;
      this.tableInfo.slotCols = slotCols;
      this.tableInfo.rowSelection = rowSelection;
    },
    // tab编辑
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    // 添加tab
    add(pane) {
      const panes = this.panes;
      const activeKey = pane.key;
      panes.push({
        title: pane.title,
        key: activeKey,
        data: pane.prevKey,
        isDetail: pane.isDetail,
        isType: pane.isType
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    // 移除tab
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key;
      }
      this.panes = panes;
      let prevKey = "";
      let isDetail;
      let isType;
      this.activeKey = activeKey;
      this.panes.forEach(v => {
        if (v.key === this.activeKey) {
          prevKey = v.data;
          isDetail = v.isDetail;
          isType = v.isType;
        }
      });
      const detailtab = this.activeKey.split("-")[0];
      const detailId = this.activeKey.split("-")[1];
      const addType = this.activeKey.split("-")[0];
      if (isDetail) {
        this.goto(`/erp/${prevKey}/${detailtab}?id=${detailId}`);
      } else if (prevKey == null) {
        this.goto(`/erp/${this.activeKey}`);
      } else if (isType) {
        this.goto(`/erp/${prevKey}/${addType}?type=${isType}`);
      } else {
        this.goto(`/erp/${prevKey}/${this.activeKey}`);
      }
    },
    // 点击tab回调
    tabClick(tab) {
      let prevKey = "";
      let isDetail;
      let isType;
      this.panes.forEach(v => {
        if (v.key === tab) {
          prevKey = v.data;
          isDetail = v.isDetail;
          isType = v.isType;
        }
      });
      const detailtab = tab.split("-")[0];
      const detailId = tab.split("-")[1];
      const addTab = tab.split("-")[0];
      if (isDetail) {
        this.goto(`/erp/${prevKey}/${detailtab}?id=${detailId}`);
      } else if (prevKey == null) {
        this.goto(`/erp/${tab}`);
      } else if (isType) {
        this.goto(`/erp/${prevKey}/${addTab}?type=${isType}`);
      } else {
        this.goto(`/erp/${prevKey}/${tab}`);
      }
    },
    // 表格操作
    doAction(data) {
      switch (data.action) {
        case "save": //编辑保存 和 新增保存
          // this.saveRow(data.data);
          this.saveRow(data.sno);
          break;
        case "delete": //删除
          data.evt.waitUntil(this.deleteRow(data.sno, data.data));
          break;
        case "revoke": //撤回
          data.evt.waitUntil(this.revokeRow(data.data));
          break;
        case "editSelectChange":
          this.editSelectChange(data.data);
          break;
        case "detail": //查看详情
          this.detailRow(data.data);
          break;
        case "refresh": //筛选列表
          this.doSubmit();
          break;
        case "rowKeys": //获取表格选择行ID列表
          this.selectedRowKeys(data.data);
          break;
        case "log":
          this.showLog(data.data);
          break;
        case "switch":
          this.switchRow(data.data);
          break;
        case "numChange":
          this.onNumChange(data.data.v, data.data.serial, data.data.data);
          break;
        case "priceChange":
          this.onPriceChange(data.data.v, data.data.serial, data.data.data);
          break;
        case "cancelId":
          this.getCancelId(data.data.sno);
          break;
        case "modify": //修改
          this.modifyRow(data.data);
          break;
        case "pageChange":
          this.pageChange(data.data);
          break;
        case "editRow":
          this.editRow(data.data);
          break;
        case "deleteCache":
          this.deleteCache(data.data);
          break;
      }
    },
    // 删除缓存行
    deleteCache(sno) {
      const newData = [...this.tableData];
      this.tableData = newData.filter(item => item.serial !== sno);
      this.tableForm = this.tableForm.filter(item => item.serial !== sno);
    },
    // 编辑行
    editRow(data) {
      this.tableData = data;
      // this.accountObj = cloneDeep(this.tableData)
    },
    // 跳转路由
    goto(path) {
      this.$router.push({ path: path });
    },
    // 保存表格行
    async saveRow(sno) {
      const newData = [...this.tableData];
      const target = newData.filter(item => sno === item.serial)[0];
      // console.log(newData, "newdata");
      let formObj = {};
      if (target) {
        let flag = false;
        let tip = "";
        if (this.$route.params.model.indexOf("inAdd") !== -1) {
          console.log("入库新增", target, newData);
          if (newData.length > 1) {
            newData.forEach(v => {
              if (v.matBatNo == target.matBatNo && !v.editable && v.matId == target.matId) {
                flag = true;
                tip = "物料批号不能重复";
              }
            });
          }
        }
        for (const prop in target) {
          if (!target.hasOwnProperty(prop)) {
            continue;
          }
          this.tableInfo.slotCols.filter(item => {
            if (item.key == prop && item.required && target[prop] === "") {
              flag = true;
              tip = "请将信息填写完整";
              return;
            } else if (
              Number(target.totalSum) !== 0 &&
              Number(target.outTotal) > Number(target.totalSum)
            ) {
              // console.log(target.totalSum,Number(target.totalSum),typeof Number(target.totalSum), '总数量')
              flag = true;
              tip = "出库数量不能大于库存数量";
              return;
            }
            // else if (
            //   item.key !== prop &&
            //   target[item.key] == undefined &&
            //   item.key !== undefined
            // ) {

            //   console.log('jjj',item.key, prop, target[item.key])
            //   flag = true;
            //   tip = "请将信息填写完整";
            //   return;
            // }
            // else if (target["count"] == undefined) {
            //   flag = true;
            //   return;
            // }
            if (item.key == prop) {
              if (item.key == "count") {
                formObj["total"] = target[prop];
              } else if (item.key == "adjStatus") {
                formObj["status"] = target[prop];
              } else if (item.key == "adjLoc") {
                formObj["instLoc"] = target[prop];
              } else if (item.key == "safeTotal") {
                formObj["total"] = target[prop];
              } else if (item.key == "outTotal") {
                // console.log(item.key, target);
                formObj["total"] = target["outTotal"];
              } else if (
                item.key == "matName" &&
                this.$route.params.model.indexOf("BatchAdd") === -1
              ) {
                formObj["matId"] = target["matId"];
              } else {
                formObj[item.key] = target[prop];
              }
            }
          });
          // console.log(formObj);
          if (flag) {
            this.$message.error(tip);
            break;
          }
        }
        if (flag) {
          return;
        }
        for (let i in formObj) {
          if (i.indexOf("Time") !== -1) {
            formObj[i] = moment(formObj[i]).format("YYYY-MM-DD");
          } else if (i === "status") {
            switch (formObj[i]) {
              case "正常":
                formObj[i] = 1;
                break;
              case "待维修":
                formObj[i] = 2;
                break;
              case "报废":
                formObj[i] = 3;
                break;
              case "停用":
                formObj[i] = 4;
                break;
              case "禁用":
                formObj[i] = 2;
                break;
              case "启用":
                formObj[i] = 1;
                break;
            }
          }
        }
        delete target.editable;
        // 修改
        if (this.$route.params.model.indexOf("Modify") !== -1) {
          if (target.purMatId) {
            BaseServiceApi.postApi(
              `/materiel/updateMat/${this.$route.query.id}/${target.purMatId}`,
              formObj
            ).then(res => {
              if (res.ret === 0) {
                // this.setCache(newData);
                this.tableData = newData;
                this.$message.success("编辑成功");
                this.getData();
                // this.remove(this.activeKey);
              }
            });
          } else {
            BaseServiceApi.postApi(
              `/materiel/addMat/${this.$route.query.id}`,
              formObj
            ).then(res => {
              if (res.ret === 0) {
                // this.setCache(newData);
                this.tableData = newData;
                this.$message.success("新增成功");
                this.getData();
                // this.remove(this.activeKey);
              }
            });
          }
        } else if (this.$route.params.model.indexOf("BatchAdd") !== -1) {
          // this.$emit("on-action", { action: "save", data: formObj, evt: evt });
          // this.tableForm = [];
          this.tableData = newData;
          // this.tableForm.push(formObj);
          // const targetArr = []
          let flag = false;
          let serial = [];
          if (this.tableForm.length !== 0) {
            for (let i in this.tableForm) {
              serial.push(this.tableForm[i].serial);
            }
            if (!serial.includes(target.serial)) {
              flag = true;
            }
            if (flag) {
              this.tableForm.push(target);
            }
          } else {
            this.tableForm.push(target);
          }
          // this.tableForm.forEach(v =>{
          //   delete v.serial
          // })
        } else if (this.$route.params.model.indexOf("instrumentlist") !== -1) {
          // formObj["status"] = parseInt(formObj["status"]);
          if (target.instId) {
            formObj["instId"] = target.instId;
            BaseServiceApi.postApi(
              `/inst/modfiyInst/${target.instId}`,
              formObj
            ).then(res => {
              if (res.ret === 0) {
                this.$message.success("修改仪器成功");
                const pageSize = { pageSize: this.pageSize };
                const search = {
                  ...this.pageParams,
                  ...this.searchParams,
                  ...pageSize
                };
                this.getData(search);
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            formObj["instBaseId"] = target.instName;
            BaseServiceApi.postApi(
              `/inst/addInst/${target.instBaseId}`,
              formObj
            ).then(res => {
              if (res.ret === 0) {
                this.$message.success("新增仪器成功");
                const pageSize = { pageSize: this.pageSize };
                const search = {
                  ...this.pageParams,
                  ...this.searchParams,
                  ...pageSize
                };
                this.getData(search);
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        } else if (this.$route.params.model.indexOf("reagent") !== -1) {
          formObj["matName"] = target.matName;
          // console.log(formObj, "formobj");
          // formObj["status"] = parseInt(formObj["status"]);
          BaseServiceApi.postApi(
            `/baseinfo/modfiyMat/${target.matId}`,
            formObj
          ).then(res => {
            if (res.ret === 0) {
              this.$message.success("修改物料成功");
              const pageSize = { pageSize: this.pageSize };
              const search = {
                ...this.pageParams,
                ...this.searchParams,
                ...pageSize
              };
              this.getData(search);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else if (this.$route.params.model.indexOf("instrumentplan") !== -1) {
          formObj["instId"] = target.instId;
          BaseServiceApi.postApi(
            `/inst/adjStatus/${target.instId}`,
            formObj
          ).then(res => {
            if (res.ret === 0) {
              this.$message.success("修改仪器计划成功");
              const pageSize = { pageSize: this.pageSize };
              const search = {
                ...this.pageParams,
                ...this.searchParams,
                ...pageSize
              };
              this.getData(search);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else if (
          this.$route.params.model.indexOf("instrumentadjust") !== -1
        ) {
          formObj["instId"] = target.instId;
          // formObj["status"] = parseInt(formObj["status"]);
          BaseServiceApi.postApi(`/inst/adjStatus`, formObj).then(res => {
            if (res.ret === 0) {
              this.$message.success("修改状态成功");
              const pageSize = { pageSize: this.pageSize };
              const search = {
                ...this.pageParams,
                ...this.searchParams,
                ...pageSize
              };
              this.getData(search);
            } else {
              flag = false;
              target.editable = true;
              this.$message.error(res.msg);
            }
          });
        } else if (this.$route.params.model.indexOf("instrument") !== -1) {
          formObj["instBaseId"] = target.instBaseId;
          // console.log(formObj['status'])
          // formObj["status"] = parseInt(formObj["status"]);
          BaseServiceApi.postApi(
            `/baseinfo/modfiyInst/${target.instBaseId}`,
            formObj
          ).then(res => {
            if (res.ret === 0) {
              this.$message.success("修改仪器成功");
              const pageSize = { pageSize: this.pageSize };
              const search = {
                ...this.pageParams,
                ...this.searchParams,
                ...pageSize
              };
              this.getData(search);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          if (this.$route.params.model === "adjustInventory") {
            let adjInventory = {};
            formObj["invId"] = target.invId;
            formObj["total"] = parseInt(target.count);
            formObj["remark"] = target.remark;
            if (!target.invId) {
              formObj["invId"] = target.matBatNo;
            }
            formObj["serial"] = sno;
            // formObj = adjInventory;
          }
          // console.log(formObj);
          formObj["serial"] = sno;
          this.tableData = newData;
          let flag = false;
          let serial = [];
          // this.tableForm = [];
          if (this.tableData.length !== 0) {
            for (let i in this.tableData) {
              serial.push(this.tableData[i].serial);
            }
            // console.log(serial)
            if (!serial.includes(formObj.serial)) {
              flag = true;
            }
            if (flag) {
              // console.log(formObj)
              this.tableData.push(formObj);
            }
          } else {
            this.tableData.push(formObj);
          }
          if (this.$route.params.model === "adjustInventory") {
            this.tableData.forEach(v => {
              v["total"] = parseInt(v["count"]);
            });
          }
          if (this.$route.params.model === "outAdd") {
            this.tableData.forEach(v => {
              v["total"] = parseInt(v["outTotal"]);
            });
          }
          // console.log(this.tableData, 'save tableForm');
          // this.tableForm.push(formObj);
          this.$message.success("保存成功");
        }
      } else {
        this.$message.error("数据异常、保存失败");
      }

      // this.tableForm.push(formObj);
      // this.tableData.forEach(v => {
      //   if (v.matId === target['matId']) {
      //     v = target
      //   }
      // })
      // return { ret: 0, data: 1, msg: "success" };
    },
    // 批量提交
    batchSubmit() {
      if (this.tableForm.length !== 0) {
        this.tableForm.forEach(v => {
          delete v.serial;
        });
        BaseServiceApi.postApi(
          `/${this.models.batchAddUrl}`,
          this.tableForm
        ).then(res => {
          if (res.ret === 0) {
            this.$message.success("批量添加成功");
            setTimeout(() => {
              this.remove(this.activeKey);
              this.goto(this.models.toUrl);
            }, 1000);
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        this.$message.error("请填写完整信息");
      }
    },
    // 删除行
    async deleteRow(id, data) {
      if (this.$route.params.model.indexOf("Modify") !== -1) {
        BaseServiceApi.deleteApi(
          `/materiel/deleteMat/${this.$route.query.id}/${data.purMatId}`
        ).then(res => {
          if (res.ret === 0) {
            this.$message.success("删除成功");
            const pageSize = { pageSize: 20 };
            const params = { ...pageSize };
            this.getData(params);
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        BaseServiceApi.deleteApi(`/materiel/delete/${id}`).then(res => {
          if (res.ret === 0) {
            this.$message.success("删除成功");
            const pageSize = { pageSize: 20 };
            const params = { ...pageSize };
            this.getData(params);
          } else {
            this.$message.error(res.msg);
          }
        });
      }
      // return { ret: 0, data: 1, msg: "success" };
    },
    // 跳转到详情页面
    detailRow(id) {
      const letpath = `${this.$route.path}Detail`;
      this.goto(`${letpath}?id=${id}`);
    },
    // 跳转到编辑页面
    modifyRow(id) {
      const letpath = `${this.$route.path}Modify`;
      this.goto(`${letpath}?id=${id}`);
    },
    // 跳转到日志详情
    showLog(id) {
      this.goto(`/log/${id}`);
    },
    // 禁用启用
    switchRow() {},
    // 撤回
    async revokeRow(params) {
      BaseServiceApi.postApi(`/materiel/withdraw/${params}`).then(res => {
        if (res.ret == 0) {
          this.$message.success("撤回成功");
          const pageSize = { pageSize: 20 };
          const params = { ...pageSize };
          this.getData(params);
        } else {
          this.$message.error(res.msg);
        }
      });
      // return { ret: 0, data: params, msg: "success" };
    },
    doSubmit() {
      this.dataSource = this.tableData;
      // this.pageTotal = 10;
    },
    // 选择操作复选框
    selectedRowKeys(params) {
      this.rowKeys = params;
      let route = this.$route;
      let ids = [];
      let id = this.$route.params.model === "dangerLine" ? "matId" : "invId";
      this.tableData.forEach(v => {
        if (this.rowKeys.includes(v.serial)) {
          ids.push(v[id]);
        }
      });
      if (this.rowKeys.length !== 0) {
        if (route.params.model == "dangerLine") {
          localStorage.setItem("purIds", JSON.stringify(ids));
          this.goto("/erp/purchase/applicationAdd?type=add&params=purIds");
        } else if (route.params.model == "adjust") {
          localStorage.setItem("adjustIds", JSON.stringify(ids));
          this.goto(
            "/erp/inventoryManager/adjustInventory?type=add&params=adjustIds"
          );
        }
      } else {
        this.$message.warning("请选择物料");
      }
    },
    // 添加操作
    addData(params) {
      this.goto(`/erp/${params.prevKey}/${params.key}?type=add`);
    },
    // 添加物料
    addmateriel() {
      this.rowInc++;
    },
    // 处理tabs数据
    handleTab(route) {
      let flag = true;
      // 常规：基础页面和详情页面
      if (this.models.key && route.params.model === this.models.key) {
        this.activeKey = route.query.id
          ? `${route.params.model}-${route.query.id}`
          : route.query.type
          ? `${route.params.model}-${route.query.type}`
          : route.params.model;
        this.panes.forEach(v => {
          if (v.key === route.params.model) {
            flag = false;
          } else if (route.query.id) {
            if (
              v.key.split("-")[1] === route.query.id &&
              v.key.split("-")[0] === route.params.model
            ) {
              flag = false;
            }
          } else if (route.query.type) {
            if (
              v.key.split("-")[1] === route.query.type &&
              v.key.split("-")[0] === route.params.model
            ) {
              flag = false;
            }
          }
        });
        if (flag) {
          const { tab, prevKey } = this.models;
          let title;
          if (route.query.id) {
            title =
              route.params.model.indexOf("Modify") !== -1
                ? `${tab}修改`
                : `${tab}详情`;
          } else if (route.query.type) {
            title = `${tab}新增`;
          } else if (route.params.model === "adjustInventory") {
            title = tab;
          } else {
            title = tab;
          }
          const isDetail = route.query.id ? true : false;
          const isType = route.query.type ? route.query.type : null;
          this.add({
            title: title,
            key: this.activeKey,
            prevKey: prevKey,
            isDetail: isDetail,
            isType: isType
          });
        }
      } else {
        this.panes.forEach(v => {
          if (v.key === route.name) {
            flag = false;
          }
        });
        this.activeKey = route.name;
        if (flag) {
          this.add({
            title: route.params.title,
            key: this.activeKey,
            prevKey: null,
            isDetail: false
          });
        }
      }
    },
    // 打印
    handlePrint() {
      this.$router.push(
        `/erp/print/${this.$route.params.model}Print/${this.$route.query.id}`
      );
    },
    // 新增数据之后提交全部数据
    handleSubmit() {
      // console.log('hhhh')
      // 新增数据
      if (this.$route.query.type) {
        if (this.$route.query.params == "purIds") {
          this.tableForm = [];
          this.tableData.forEach(v => {
            this.tableForm.push({
              price: v.price,
              matId: v.matId,
              total: v.total
            });
          });
        }
        let detailForm = this.$refs.detailForm.handleSubmit();
        console.log(this.tableData);
        if (detailForm !== undefined && this.tableData.length !== 0) {
          // this.tableData = []
          this.tableData.forEach(v => {
            if (v.serial) {
              delete v.serial;
            }
          });
          let subparams = Object.assign(detailForm);
          subparams.list = [];
          subparams.list = this.tableData;
          // console.log(subparams, 'subparams')
          BaseServiceApi.postApi(`/${this.models.submitUrl}`, subparams).then(
            res => {
              if (res.ret === 0) {
                this.$message.success("保存成功");
                setTimeout(() => {
                  // this.$router.go(-1);
                  this.remove(this.activeKey);
                  this.goto(this.models.submitoUrl);
                }, 1000);
              } else {
                this.$message.error(res.msg);
              }
            }
          );
        } else {
          this.$message.error("请先添加物料");
        }
      } else {
        // console.log('入库')
        // 修改数据
        // if (this.tableForm.length == 0 || this.tableData.length == 0) {
        //   this.$message.error("请先选择物料");
        // } else {
        BaseServiceApi.postApi(`/materiel/submit/${this.$route.query.id}`).then(
          res => {
            if (res.ret === 0) {
              this.$message.success("提交成功");
              setTimeout(() => {
                // this.$router.go(-1);
                this.remove(this.activeKey);
                this.goto(this.models.submitoUrl);
              }, 1000);
            } else {
              this.$message.error(res.msg);
            }
          }
        );
        // }
      }
    },
    // 新增数据之后保存全部数据
    handleSave() {
      // this.remove(this.activeKey)
      if (this.$route.query.type) {
        if (this.$route.query.params == "purIds") {
          this.tableForm = [];
          this.tableData.forEach(v => {
            this.tableForm.push({
              price: v.price,
              matId: v.matId,
              total: v.total
            });
          });
        }

        let detailForm = this.$refs.detailForm.handleSubmit();
        if (detailForm !== undefined && this.tableForm.length !== 0) {
          let subparams = Object.assign(detailForm);
          subparams.list = [];
          subparams.list = this.tableForm;
          BaseServiceApi.postApi(`/${this.models.saveUrl}`, subparams).then(
            res => {
              if (res.ret === 0) {
                this.$message.success("保存成功");
                setTimeout(() => {
                  // this.$router.go(-1);
                  this.remove(this.activeKey);
                  this.goto(this.models.savetoUrl);
                }, 1000);
              } else {
                this.$message.error(res.msg);
              }
            }
          );
        } else {
          this.$message.error("请先添加物料");
        }
      } else {
        // 修改数据
        let detailForm = this.$refs.detailForm.handleSubmit();
        if (detailForm !== undefined) {
          delete detailForm.revTime;
          delete detailForm.revName;
          delete detailForm.revOpin;
          BaseServiceApi.postApi(
            `/materiel/edit/${this.$route.query.id}`,
            detailForm
          ).then(res => {
            if (res.ret === 0) {
              this.$message.success("保存成功");
              // setTimeout(() => {
              //   // this.$router.go(-1);
              //   this.remove(this.activeKey);
              //   this.goto(this.models.toUrl);
              // }, 1000);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$message.error("请填写完整信息");
        }
      }
    },
    // 盘盈盘亏
    adjustInventory() {
      this.rowSelectedFlag++;
    },
    // 新建模态框
    showNewModal() {
      this.newformVisible = true;
    },
    // 关闭新建模态框
    newFormCancel() {
      this.newformVisible = false;
    },
    // 批量添加
    batchAdd(params) {
      this.goto(`/erp/${params.prevKey}/${params.key}?type=add`);
    },
    // 获取取消编辑的id
    getCancelId(id) {
      let newData = [...this.tableData];
      let targetId;
      if (this.models.isCancel) {
        this.cancelId = id;
        const target = newData.filter(item => id === item.serial)[0];
        for (let i in target) {
          if (i.indexOf("Id") !== -1) {
            targetId = i;
          }
        }
        if (target) {
          delete target.editable;
          const cacheTarget = this.accountObj.filter(
            item => id === item.serial
          )[0];
          for (let i in target) {
            for (let y in cacheTarget) {
              if (i !== y) {
                delete target[i];
              }
            }
          }
          if (cacheTarget) {
            Object.assign(target, cacheTarget);
          }
          this.tableData = newData;
          if (!target[targetId]) {
            this.tableData = newData.filter(item => item.serial !== id);
          }
        }
      }
      this.cancelSum(this.cancelId, newData);
    },
    // 初始化总金额
    countTotal(data) {
      let amount = 0;
      data.forEach(v => {
        amount += Number(v.total) * Number(v.price);
      });
      this.amount = amount;
      // this.detailFields.amount = amount
    },
    // 监听数量改变
    onNumChange(row, id, data) {
      let amount = 0;
      data.forEach(v => {
        if (v.id === id) {
          v.price = row.price;
          v.total = row.total;
          v.editable = true;
        }
      });
      data.forEach(v => {
        amount += parseFloat(v.price) * Number(v.total);
      });
      this.amount = amount;
      // this.detailFields.amount = amount
    },
    // 监听价格改变
    onPriceChange(row, id, data) {
      let amount = 0;
      data.forEach(v => {
        if (v.id === id) {
          v.price = row.price;
          v.total = row.total;
          v.editable = true;
        }
      });
      data.forEach(v => {
        amount += parseFloat(v.price) * Number(v.total);
      });

      this.amount = amount;
      // this.detailFields.amount = amount
    },
    // 生成采购申请单
    createPurForm() {
      this.rowSelectedFlag++;
    },
    // 处理取消之后总金额
    cancelSum(id, data) {
      if (id && id > 0) {
        let amount = 0;
        data.forEach(v => {
          if (v.serial !== id) {
            amount += Number(v.price) * Number(v.total);
          }
        });
        this.amount = amount;
      }
    },
    // 关闭导出模态框
    exportFormCancel() {
      this.exportformVisible = false;
    },
    // 显示导出模态框
    showExportModal() {
      this.exportformVisible = true;
    },
    // 关闭导入模态框
    importFormCancel() {
      this.importformVisible = false;
    },
    // 显示导入模态框
    showImportModal() {
      this.importformVisible = true;
    },
    // 获取数据
    getData(params = {}) {
      const route = this.$route;
      const detailId = route.query.id;
      const { models } = this;
      // 详情页和非详情页
      if (detailId) {
        BaseServiceApi.getApi(`/${models.getUrl}/${detailId}`, params).then(
          res => {
            if (res.ret === 0) {
              this.detailFields = {};
              // 头部表单
              this.models.submitComponent &&
                this.models.submitComponent.forEach(v => {
                  if (
                    v.name.indexOf("Time") !== -1 &&
                    res.data[v.name] !== null
                  ) {
                    this.detailFields[v.name] = moment(res.data[v.name]);
                  } else {
                    this.detailFields[v.name] = res.data[v.name];
                  }
                });
              localStorage.setItem("data", JSON.stringify(res.data));
              // 表格数据
              this.tableData = res.data.list;
              const data = cloneDeep(this.tableData);
              this.tableData = data.map((item, index) => {
                item.serial = index + 1;
                return item;
              });
              this.accountObj = cloneDeep(this.tableData);
              this.countTotal(this.tableData);
              // 是否是审核不通过的
              this.isToSub = res.data.status === 3 || res.data.status === 4;
              this.$route.params.model == "checkedApplicationDetail"
                ? true
                : false;
            }
          }
        );
      } else if (route.query.params) {
        if (route.query.params === "purIds") {
          // 勾选之后新增获取数据(低于安全库存新增)
          let addIds = JSON.parse(
            localStorage.getItem(`${route.query.params}`)
          );
          addIds = addIds.join(",");
          BaseServiceApi.postApi(`/${models.getUrl}`, { ids: addIds }).then(
            res => {
              if (res.ret === 0) {
                this.loading = false;
                this.tableData = res.data;
                const data = cloneDeep(this.tableData);
                this.tableData = data.map((item, index) => {
                  item.serial = index + 1;
                  return item;
                });
                this.accountObj = cloneDeep(this.tableData);
                this.countTotal(this.tableData);
              } else {
                this.$message.error(res.msg);
              }
            }
          );
        } else if (route.query.params === "adjustIds") {
          // 勾选之后新增获取数据(盘盈盘亏)
          let addIds = JSON.parse(
            localStorage.getItem(`${route.query.params}`)
          );
          addIds = addIds.join(",");
          BaseServiceApi.postApi(`/${models.getUrl}`, { ids: addIds }).then(
            res => {
              if (res.ret === 0) {
                this.loading = false;
                this.tableData = res.data.list;
                const data = cloneDeep(this.tableData);
                this.tableData = data.map((item, index) => {
                  item.serial = index + 1;
                  item.editable = true;
                  return item;
                });
                this.accountObj = cloneDeep(this.tableData);
                this.$set(this.pagination, "total", res.data.total);
                // this.countTotal(this.tableData)
              } else {
                this.$message.error(res.msg);
              }
            }
          );
        }
      } else if (route.query.type == "add" && !route.query.params) {
        return;
      } else {
        // const pageSize = { pageSize: 20 };
        // params = {...params, ...pageSize}
        BaseServiceApi.getApi(
          `/${models.getUrl}`,
          params,
          this.searchParams
        ).then(res => {
          if (res.ret === 0) {
            this.loading = false;
            this.tableData = res.data.list;
            const data = cloneDeep(this.tableData);
            // const current = this.currentPage > 1 ? this.currentPage - 1 : "";
            this.tableData = data.map((item, index) => {
              item.serial = (this.currentPage - 1) * this.pageSize + index + 1;
              // this.currentPage > 1 ? `${this.currentPage}${index + 1}`  : index + 1
              // (this.currentPage - 1) * 10 + index + 1
              return item;
            });
            if (this.$route.params.model == "instrumentplan") {
              let date1 = new Date();
              let days;
              // let row;
              var tr = document.getElementsByClassName("ant-table-row");
              this.tableData.forEach(v => {
                let nextTime = new Date(
                  Date.parse(v.nextCalTime.replace(/-/g, "/"))
                );
                // if (nextTime.getTime() > date1.getTime()) {
                days = parseInt(
                  Math.abs(nextTime.getTime() - date1.getTime()) /
                    1000 /
                    60 /
                    60 /
                    24
                );
                if (Number(days) <= 60) {
                  // console.log(v.calCycle, v, days,v.serial, "周期");
                  this.$nextTick(() => {
                    for (var i = 0; i < tr.length; i++) {
                      if (v.serial == tr[i].dataset.rowKey) {
                        tr[i].setAttribute("style", "color: red");
                      }
                    }
                  });
                  // let row = v;
                }
                // }
              });
            }
            this.$set(this.pagination, "total", res.data.total);
            // this.$set(this.pagination, "current", 1);
            this.accountObj = cloneDeep(this.tableData);
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    // 重置
    handleReset() {
      const pageSize = { pageSize: 20 };
      const params = { ...pageSize };
      // console.log(this.searchParams)
      this.searchParams = {};
      this.getData(params);
      this.$set(this.pagination, "current", 1);
    },
    // 导出数据
    handleExport(values) {
      BaseServiceApi.downloadApi(
        `/${this.models.exportUrl}`,
        values,
        `${this.models.tab}.xls`
      );
      this.exportformVisible = false;
    },
    // 不用弹窗的导出
    handleExportCsv() {
      console.log(
        this.models,
        moment().format("YYYYMMDD"),
        moment().hours(),
        moment().minute()
      );
      let hours =
        moment().hours() < 10 ? `0${moment().hours()}` : moment().hours();
      let minutes =
        moment().minute() < 10 ? `0${moment().minute()}` : moment().minute();
      BaseServiceApi.downloadApi(
        `/${this.models.exportUrl}`,
        this.searchParams,
        `${this.models.tab}单${moment().format(
          "YYYYMMDD"
        )}${hours}${minutes}.xls`
      );
      console.log(this.searchParams);
    },
    // 导入数据
    handleImport(values) {
      BaseServiceApi.postApi(`/${this.models.importUrl}`, values).then(res => {
        if (res.ret === 0) {
          this.$message.success("上传成功");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 下载
    download() {
      BaseServiceApi.downloadApi(`/${this.models.downloadUrl}`, {}, "模板.xls");
    },
    // 搜索
    handleSearch(params) {
      const pageSize = { pageSize: 20 };
      this.searchParams = params;
      const search = { ...pageSize, ...this.searchParams };
      this.getData(search);
      this.$set(this.pagination, "current", 1);
    },
    // 页数搜索
    pageChange(pagination) {
      this.pageSize = pagination.pageSize;
      const { current } = pagination;
      const page = { page: current };
      const params = { ...this.searchParams };
      const pageSize = { pageSize: pagination.pageSize };
      const search = Object.assign(page, params, pageSize);
      // console.log(search)
      this.getData(search);
      this.$set(this.pagination, "current", current);
      this.$set(this.pagination, "pageSize", pagination.pageSize);
      this.currentPage = pagination.current;
      this.pageParams = { page: current };
    },
    // 单独新增
    singleAdd() {
      this.tableData = [];
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
      er.serial = 1;
      this.tableData.push(er);
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
    }
  },
  created: function() {
    if (this.models.getUrl) {
      const pageSize = { pageSize: 20 };
      const params = { ...pageSize };
      this.getData(params);
    }
    this.initEmptyRow();
  },
  mounted() {
    this.handleTableData(this.$route);
    // this.goto("/erp/purchase/dangerLine");
    this.isFLoat = Object.keys(this.$route.query).length !== 0 ? true : false;
    this.isBatch =
      this.$route.params.model.indexOf("BatchAdd") !== -1 ? true : false;
    this.$set(this.pagination, "showQuickJumper", true);
    this.$set(this.pagination, "showSizeChanger", true);
    this.$set(this.pagination, "pageSize", 20);
  },

  watch: {
    $route: {
      handler: function(route) {
        this.currentPage = 1;
        this.pagination = {};
        this.tableForm = [];
        this.tableData = [];
        this.accountObj = [];
        this.searchParams = {};
        this.pageParams = {};
        if (this.models.getUrl) {
          const pageSize = { pageSize: 20 };
          const params = { ...pageSize };
          this.getData(params);
        }
        this.$set(this.pagination, "current", 1);
        this.$set(this.pagination, "pageSize", 20);
        this.$set(this.pagination, "showQuickJumper", true);
        this.$set(this.pagination, "showSizeChanger", true);
        this.handleTab(route);
        this.handleTableData(route);
        this.countTotal(this.tableData);
        this.isNotAdd = route.query.type ? false : true;
        this.isAddOperate =
          route.params.sublead === "inventory" && route.query.type === "add"
            ? true
            : false;
        // 初始化批量添加
        if (
          route.params.model &&
          route.params.model.indexOf("BatchAdd") !== -1
        ) {
          this.rowInc += 10;
        }
        // 是否浮动
        this.isFLoat = Object.keys(route.query).length !== 0 ? true : false;
        this.uploadAction = `/inventory/api${this.models.importUrl}`;
        this.isBatch =
          route.params.model && route.params.model.indexOf("BatchAdd") !== -1
            ? true
            : false;
        if (
          route.params.model &&
          route.params.model.indexOf("BatchAdd") === -1 &&
          route.query.type == "add" &&
          !route.query.params
        ) {
          this.singleAdd();
          this.detailFields = {};
        }
      }
    },
    models() {},
    key() {},
    tableData: {
      handler: function(newVal) {
        this.countTotal(newVal);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.basic-model {
  .basic {
    &-tab {
      text-align: left;
    }
    &-operate {
      // display: flex;
      // height: 56px;
      margin-left: 20px;
      .ant-btn {
        margin-top: 4px;
      }
    }
    &-search {
      // margin-bottom: 20px;
      display: inline-block;
    }
  }
  .operate-btn {
    line-height: 32px;
    display: inline-block;
    display: flex;
  }
  .displayR {
    float: right;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
  }
  .displayF {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
  }
  .mt55 {
    margin-top: 55px;
  }
  .ant-table-thead > tr > th {
    font-weight: bold;
    background-color: #eef1f6;
  }
  .ant-table {
    color: #000;
  }
}
</style>

 
