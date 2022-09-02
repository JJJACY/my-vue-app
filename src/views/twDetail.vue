<script setup>
import Toast from '../components/Toast.vue'

// for (var i = 0; i < 5; i++) {
//   (function() {
//     setTimeout(function() {
//       console.log(i);
//     }, i * 1000);
//   })(i);
// }

defineExpose({
  Toast
})

</script>
<template>
  <div class="page-tw">
    <div class="outbox">
      <div class="innerbox">
        <Toast />
      </div>
    </div>
  </div>
</template>
<style type="text/css" lang="less" scoped>
.page-tw {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.outbox {
  position: relative;
  height: 400px;
  width: 400px;
  margin: 0 auto;
  background: #000;
}

.innerbox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
  margin: auto;
  background: #ffffff;
}
</style>
