<script setup>
import { computed } from 'vue';
defineProps({
  svgClass: {
    type: String
  },
  svgName: {
    type: String,
    required: true
  }
})
const iconName = computed(() =>
  `#icon-${props.svgName}`
)
defineExpose({
  iconName
})
</script>
<template>
  <svg class="svg-icon" :class="svgClass">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<style type="text/css" lang="less" scoped></style>
