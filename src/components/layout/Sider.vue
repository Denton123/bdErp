<template>
  <div>
    <!-- <div style="height:65px">
      <div style="line-height:65px;text-align:left;padding-left:24px;">
        <b>北斗ERP管理系统</b>
      </div>
    </div>-->
    <div style="text-align:left;">
      <a-menu
        mode="inline"
        :openKeys="openKeys"
        @openChange="onOpenChange"
        :defaultSelectedKeys="defaultKey"
      >
        <a-sub-menu v-for="subItem in menuItems" :key="subItem.subKey">
          <span slot="title">
            <span>{{subItem.subTitle}}</span>
          </span>
          <template v-if="subItem.hasOwnProperty('groups')">
            <a-menu-item-group v-for="group in subItem.groups" :key="group.key">
              <template slot="title">
                <span>{{ group.title }}</span>
              </template>
              <a-menu-item v-for="item in group.items" :key="item.key">
                <router-link :to="item.path">
                  <div>{{item.name}}</div>
                </router-link>
              </a-menu-item>
            </a-menu-item-group>
          </template>
          <template v-else>
            <a-menu-item v-for="item in subItem.items" :key="item.key">
              <router-link :to="item.path">
                <div>{{item.name}}</div>
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script>
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();
import auth from "@/auth";
export default {
  props: ["coll apsed"],
  data() {
    return {
      defaultKey: [],
      selectedKeys: [],
      openKeys: ["sub1"],
      rootSubmenuKeys: ["sub1", "sub2", "sub3"],
      menuItems: [
        {
          subTitle: "物料管理",
          subKey: "sub1",
          groups: [
            {
              key: "g1",
              title: "采购申请",
              items: [
                {
                  key: "dangerLine",
                  name: "低于安全库存列表",
                  path: "/erp/purchase/dangerLine"
                },
                {
                  key: "application",
                  name: "采购申请表",
                  path: "/erp/purchase/application"
                },
                {
                  key: "uncheckApplication",
                  name: "待审核采购申请表",
                  path: "/erp/purchase/uncheckApplication"
                },
                {
                  key: "checkedApplication",
                  name: "已审核采购申请表",
                  path: "/erp/purchase/checkedApplication"
                }
              ]
            },
            {
              key: "g2",
              title: "仓库",
              items: [
                {
                  key: "in",
                  name: "入库",
                  path: "/erp/inventory/in"
                },
                {
                  key: "out",
                  name: "出库",
                  path: "/erp/inventory/out"
                }
              ]
            },
            {
              key: "g3",
              title: "库存管理",
              items: [
                {
                  key: "list",
                  name: "库存主数据",
                  path: "/erp/inventoryManager/list"
                },
                {
                  key: "adjust",
                  name: "库存调整",
                  path: "/erp/inventoryManager/adjust"
                }
              ]
            }
          ]
        },
        {
          subTitle: "仪器管理",
          subKey: "sub2",
          items: [
            {
              key: "instrumentlist",
              name: "仪器主数据",
              path: "/erp/instrument/instrumentlist"
            },
            {
              key: "instrumentplan",
              name: "仪器周期检定计划",
              path: "/erp/instrument/instrumentplan"
            },
            {
              key: "instrumentadjust",
              name: "仪器调整",
              path: "/erp/instrument/instrumentadjust"
            }
          ]
        },
        {
          subTitle: "账套管理",
          subKey: "sub3",
          items: [
            {
              key: "reagent",
              name: "物料",
              path: "/erp/usable/reagent"
            },
            {
              key: "instrument",
              name: "仪器",
              path: "/erp/usable/instrument"
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 只展开当前父级菜单
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    getRole() {
      BaseServiceApi.getRole("/user/api/navigation", {}).then(res => {
        res.data.forEach(v => {
          if (v.enName == "inventory") {
            v.roles.forEach(i => {
              if (i.code == "BDLS_INV_ADMIN") {
                this.menuItems.splice(2, 1);
              }
            });
          }
        });
      });
    }
  },
  mounted: function() {
    let model = this.$route.params.model;
    this.menuItems.forEach(v => {
      if (v.groups) {
        v.groups.forEach(j => {
          if (j.items) {
            j.items.forEach(l => {
              if (model == l.key) {
                this.defaultKey.push(l.key);
              }
            });
          }
        });
      } else {
        v.items.forEach(i => {
          if (model == i.key) {
            this.openKeys = [];
            this.defaultKey.push(i.key);
            this.openKeys.push(v.subKey);
          }
        });
      }
    });
    this.getRole();
  }
};
</script>

<style>
.ant-menu-inline .ant-menu-submenu-title {
  color: #000;
  font-weight: 500;
  font-size: 16px;
}
.ant-menu-item-group-title {
  color: #000;
  font-size: 14px;
  font-weight: 500;
}
</style>
