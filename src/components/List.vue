<template>
  <div class="list-div-class">
    <div style="text-align:left;line-height:0px;">
      <div v-for="(item, index) in params.filters" :key="index" style="display:inline-block;margin-right:16px;">
        <a-input v-if="item.type == 'input'" v-model="search[item.key]" :placeholder="item.label" :style="item.width ? `width:${item.width}px;` : `width: 200px`"></a-input>
        <a-select v-if="item.type == 'select'"  :placeholder="item.label" v-model="search[item.key]" :style="item.width ? `width:${item.width}px;` : `width: 200px`" :allowClear="true">
          <a-select-option v-for="opt in filterStatus(item.opts)" :key="opt.value" :value="opt.value" >
            {{opt.label}}
          </a-select-option>
        </a-select>
      </div>

      <a-button type="primary" @click="doSearch" style="margin: 0px 24px 0px 8px"> 查询 </a-button>
      <a-button type="default" style="background-color:#52C41A;color:white;width:108px;" v-if="params.roleID == 1 || params.roleID == 2">
          <router-link :to="`${params.newPath}`">
            添加新数据
          </router-link>
      </a-button>
    </div>


    <a-row style="margin-top:20px;background-color:white;border-left:1px solid #e8e8e8;border-top:1px solid #e8e8e8;">
      <a-col :lg="{span:24, offset:0}">
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          rowKey='id'
          :scroll="{ x: scrollWidth}"
          :rowClassName="setRowClass"
        >
          <a slot="action" slot-scope="text, record">
            <div v-if="params.roleID == 1 || params.roleID == '2'">
              <a-dropdown :trigger="['hover']" :disabled="record.isDelete">
                <div v-if="record.isDelete" style="color:#000000;">
                  编辑
                </div>
                <div v-else>
                  <span class="ant-dropdown-link"> 编辑 <a-icon type="down" /></span>
                </div>
                <a-menu slot="overlay">
                  <a-menu-item key="1">
                    <router-link :to="`${params.editPath}/${record.id}`">
                      <a style="color:#1890ff">
                        编辑
                      </a>
                    </router-link>
                    <a  style="color:#1890ff"></a>
                  </a-menu-item>
                  <a-menu-item key="2" v-if="params.roleID == 1">
                    <router-link :to="`${params.translatePath}/${record.id}`">
                      <a style="color:#1890ff">
                        <span v-if="record.status == 3">发布</span><span v-else>翻译</span>
                      </a>
                    </router-link>
                  </a-menu-item>
                  <!-- <a-menu-item key="3" v-if="params.roleID == 1">
                    <router-link :to="`${params.translatePath}/${record.id}`">
                      <a style="color:#1890ff">
                        发布
                      </a>
                    </router-link>
                  </a-menu-item> -->
                  <a-menu-item key="4" v-if="record.status == 1">
                    <a-popconfirm title='确认删除?' @confirm="() => deleteRow(record)">
                      <a style="color:red;">删除</a>
                    </a-popconfirm>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
            <div v-if="params.roleID == '3'">
              <router-link :to="`${params.translatePath}/${record.id}`">
                <a style="color:#1890ff">
                  翻译
                </a>
              </router-link>
            </div>
          </a>

          <a slot="log" slot-scope="text, record">
            <router-link :to="`${params.logPath}/${record.id}`">
              查看
            </router-link>
          </a>

          <template slot="updatedAt" slot-scope="record">
            {{record.updatedAt}}
          </template>

          <template slot="status" slot-scope="record">
            <div v-if="record.isDelete">
              <span style="color:red;">
                已删除
              </span>
            </div>
            <div v-else>
              <span v-if="record.status == 1">
                未编辑
              </span>
              <span v-if="record.status == 2" style="color:#52C41A;">
                编辑完成
              </span>
              <span v-if="record.status == 3" style="color:#12BBBA;">
                翻译完成
              </span>
              <span v-if="record.status == 4" style="color:#FF9700;">
                已发布
              </span>
            </div>
          </template>

          <template slot="overflowHide" slot-scope="text">
            <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:22rem;">
              {{text}}
            </div>
          </template>

          <template slot="overflowHide2" slot-scope="text">
            <a-popover>
              <template slot="content">
                <div style="max-width:360px;">{{text}}</div>
              </template>
              <div style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;max-width:7rem;">
                {{text}}
              </div>
            </a-popover>

          </template>

        </a-table>
      </a-col>
    </a-row>

    <a-row style="background-color:white;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;border-bottom:1px solid #e8e8e8;">
      <a-col :lg="{span:24, offset:0}" style="padding:21px 50px 26px 0;text-align:right;">
        <a-pagination :pageSize.sync="pagenate.pageSize" :total="pageTotal" v-model="pagenate.currentPage" @change="changePage" @showSizeChange="changePageSize" showSizeChanger showQuickJumper />
      </a-col>
    </a-row>

  </div>
