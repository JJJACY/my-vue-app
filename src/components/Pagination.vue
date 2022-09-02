<script setup>
const emit = defineEmits(['change-page', 'change-size'])
const props = defineProps({
  currentPage: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  }
})

const changePage = (current) => {
  console.log(current)
  emit('change-page', current - 1)
}
const changeSize = (current) => {
  emit('change-size', current)
}
defineExpose({
  props,
  changePage,
  changeSize
})
</script>

<template>
  <el-pagination
    background
    :current-page="currentPage"
    :page-size="pageSize"
    layout="prev, pager, next"
    :total="total"
    @current-change="changePage"
  />
</template>

<style lang="less" scoped></style>
