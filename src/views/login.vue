<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const form = ref(null)
const formData = reactive({ name: '', password: '' })
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: true }],
  password: [{ required: true, message: '请输入密码', trigger: true}]
}


const handleSubmit = () => {
  form.value.validate((valid)=>{
    if(valid) { 
      router.push({ path: '/'})
    } else {
      console.log('error submit')
      return false
    }
  })
}

const handleReset = () => {
  formData.name = ''
  formData.password = ''
}

defineExpose({
  form,
  formData,
  rules,
  handleSubmit,
  handleReset
})
</script>
<template>
  <div class="page-login">
    <div class="login-form">
      <h3> protect animal</h3>
      <el-form ref="form" :model="formData" :rules="rules">
        <el-form-item prop="name" label="姓名">
          <el-input placeholder="请输入姓名" v-model="formData.name" ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input placeholder="请输入密码" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
          <el-button @click="handleReset">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style type="text/css" lang="less" scoped>
.page-login {
  height: 100%;
  background: no-repeat center / 100% url("./../assets/comment/login.png");
}

h3 {
  margin-bottom: 30px;
  color: #ffffff;
  font-size: 30px;
}

.login-form {
  width: 380px;
  height: 100%;
  float: right;
  padding-top: 200px;
  padding-right: 20px;
}
</style>