</template>


<script>

  import auth from '../auth.js'
  const cloneDeep = require('clone-deep');

  export default {
    props: ["data", "dataSource", "pageTotal"],
    components: {
      // simplebar,
    },
    data() {
      return {
        columns: [],
        search: {},
        scrollWidth: '',
        params: {
          filters: [],
          demoColumns: [],
          demoColumns2: [],
          demoColumns3: [],
          pageTotal: 10,
          logPath: '',
          translatePath: '',
          editPath: '',
          newPath: '',
        },
        pagenate: {
          pageSize: 10,
          currentPage: 1,
        },
      }
    },
    methods: {
      // setCustomRow(record, index) {
      //   return {
      //     on: {
      //       click: () => {
      //       }
      //     }
      //   };
      // },
      filterStatus(opts) {
        const roleID = auth.getRoleID()
        if (roleID == 1) {
          return opts
        } else {
          const options = [...opts]
          const targets = options.filter(item => (roleID == 2 && item.value <= 2  || (roleID == 3 && item.value > 2) ))
          return targets
        }
      },
      setRowClass(record) {
        if (record.isDelete) {
          return 'deleted-class'
        } else {
          return ''
        }
      },
      setColumns() {
        let demoCols = []
        if (this.params.roleID == 1 || this.params.roleID == 3) {
          demoCols = [...this.params.demoColumns3]
        } else {
          demoCols = [...this.params.demoColumns2]
        }

        this.scrollWidth = false
        // if (true || window.innerWidth - 200 > 1000) {
        //   demoCols = [...this.params.demoColumns2]
        //   this.scrollWidth = false
        //   // this.scrollWidth = window.innerWidth - 244
        // } else {
        //   demoCols = [...this.params.demoColumns]
        //   if (window.innerWidth - 200 < 1000) {
        //     this.scrollWidth = 1000
        //   } else {
        //     this.scrollWidth = window.innerWidth
        //   }
        // }
        this.columns = demoCols
      },
      initSearch() {
        const filters = [...this.params.filters]
        let search = {}
        filters.map(item => {
          if (item.type == 'select') {
            search[item.key] = []
          } else {
            search[item.key] = ''
          }
        })
        this.search = search
      },
      changePage(page, pageSize) {
        this.pagenate.currentPage = page
        this.pagenate.pageSize = pageSize
        this.doSubmit()
      },
      changePageSize(current, size) {
        this.pagenate.pageSize = size
        this.pagenate.currentPage = 1
        this.doSubmit()
      },
      doSearch() {
        this.pagenate.currentPage = 1
        this.doSubmit()
      },
      // reset() {
      //   const search = [...this.search]
      //   let emptySearch = {}
      //   for (var [key, value] of search) {
      //     if (Array.isArray(value) {
      //       emptySearch[key] = []
      //     }) else {
      //       emptySearch[key] = ''
      //     }
      //   }
      //   this.search = emptySearch
      // },
      doSubmit() {
        let params = {}
        Object.assign(params, this.search, {page: this.pagenate.currentPage, pageSize: this.pagenate.pageSize})
        this.$emit('on-submit', params)
      },
      deleteRow(record) {
        this.$emit('on-delete', record)
      },
      resize() {
        this.setColumns()
      }
    },
    mounted: function() {
      this.$nextTick(() => {
        this.params = cloneDeep(this.data)
        this.initSearch()
        this.setColumns()
        // window.onresize = this.resize
      })
    }
  }

</script>

<style scoped>

.list-div-class {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 20vh;
}


/* Customize website's scrollbar like Mac OS
Not supports in Firefox and IE */

/* total width */
.list-div-class::-webkit-scrollbar {
    background-color:#F4F5FA;
    width:16px
}

/* background of the scrollbar except button or resizer */
.list-div-class::-webkit-scrollbar-track {
    background-color:#F4F5FA;
}

/* scrollbar itself */
.list-div-class::-webkit-scrollbar-thumb {
    background-color:#babac0;
    border-radius:16px;
    border:5px solid #F4F5FA;
}

/* set button(top and bottom of the scrollbar) */
.list-div-class::-webkit-scrollbar-button {display:none}



</style>

<style>

.deleted-class {
  color: #000000;
  opacity: 0.25;
}

.ant-btn {
  /* line-height: 1px; */
  vertical-align: top;
}

.ant-table-thead > tr > th, .ant-table-tbody > tr > td {
  border-right: 1px solid #e8e8e8;
}

</style>
