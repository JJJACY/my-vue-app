<script setup lang="ts">
import { reactive, ref, withDefaults } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';

interface Login {
  user: string,
  password: string
}

interface Likeprops {
  href?: string,
  types?: object,
  disabled?: boolean,
}
const props = withDefaults(defineProps<Likeprops>(), {
  href: 'zzz',
  types: () => { return { name: 1000 } },
  disabled: false
})

console.log(props)

const user = useUserStore()
const router = useRouter()
const form = ref()
const formData = reactive({ name: '', password: '' })
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: true }],
  password: [{ required: true, message: '请输入密码', trigger: true }]
}


const handleSubmit = () => {
  form.value?.validate(async (valid) => {
    if (valid) {
      const userInfo: Login = {
        user: formData.name, password: formData.password
      }
      console.log(userInfo)
      // await user.login()
      router.push({ path: '/home'})
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
  ...storeToRefs(user),
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
          <el-input placeholder="请输入姓名" v-model="formData.name"></el-input>
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding-top: 150px;
  padding-right: 60px;
}
</style>
