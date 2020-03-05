import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import './utils/rem'

import auth from './auth'

// 引入公共样式
require('@/scss/index.scss');

router.beforeEach((to, from, next) => {
  // if (to.meta.checkLogin && !auth.isLogin()) {
  //   next({
  //     path: '/login?to=' + to.path
  //   })
  // }

  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.itemKey) {
    store.commit('setItemKey', to.meta.itemKey)
  }

  // if (to.meta.itemKey) {
  //   store.commit('setItemKey', to.meta.itemKey)
  // }
  next()
})

// import ScrollBar from 'vue2-scrollbar'
// Vue.component('vue-scrollbar', ScrollBar)
// require('vue2-scrollbar/dist/style/vue2-scrollbar.css')

import {
  LocaleProvider,
  Layout,
  Menu,
  Spin,
  Button,
  DatePicker,
  Row,
  Col,
  Tabs,
  Form,
  Input,
  Icon,
  Checkbox,
  Alert,
  Card,
  Steps,
  Radio,
  InputNumber,
  Select,
  Upload,
  Modal,
  Divider,
  Popover,
  Dropdown,
  Pagination,
  message,
  Tag,
  Popconfirm,
  Cascader,
  Table,
  Avatar,
  Breadcrumb,
  Tooltip
} from 'ant-design-vue'


Vue.component(LocaleProvider.name, LocaleProvider)
Vue.component(Layout.name, Layout)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Layout.Footer.name, Layout.Footer)
Vue.component(Layout.Sider.name, Layout.Sider)

Vue.component(Menu.name, Menu)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup)
Vue.component(Menu.Item.name, Menu.Item)

Vue.component(Spin.name, Spin)
Vue.component(DatePicker.name, DatePicker)
Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker)
Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Tabs.name, Tabs)
Vue.component(Tabs.TabPane.name, Tabs.TabPane)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(Input.name, Input)
Vue.component(Input.Search.name, Input.Search)
Vue.component(Icon.name, Icon)
Vue.component(Alert.name, Alert)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Card.name, Card)
Vue.component(Card.Meta.name, Card.Meta)
Vue.component(Steps.name, Steps)
Vue.component(Steps.Step.name, Steps.Step)
Vue.component(Radio.name, Radio)
Vue.component(Radio.Group.name, Radio.Group)
Vue.component(Radio.Button.name, Radio.Button)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Select.OptGroup.name, Select.OptGroup)
Vue.component(Upload.name, Upload)
Vue.component(Upload.Dragger.name, Upload.Dragger)
Vue.component(Modal.name, Modal)
Vue.component(Divider.name, Divider)
Vue.component(Popover.name, Popover)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Pagination.name, Pagination)
Vue.component(Tag.name, Tag)
Vue.component(Popconfirm.name, Popconfirm)
Vue.component(Cascader.name, Cascader)
Vue.component(Table.name, Table)
Vue.component(Table.Column.name, Table.Column)
Vue.component(Input.Group.name, Input.Group)
Vue.component(Avatar.name, Avatar)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(Breadcrumb.Item.name, Breadcrumb.Item)
Vue.component(Tooltip.name, Tooltip)



const confirm = Modal.confirm;
const success = Modal.success
const info = Modal.info;
const error = Modal.error
const warning = Modal.warning


Vue.prototype.$message = message
message.config({
  duration: 1,
  maxCount: 2,
});

Vue.prototype.$confirm = confirm
Vue.prototype.$success = success
Vue.prototype.$info = info
Vue.prototype.$error = error
Vue.prototype.$warning = warning

Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')