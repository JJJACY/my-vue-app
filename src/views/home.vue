<script setup>
  import { reactive } from 'vue'
  const a = reactive({
    list: [
      {id:1,name:'劉備'},
      {id:2,name:'關羽'},
      {id:3,name:'張飛'}
    ]
  })
  const handleClickItem = (item) =>{
   console.log(item,11)
  }
  defineExpose({
    a,
    handleClickItem
  })
</script>

<template>
  <div class="page-home">
    <h5>首页</h5> 
    <el-button type="success" size="small">点击一下</el-button>

  </div>
</template>

<style></style>
