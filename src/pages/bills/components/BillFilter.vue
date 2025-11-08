<script lang="ts" setup>
import { http } from '@/http/http'
import { formatTime, getDate } from '@/utils/time-funs'

const { incomes, expenses, time } = defineProps<{
  incomes: number
  expenses: number
  time: number
}>()
const emits = defineEmits<{
  changeTime: [time: number]
}>()

// 粘性高度
const filterTop = ref(0)
onMounted(() => {
  if (process.env.UNI_PLATFORM === 'h5') {
    filterTop.value = 52
  }
  else {
    const { statusBarHeight } = uni.getSystemInfoSync()
    const { top, height } = uni.getMenuButtonBoundingClientRect()
    const navBarHeight = (top - statusBarHeight) * 2 + height
    filterTop.value = statusBarHeight + navBarHeight
  }
})

// 筛选日期
const show = ref(false)
const timeCache = ref(new Date().getTime())
function handleCancel() {
  show.value = false
  setTimeout(() => {
    timeCache.value = time
  }, 100)
}
function handleChangeTime() {
  show.value = false
  emits('changeTime', timeCache.value)
}

// 控制只出现存在数据的日期
const dates = ref([])
onShow(() => {
  http.get<string[]>('bills/dates').then((res) => {
    const uniqueMonths = Array.from(
      new Set(
        res.data.map(date => date.slice(0, 7)), // 截取前 7 位（YYYY-MM）
      ),
    )
    dates.value = uniqueMonths
  })
})
function formatter(v, value) {
  const [year, month] = formatTime(new Date().getTime(), 'YYYY-MM').split('-')
  if (v === 'year') {
    const yearDates = dates.value.map(item => item.slice(0, 4))
    return [...yearDates, year].includes(value) ? value : ''
  }
  if (v === 'month') {
    const monthDates = dates.value.map(item => item.slice(5, 7))
    return [...monthDates, month].includes(value) ? value : ''
  }
}
</script>

<template>
  <view class="bg-app sticky z-100 px-24rpx" :style="{ top: `${filterTop}px` }">
    <view
      class="flex items-center justify-end gap-16rpx rounded-[16rpx] bg-blue-5 p-24rpx color-white"
      @click="show = true"
    >
      <view class="flex flex-1 items-center gap-32rpx text-26rpx">
        <view>收入: {{ incomes }}</view>
        <view>支出: {{ expenses }}</view>
      </view>
      <wd-divider color="white" vertical />
      <view class="flex items-center justify-end gap-14rpx">
        <view class="text-32rpx fw-bold">
          {{ getDate(time).getFullYear() }}
        </view>
        <view class="text-26rpx">
          年
        </view>
        <view class="text-32rpx fw-bold">
          {{ getDate(time).getMonth() + 1 }}
        </view>
        <view class="text-26rpx">
          月
        </view>
        <wd-icon custom-class="mr-12rpx" name="filter1" size="18px" />
      </view>
    </view>
  </view>

  <!-- 选择日期 -->
  <wd-popup v-model="show" position="bottom" @close="handleCancel">
    <view class="flex items-center justify-between px-32rpx py-24rpx text-28rpx color-gray-5">
      <view @click="handleCancel">
        取消
      </view>
      <view class="text-32rpx color-black fw-bold">
        日期
      </view>
      <view @click="handleChangeTime">
        确定
      </view>
    </view>
    <wd-datetime-picker-view
      v-model="timeCache"
      type="year-month"
      :max-date="new Date().getTime()"
      :formatter="formatter"
      label="年月"
    />
  </wd-popup>
</template>
