export function useBillDate() {
  const DEFAULT_DATE = new Date().getTime()
  const showDate = ref(false)
  const cacheDate = ref(DEFAULT_DATE)
  const billDate = ref(DEFAULT_DATE)
  const handleDateChange = (e: any) => {
    if (typeof e === 'string') {
      showDate.value = false
      billDate.value = cacheDate.value
    }
    else {
      cacheDate.value = e.value
    }
  }

  const handleCancel = () => {
    billDate.value = DEFAULT_DATE
    cacheDate.value = DEFAULT_DATE
  }

  return {
    DEFAULT_DATE,
    showDate,
    handleCancel,
    handleDateChange,
    billDate,
    cacheDate,
  }
}
