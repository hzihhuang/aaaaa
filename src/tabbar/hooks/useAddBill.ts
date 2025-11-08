import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { http } from '@/http/http'

export interface ITag {
  id: number
  name: string
  img: string
  type: IAccountingTypeEnum
}
export enum IAccountingTypeEnum {
  expense = 'expense',
  income = 'income',
}

/**
 * 增加账单能力
 */
export function useAddBill(show: Ref<boolean>) {
  const tags = ref<ITag[]>([])
  const currentType = ref<IAccountingTypeEnum>(IAccountingTypeEnum.expense)
  const useTags = computed(() => {
    switch (currentType.value) {
      case IAccountingTypeEnum.expense:
        return tags.value.filter(i => i.type === IAccountingTypeEnum.expense)
      case IAccountingTypeEnum.income:
        return tags.value.filter(i => i.type === IAccountingTypeEnum.income)
      default:
        return tags.value
    }
  })

  const activeTagId = ref()
  const price = ref(0)
  const date = ref(new Date().getTime())

  const handleSwitchTag = (id: number) => {
    activeTagId.value = id
  }
  const handleCloseAddBill = () => {
    show.value = false
  }
  const handleSubmitAddBill = () => {
    console.log(activeTagId.value)
  }

  onShow(() => {
    http.get<{ data: ITag[] }>('/category').then((res) => {
      tags.value = res.data
    })
  })

  return {
    useTags,
    activeTagId,
    price,
    date,
    currentType,
    handleCloseAddBill,
    handleSubmitAddBill,
    handleSwitchTag,
  }
}
