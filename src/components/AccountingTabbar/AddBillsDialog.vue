<script lang="ts" setup>
import { formatTime, isSameDay } from '@/utils/time-funs'
import Segmented from '../Segmented.vue'
import { IAccountingTypeEnum, useAddBill, useBillDate } from './hook'

const list = [
  {
    label: '支出',
    value: IAccountingTypeEnum.expense,
  },
  {
    label: '收入',
    value: IAccountingTypeEnum.income,
  },
]

const show = defineModel<boolean>()
// 添加账单功能
const {
  activeTagId,
  price,
  date,
  useTags,
  currentType,
  handleCloseAddBill,
  handleSubmitAddBill,
  handleSwitchTag,
} = useAddBill(show)

const { DEFAULT_DATE, billDate, cacheDate, showDate, handleDateChange } = useBillDate()
</script>

<template>
  <!-- 添加标签 -->
  <wd-popup
    v-model="show"
    custom-class="add-tag-popup"
    position="bottom"
    lock-scroll
    closable
    :safe-area-inset-bottom="true"
    @close="handleCloseAddBill"
  >
    <view class="flex flex-col gap-32rpx p-24rpx">
      <view class="text-32rpx color-[#2D3748] fw-600">
        新增账单
      </view>
      <Segmented v-model="currentType" :list="list" />
      <wd-input
        class="add-bills-dialog-input"
        type="number"
        placeholder="¥0.00"
        inputmode="numeric"
      />
      <wd-button size="large" :round="false" @click="handleSubmitAddBill">
        保存
      </wd-button>
      <wd-button
        custom-class="flex items-center gap-8rpx w-160rpx"
        plain
        size="small"
        icon="time-filled"
        @click="showDate = true"
      >
        {{ isSameDay(DEFAULT_DATE, billDate) ? '今天' : formatTime(billDate, 'YY/MM/DD') }}
      </wd-button>
    </view>
    <scroll-view class="flex-1" scroll-anchoring scroll-with-animation scroll-y show-scrollbar>
      <view class="tags grid grid-cols-5 w-fit" :style="{ justifySelf: 'center' }">
        <view
          v-for="i in useTags"
          :key="i.id"
          :class="`tags-item flex flex-col items-center gap-8rpx ${i.id === activeTagId ? 'active' : ''}`"
          @click="handleSwitchTag(i.id)"
        >
          <view
            class="tags-item-icon h-110rpx w-110rpx flex items-center justify-center rounded-full bg-gray-1 p-18rpx"
          >
            <image class="h-full w-full" :src="i.img" />
          </view>
          <view class="tags-item-text fs-28 color-gray-5">
            {{ i.name }}
          </view>
        </view>
      </view>
    </scroll-view>
  </wd-popup>

  <!-- 日期 -->
  <wd-action-sheet v-model="showDate" title="选择日期" @close="billDate = DEFAULT_DATE">
    <wd-calendar-view v-model="cacheDate" @change="handleDateChange" />
    <view class="mt-48 flex px-48">
      <wd-button class="flex-1" type="primary" @click="handleDateChange('submit')">
        确定
      </wd-button>
    </view>
  </wd-action-sheet>
</template>

<style lang="scss" scoped>
.add-tag-popup {
  z-index: 100;
  display: flex;
  flex-direction: column;
  height: 80vh;

  // 金额输入框
  .add-bills-dialog-input {
    padding: 30rpx;
    input {
      font-size: 48rpx;
      text-align: center;
    }
  }

  // 标签
  .tags {
    gap: 24rpx 32rpx;
    padding: 32rpx 0;
    margin: 0 auto;

    .tags-item {
      &.active {
        .tags-item-icon {
          background-color: #4d80f0;

          .tags-item-img {
            filter: invert(1);
          }
        }
        .tags-item-text {
          color: #4d80f0;
        }
      }
    }
  }
}
</style>
