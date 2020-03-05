<!--
 * @Description: 打印按钮
 * @Author: sdt
 * @Date: 2019-07-16 17:40:42
 * @LastEditTime: 2019-07-19 11:10:45
 * @LastEditors: Please set LastEditors
 -->

 <template>
     <a-button @click="print" type="primary">打印</a-button>
 </template>
 
 <script>
 export default {
     name: 'printBtn',
     methods: {
         print(){
             this.$emit("handleTrigger", {action: 'print'});
         }
     }
 }
 </script>

 <style lang="scss" scoped>
 
 </style>
 
