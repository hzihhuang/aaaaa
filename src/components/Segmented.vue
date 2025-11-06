<script lang="ts" generic="T" setup>
const { list } = defineProps<{
  list: { value: T, label?: string }[]
}>()
const value = defineModel<T>()
</script>

<template>
  <view class="my-segmented bg-white">
    <view
      v-for="i in list"
      :key="i.value as any"
      :class="`my-segmented-item transition ${value === i.value ? 'bg-[var(--app-primary-color)] color-white' : 'color-[#333]'}`"
      @click="value = i.value"
    >
      {{ i.label ?? i.value }}
    </view>
  </view>
</template>

<style lange="scss">
.my-segmented {
  display: flex;
  padding: 8rpx;
  border: 2rpx solid rgba(0, 0, 0, 0.1);
  border-radius: 16rpx;
}
.my-segmented .my-segmented-item {
  flex: 1;
  padding: 16rpx;
  font-size: 28rpx;
  text-align: center;
  cursor: pointer;
  border-radius: 12rpx;
  transition: all 0.3s ease;
}
</style>
