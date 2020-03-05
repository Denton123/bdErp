<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view></router-view>
    </a-locale-provider>
  </div>
</template>

<script>

import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
export default {
  name: 'app',
  data() {
    return {
      locale: zhCN,
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  min-width: 1280px;
  /* overflow: hidden; */
}


/* Customize website's scrollbar like Mac OS
Not supports in Firefox and IE */

/* total width */
div::-webkit-scrollbar {
    background-color:#fff;
    width:16px
}

/* background of the scrollbar except button or resizer */
div::-webkit-scrollbar-track {
    background-color:#fff
}

/* scrollbar itself */
div::-webkit-scrollbar-thumb {
    background-color:#babac0;
    border-radius:16px;
    border:5px solid #fff
}

/* set button(top and bottom of the scrollbar) */
div::-webkit-scrollbar-button {display:none}


body {
  height:100vh;
}

html {
  height:100vh;
}
</style>
