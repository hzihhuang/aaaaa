import type { BillInter } from '@/typings/bills'
import { http } from '@/http/http'

interface billsApiRes {
  list: BillInter[]
  currentPage: number
  pageSize: number
  total: number
  totalPage: number
}

export const getBillsApi = params => http.get<billsApiRes>('/bills', params)

export const deleteBillApi = (id: number) => http.delete('/bills', id)

export const getCategory = () => http.get('/category')
