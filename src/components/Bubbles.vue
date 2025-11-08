<script lang="ts" generic="T" setup>
const { list } = defineProps<{
  list: {
    label: string
    value: T
    start: string
    end: string
  }[]
}>()
const value = defineModel<T>()
</script>

<template>
  <view class="flex gap-16rpx overflow-auto">
    <view
      v-for="i in list"
      :key="i.value as any"
      :class="`bubble-item ${i.value === value ? 'active' : ''}`"
      @click="value = i.value"
    >
      {{ i.label }}
    </view>
  </view>
</template>

<style lang="scss">
.bubble-item {
  flex-shrink: 0;
  padding: 12rpx 24rpx;
  font-size: 28rpx;
  white-space: nowrap;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.7);
  border: 2rpx solid rgba(0, 0, 0, 0.1);
  border-radius: 999rpx;

  &.active {
    color: white;
    background: #4299e1;
    border-color: #4299e1;
  }
}
</style>
