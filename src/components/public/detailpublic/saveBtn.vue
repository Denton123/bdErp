<!--
 * @Description: 详情和添加页面的保存按钮
 * @Author: sdt
 * @Date: 2019-07-16 16:34:24
 * @LastEditTime: 2019-07-29 13:33:46
 * @LastEditors: Please set LastEditors
 -->

<template>
    <a-button @click="save" type="primary" class="savBtn">保存</a-button>
</template>

<script>
export default {
    name: 'SaveBtn',
    methods: {
        save(){
            this.$emit('handleTrigger', {action: 'saveBtn'})
        }
    }
}
</script>

<style lang="scss" scoped>
.savBtn{
    margin-left: 24px;
}
</style>


