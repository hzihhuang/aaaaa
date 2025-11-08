<script setup lang="ts">
definePage({
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

const statusBarOption = reactive({
  statusBarHeight: 0,
})
onShow(() => {
  if (process.env.UNI_PLATFORM === 'h5') {
    Object.assign(statusBarOption, {
      statusBarHeight: 0,
    })
  }
  else {
    const { statusBarHeight } = uni.getSystemInfoSync()
    statusBarOption.statusBarHeight = statusBarHeight
  }
})
</script>

<template>
  <view
    class="page-header p-24rpx"
    :style="{
      paddingTop: `${statusBarOption.statusBarHeight === 0 ? '24rpx' : `${statusBarOption.statusBarHeight}px`}`,
    }"
  >
    <view>记账本</view>
    <view class="home-header-budget flex text-center">
      <div class="flex-1">
        <div class="text-28rpx color-[#718096]">
          本月支出
        </div>
        <div class="mt-10rpx text-40rpx color-[#E53E3E] fw-600">
          ¥3500
        </div>
      </div>
      <div class="flex-1">
        <div class="text-28rpx color-[#718096]">
          本月收入
        </div>
        <div class="mt-10rpx text-40rpx color-[#48BB78] fw-600">
          ¥8000
        </div>
      </div>
      <div class="flex-1">
        <div class="text-28rpx color-[#718096]">
          结余
        </div>
        <div class="mt-10rpx text-40rpx color-[#2D3748] fw-600">
          ¥4500
        </div>
      </div>
    </view>
    <view class="home-header-budget">
      <view class="mb-20rpx">
        本月预算剩余
      </view>
      <wd-progress custom-class="h-16rpx" :percentage="30" hide-text />
      <view class="mt-20rpx flex justify-between">
        <text>已使用: ¥3,500</text>
        <text>总预算: ¥5,000</text>
      </view>
    </view>
  </view>
  <view class="px-24rpx">
    <view v-for="item in 24" :key="item" class="home-transaction-item">
      <view
        class="mr-30rpx h-80rpx w-80rpx flex items-center justify-center rounded-[40rpx] bg-[#eef4fc] color-[#4299e1]"
      />
      <view class="flex-1">
        <view class="mb-8rpx flex items-center gap-16rpx">
          <view class="text-28rpx color-[#2D3748] fw-500">
            午餐
          </view>
          <view class="rounded-20rpx bg-[#eef4fc] px-16rpx py-4rpx text-24rpx color-[#4299e1]">
            餐饮
          </view>
        </view>
        <view class="text-24rpx color-[#718096]">
          今天 12:30
        </view>
      </view>
      <!-- <view class="text-28rpx fw-500 color-[#E53E3E]">-¥35</view> -->
      <view class="text-28rpx color-[#48BB78] fw-500">
        +¥3000
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.home-header-budget {
  --wot-progress-height: 16rpx;
  padding: 30rpx;
  margin-top: 30rpx;
  font-size: 28rpx;
  color: #718096;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.home-transaction-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  margin-top: 20rpx;
  border-radius: 24rpx;
  transition: transform 0.2s ease;
}
</style>
