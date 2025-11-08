<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { http } from '@/http/http'
import { useTokenStore } from '@/store'
import { showToast } from '@/utils/globalToast'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '注册',
  },
})

const { login } = useTokenStore()

const registerUser = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})
const formRef = ref()
function handleRegister() {
  formRef.value.validate().then(({ valid }) => {
    if (valid) {
      showToast().loading('注册中')
      http.post('user/register', {
        username: registerUser.username,
        password: registerUser.password,
      })
        .then((res) => {
          if (res.code === 200) {
            showToast().success('注册成功, 1秒后自动登录')
            setTimeout(() => {
              login({
                username: registerUser.username,
                password: registerUser.password,
              })
            }, 1000)
          }
        })
        .catch((err) => {
          showToast().error(err.message)
        })
    }
  })
}
function handleBack() {
  return getCurrentPages().length > 1 ? uni.navigateBack() : uni.redirectTo({ url: '/pages-fg/login' })
}
</script>

<template>
  <view class="mb-48 flex flex-col items-center gap-32 pt-180">
    <wd-img
      width="224rpx"
      height="224rpx"
      radius="100%"
      src="https://nest.nodejs.cn/assets/logo-small-gradient.svg"
    />
    <view class="fs-48 fw-bold">
      记账本
    </view>
  </view>
  <view class="px-64">
    <wd-form ref="formRef" :model="registerUser">
      <wd-input
        v-model="registerUser.username"
        prefix-icon="user"
        prop="username"
        clearable
        :rules="[
          { required: false, pattern: /^[\s\S]{4,20}$/, message: '用户名必须在 4-20 个字符之间' },
        ]"
        placeholder="用户名"
      />
      <wd-input
        v-model="registerUser.password"
        class="mt-40"
        prefix-icon="lock-on"
        prop="password"
        show-password
        clearable
        :rules="[
          {
            required: false,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,32}$/,
            message: '密码必须包含字母和数字，且长度为 6-32 个字符',
          },
        ]"
        placeholder="设置密码"
      />
      <wd-input
        v-model="registerUser.confirmPassword"
        class="mt-40"
        prefix-icon="lock-on"
        prop="confirmPassword"
        show-password
        clearable
        :rules="[
          {
            required: false,
            validator: (value) => value === registerUser.password,
            message: '两次输入的密码不一致',
          },
        ]"
        placeholder="确认密码"
      />
      <wd-button
        class="mt-50"
        size="large"
        :round="false"
        type="primary"
        block
        @click="handleRegister"
      >
        注册
      </wd-button>
      <view class="fs-28 mt-40 text-center">
        还没有账号？
        <text class="color-primary" @click="handleBack">返回登录</text>
      </view>
    </wd-form>
  </view>
</template>

<style lang="scss" scoped></style>
