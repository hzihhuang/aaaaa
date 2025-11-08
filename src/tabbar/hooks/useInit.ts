import { customTabbarEnable, needHideNativeTabbar } from '../config'

function useInit() {
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
}

export default useInit
