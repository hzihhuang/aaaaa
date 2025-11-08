<script setup lang="ts">
import { computed, ref } from 'vue'
import AddBillsDialog from './components/AddBillsDialog.vue'
import { customTabbarEnable, customTabbarList, tabbarCacheEnable } from './config'
import useInit from './hooks/useInit'
import { tabbarList, tabbarStore } from './store'

defineOptions({
  virtualHost: true,
})

const TabbarIcons = {
  home: 'i-carbon-home',
  chart: 'i-carbon-chart-line-smooth',
  list: 'i-carbon-list',
  user: 'i-carbon-user',
  add: 'i-carbon-add',
}
useInit()
const showBulge = ref(false)
function handleClick(e: { value: string }) {
  const oldItem = tabbarList[tabbarStore.curIdx]
  const item = tabbarList.find(item => item.name === e.value)
  if (e.value === oldItem.name) {
    return
  }
  if (item.isBulge) {
    showBulge.value = true
    return
  }
  const url = item.pagePath
  tabbarStore.setCurIdx(tabbarList.findIndex(item => item.name === e.value))
  if (tabbarCacheEnable) {
    uni.switchTab({ url })
  }
  else {
    uni.navigateTo({ url })
  }
}
const curTab = computed(() => tabbarList[tabbarStore.curIdx].name)
</script>

<template>
  <wd-tabbar
    v-if="customTabbarEnable"
    custom-class="accounting-tabbar"
    shape="round"
    :model-value="curTab"
    bordered
    safe-area-inset-bottom
    placeholder
    fixed
    @change="handleClick"
  >
    <wd-tabbar-item
      v-for="i in customTabbarList"
      :key="i.name"
      :custom-class="`tabbar-item-${i.name}`"
      :name="i.name"
      :title="i.text"
    >
      <template #icon>
        <view
          v-if="i.isBulge"
          class="mb-4rpx text-64rpx color-white"
        >
          <text :class="TabbarIcons[i.name]" />
        </view>
        <view
          v-else
          :class="`mb-4rpx ${curTab === i.name ? 'color-[var(--app-primary-color)]' : 'color-gray-700'}`"
        >
          <text :class="TabbarIcons[i.name]" />
        </view>
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
  <AddBillsDialog
    v-if="customTabbarEnable"
    v-model="showBulge"
  />
</template>
