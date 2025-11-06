<script lang="ts" setup>
import { safeAreaInsets } from '@/utils/systemInfo'

defineOptions({
  name: 'Home',
})
definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})
</script>

<template>
  <view class="bg-white px-4 pt-2" :style="{ marginTop: `${safeAreaInsets?.top}px` }" />
</template>
