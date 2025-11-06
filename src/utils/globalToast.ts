import { useToast } from 'wot-design-uni'

let toastInstance: ReturnType<typeof useToast> | null = null

export function setToastInstance() {
  toastInstance = useToast()
}

export const showToast = () => toastInstance
