<script setup>
import { computed } from 'vue'
const props = defineProps({
  breadcrumb: {
    type: Array,
    default: () => []
  }
})

const breadcrumbValue = computed(() => {
  const { breadcrumb } = this
  if (breadcrumb.length) {
    return breadcrumb
  }
  return this.$route.matched
    .filter(data => data.meta && data.meta.breadcrumb)
    .map(data => ({
      name: data.meta.breadcrumb.title,
      to: data.meta.breadcrumb.replace
        ? { name: data.name }
        : data.meta.breadcrumb.answer
          ? data.meta.breadcrumb.answer
          : undefined
    }))
})
defineExpose({
  breadcrumbValue,
  props
})

</script>

<template>
  <div class="breadcrumb-section">
    <el-breadcrumb
      v-if="breadcrumbValue.length"
      class="breadcrumb-list"
      separator-class="el-icon-arrow-right"
    >
      <template v-for="(item, index) in breadcrumbValue">
        <el-breadcrumb-item
          v-if="item.to"
          :key="index"
          :to="item.to"
          :replace="true"
        >
          {{ item.name }}
        </el-breadcrumb-item
        >
        <el-breadcrumb-item v-else :key="item.name">
          {{
            item.name
          }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped>
.el-breadcrumb {
  margin-left: 4px;
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 16px;
}
//右边的新增面包屑
.breadcrumb-other {
  position: fixed;
  top: 60px;
  left: 390px;
  margin-left: 0px;
  margin-bottom: 0px;
  font-size: 12px;
  line-height: 16px;
}
</style>
