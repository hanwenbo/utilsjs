import {show} from './show'
import {ModalProps} from './index'
import {ReactNode} from 'react'
import merge from "deepmerge";

export type ModalConfirmProps = Omit<ModalProps,
  'visible' | 'closeOnAction' | 'actions'> & {
  confirmText?: ReactNode
  cancelText?: ReactNode
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

const defaultProps = {
  confirmText: '确认',
  cancelText: '取消',
}

export function confirm(p: ModalConfirmProps) {
  let props = merge(defaultProps,
    {
      confirmText: "确认",
      cancelText: "取消",
    },
  )
  props = merge(props, p)
  return new Promise<boolean>(resolve => {
    show({
      ...props,
      closeOnAction: true,
      onClose: () => {
        props?.onClose?.()
        resolve(false)
      },
      actions: [
        {
          key: 'confirm',
          text: props.confirmText,
          primary: true,
          onClick: async () => {
            await props?.onConfirm?.()
            resolve(true)
          },
        },
        {
          key: 'cancel',
          text: props.cancelText,
          onClick: async () => {
            await props?.onCancel?.()
            resolve(false)
          },
        },
      ],
    })
  })
}