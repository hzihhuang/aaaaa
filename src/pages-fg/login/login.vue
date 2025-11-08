<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { useTokenStore, useUserStore } from '@/store'
import { showToast } from '@/utils/globalToast'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '登录',
  },
})

const { userInfo } = storeToRefs(useUserStore())
const { login } = useTokenStore()

const user = reactive({
  username: 'hzihhuang',
  password: 'a123456789',
})
const formRef = ref()
function handleLogin() {
  formRef.value.validate().then(({ valid }) => {
    if (valid) {
      showToast().loading('登录中')
      login(user).then(() => {
        uni.switchTab({ url: '/pages/home/index' })
      })
    }
  })
}

function handleGoRegister() {
  uni.navigateTo({
    url: '/pages-fg/register',
    animationType: 'slide-in-right', // 从右侧滑入
    animationDuration: 300, // 动画持续时间（单位：ms）
  })
}

onShow(() => {
  if (userInfo.value.id !== -1) {
    uni.switchTab({ url: '/pages/home/index' })
  }
})
</script>

<template>
  <view class="mb-48rpx flex flex-col items-center gap-32rpx pt-180rpx">
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
  <view class="px-64rpx">
    <wd-form ref="formRef" :model="user">
      <wd-input
        v-model="user.username"
        custom-class="py-8rpx px-24rpx"
        prefix-icon="user"
        prop="username"
        clearable
        :rules="[
          { required: false, pattern: /^[\s\S]{4,20}$/, message: '用户名必须在 4-20 个字符之间' },
        ]"
        placeholder="用户名"
      />
      <wd-input
        v-model="user.password"
        custom-class="mt-40rpx py-8rpx px-24rpx"
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
        placeholder="密码"
      />
      <wd-button
        custom-class="mt-50rpx"
        size="large"
        type="primary"
        :round="false"
        block
        @click="handleLogin"
      >
        登录
      </wd-button>
      <view class="mt-40rpx text-center text-28rpx">
        还没有账号？
        <text class="color-blue-500" @click="handleGoRegister">立即注册</text>
      </view>
    </wd-form>
  </view>
</template>
