<script lang="ts" setup>
import AddBillsDialog from './AddBillsDialog.vue'
import { useTabbar } from './hook'

// 核心切换 tabbar 能力
const show = ref(false)
const list = defineModel([])
const { currentTabbar, selectTabBar, tabbarList } = useTabbar(() => {
  show.value = true
})

const TabbarIcons = {
  home: 'i-carbon-home',
  chart: 'i-carbon-chart-line-smooth',
  list: 'i-carbon-list',
  user: 'i-carbon-user',
  add: 'i-carbon-add',
}
</script>

<template>
  <wd-tabbar
    custom-class="accounting-tabbar"
    shape="round"
    :model-value="currentTabbar"
    bordered safe-area-inset-bottom placeholder fixed
    @change="selectTabBar"
  >
    <wd-tabbar-item
      v-for="i in list"
      :key="i.name"
      :custom-class="`tabbar-item-${i.name}`"
      :name="i.name"
      :title="i.text"
    >
      <template #icon>
        <view
          :class="`mb-4rpx ${i.name === 'add' ? 'color-white text-64rpx' : currentTabbar === i.name ? 'color-[var(--app-primary-color)]' : 'color-gray-700'}`"
        >
          <text :class="TabbarIcons[i.icon]" />
        </view>
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
  <AddBillsDialog v-model="show" />
</template>

<style scoped lang="scss">
.accounting-tabbar {
  .tabbar-item-add {
    flex: unset;
    width: 100rpx;
    height: 100rpx;
    color: white;
    background-color: var(--wot-color-theme);
    border-radius: 999px;
    transform: translateY(-30%);
    --wot-tabbar-inactive-color: white;
  }
  .wd-tabbar__placeholder {
    box-sizing: content-box;
    padding-bottom: calc(env(safe-area-inset-bottom) + 64rpx) !important;
  }
}
</style>
