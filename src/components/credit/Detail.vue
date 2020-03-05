<template>
  <div>
    <div style="height:0.1px;"></div>
    <group title="表信息" class="textleft">
     <x-input
        text-align="right"
        title="申请部门"
        :value="data.dept"
        :readonly="true"
      >
      </x-input>

      <x-input
        text-align="right"
        title="组别"
        :value="data.group"
        :readonly="true"
      >
      </x-input>

      <x-input
        text-align="right"
        title="请购日期"
        :value="data.reqTime"
        :readonly="true"
      >
      </x-input>

      <x-input
        text-align="right"
        title="申请人"
        :value="data.reqName"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="审核日期"
        :value="data.revTime"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="总计金额"
        :value="data.amount"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="用途"
        :value="data.instru"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="需求时间"
        :value="data.demTime"
        :readonly="true"
      >
      </x-input>
    </group>
    <group title="审批意见" class="textleft">
      <x-textarea
        :value="data.revOpin"
        :readonly="true"
      >
      </x-textarea>
    </group>

    <group>
      <group-title slot="title">
        <div class="horizontal-scrollable" style="background-color: #F4F5FA;line-height:46px;margin-bottom: -20px;">
          <div @click="itemIndex = key" :class="itemIndex == key ? 'inline-block active' : 'inline-block'" style="padding: 0 15px;" v-for="key in data.list.length" :key="key">
            序号{{key}}
          </div>
        </div>
      </group-title>
      <x-input
        text-align="right"
        title="编号"
        :value="data.list[itemIndex -1]['matNo']"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="货号"
        :value="data.list[itemIndex -1]['goodsNo']"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="物料名称"
        :value="data.list[itemIndex -1]['matName']"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="厂家"
        :value="data.list[itemIndex -1]['factory']"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="规格"
        :value="data.list[itemIndex -1]['spec']"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="单位"
        :value="data.list[itemIndex -1]['unit']"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="请购数量"
        :value="data.list[itemIndex -1]['total']"
        :readonly="true"
      >
      </x-input>
      <x-input
        text-align="right"
        title="单价"
        :value="data.list[itemIndex -1]['price']"
        :readonly="true"
      >
      </x-input>

    </group>
    
  </div>
</template>

<script>

  import { Group, XInput, XTextarea } from 'vux'


  export default {
    props: ['data'],
    components: {
      Group,
      XInput,
      XTextarea,
    },
    computed: {
    },
    data () {
      return {
        itemIndex: 1,
      }
    },
    methods: {
    }
  }

</script>


<style scoped>

  .active {
    color: #0091FF;
  }
  .textleft {
    text-align: left;
  }

  .inline-block {
    display: inline-block;
  }


  .horizontal-scrollable {
    position:relative;
    overflow-x:auto;
    overflow-y: hidden;
    text-align: left;
    white-space: nowrap; 
    -webkit-overflow-scrolling: touch; 
  }

  .horizontal-scrollable ::-webkit-scrollbar {
    display: none;
  }

</style>

<style>


  .vux-x-textarea.weui-cell {
    padding-left:10px;
  }

  .weui-cell__bd  > .weui-input {
    /* color: #2C3E50; */
    padding-right: 0px;
  }

  .weui-cell__bd > p {
    margin-bottom: 0px;
    margin-top: 0px;
  }

  .vux-datetime > div > p {
    margin-bottom: 0px;
    margin-top: 0px;
  }

   .vux-cell-primary > p {
     margin-bottom: 0px;
     margin-top: 0px;
   }


   .weui-cell__ft  .vux-cell-value {
     color: #2C3E50;
   }

   .vux-popup-picker-select  .vux-cell-value {
     color: #2C3E50;
   }


  .emptyt .vux-no-group-title {
    margin-top: -1px;
  }

</style>
