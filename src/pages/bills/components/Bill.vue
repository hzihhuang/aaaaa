<script lang="ts" setup>
import type { BillInter } from '@/typings/bills'

const { date, list } = defineProps<{
  date: string
  list: BillInter[]
}>()
const emits = defineEmits<{
  delete: [id: number]
  detail: [id: number]
}>()

// 格式化日期
const dateString = computed(() => {
  const currentDate = new Date(date)
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const dayOfWeek = currentDate.getDay()
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${month}月${day}日 星期${weekdays[dayOfWeek]}`
})

// 计算总收入 和 总支出
const [totalIncome, totalExpense] = computed(() => {
  let income = 0
  let expense = 0
  for (const item of list) {
    if (item.category.type === 'income')
      income += item.price
    if (item.category.type === 'expense')
      expense += item.price
  }
  return [income, expense]
}).value
</script>

<template>
  <wd-card custom-class="bill-card shadow-lg">
    <view class="fs-24 flex items-center justify-between px-32 pb-20 pt-32 color-gray-4">
      <view>{{ dateString }}</view>
      <view class="flex items-center gap-24">
        <view v-show="totalIncome > 0">
          收入: {{ totalIncome }}
        </view>
        <view v-show="totalExpense > 0">
          支出: {{ totalExpense }}
        </view>
      </view>
    </view>
    <wd-swipe-action v-for="item in list" :key="item.id">
      <view
        class="bill-item relative flex items-center justify-between px-32 py-16 active:bg-gray-1"
        @click="emits('detail', item.id)"
      >
        <view
          class="mr-24 h-64 w-64 flex items-center justify-center overflow-hidden rounded-full bg-gray-1 p-12"
        >
          <image :src="item.category.img" class="h-full w-full" />
        </view>
        <view class="bill-item-right flex flex-1 items-center justify-between color-gray-5">
          <view class="fs-24">
            {{ item.remark ?? item.category.name }}
          </view>
          <view class="fs-28">
            {{ item.price }}
          </view>
        </view>
      </view>
      <template #right>
        <view
          class="fs-28 ml-1 h-full w-120 flex items-center justify-center bg-red-5 color-white"
          @click="emits('delete', item.id)"
        >
          删除
        </view>
      </template>
    </wd-swipe-action>
  </wd-card>
</template>
