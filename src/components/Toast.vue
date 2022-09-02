<script setup>
import { ref } from 'vue'
const openToast = ref(false)
defineExpose({
  openToast
})
</script>
<template>
  <button class="openBtn" @click="openToast = true">开</button>
  <teleport to="body">
    <Transition :duration="500">
      <div v-if="openToast" class="toast-container">
        <button class="close-button" @click="openToast = false">关</button>
      </div>
    </Transition>
  </teleport>
</template>
<style type="text/css" lang="less" scoped>
.toast-container {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  z-index: 999;
}

.close-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
