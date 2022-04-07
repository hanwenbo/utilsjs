import { show } from './show'
import { ModalProps } from './index'
import { ReactNode } from 'react'
import merge from "deepmerge";

export type ModalAlertProps = Omit<
  ModalProps,
  'visible' | 'closeOnAction' | 'actions'
  > & {
  confirmText?: ReactNode
  onConfirm?: () => void | Promise<void>
}

export function alert(p: ModalAlertProps) {
  const defaultProps = {
    confirmText: '我知道了',
  }
  const props = merge(defaultProps, p)
  return new Promise<void>(resolve => {
    show({
      ...props,
      closeOnAction: true,
      actions: [
        {
          key: 'confirm',
          text: props?.confirmText,
          primary: true,
        },
      ],
      onAction: props?.onConfirm,
      onClose: () => {
        props.onClose?.()
        resolve()
      },
    })
  })
}
