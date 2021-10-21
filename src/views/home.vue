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
    首页
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
