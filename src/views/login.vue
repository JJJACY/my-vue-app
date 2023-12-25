<script setup lang="ts">
import { reactive, ref, withDefaults, toRef, toRefs} from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import type { FormInstance, FormRules } from 'element-plus'

interface Login {
  name: string,
  userPhone: string
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
const formData = reactive({ name: '', userPhone: '' })
const rules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: true }],
  userPhone: [{ required: true, message: '请输入密码', trigger: true }]
})

const person = reactive({
  name: '张三',
  age: 18,
  job: {
    j1: {
      salary: 20
    }
  }
})
const name1 = toRef(person,'name')
const name2 = ref(person.name)
console.log(name2.value)
console.log(name1.value)
name2.value = 'John'
console.log(name2.value)
const { name,age,job } = toRefs(person)
name.value = '李四'
console.log(name1.value,name.value,age.value,job.value)

const handleSubmit = () => {
  form.value?.validate(async (valid: FormInstance) => {
    if (valid) {
      const userInfo: Login = {
        name: formData.name, userPhone: formData.userPhone
      }
      await user.login(userInfo.name, userInfo.userPhone)
      router.push({ path: '/home' })
    } else {
      console.log('error submit')
      return false
    }
  })
}

const handleReset = () => {
  formData.name = ''
  formData.userPhone = ''
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
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="formData.userPhone" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
          <el-button @click="handleReset">取消</el-button>
        </el-form-item>
      </el-form>
      <div class="test" :style="{color: 'white'}">{{ name }}---{{ age }}---{{ person.age }}</div>
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
