<script setup lang="ts">
import AccountingTabbar from '@/components/AccountingTabbar/index.vue'
import { customTabbarEnable, customTabbarList, needHideNativeTabbar } from './config'

// #ifdef MP-WEIXIN
// 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
defineOptions({
  virtualHost: true,
})
onLoad(() => {
  needHideNativeTabbar
  && uni.hideTabBar()
})
// 解决支付宝自定义tabbar 未隐藏导致有2个 tabBar 的问题; 注意支付宝很特别，需要在 onMounted 钩子调用
// 另外，支付宝里面，只要是 customTabbar 都需要隐藏
onMounted(() => {
  customTabbarEnable
  && uni.hideTabBar()
})
</script>

<template>
  <AccountingTabbar v-if="customTabbarEnable" v-model="customTabbarList" />
</template>
