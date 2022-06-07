import React, {FC, ReactNode, useState} from 'react'
import {useUnmountedRef} from 'ahooks'
import Mask from '../mask'
import {Action, ModalActionButton} from './modal-action-button'
import Space from '../space'
import {
  GetContainer,
  renderToContainer,
} from '../../utils/render-to-container'
import {
  PropagationEvent,
  withStopPropagation,
} from '../../utils/with-stop-propagation'
import AutoCenter from '../auto-center'
import {useSpring, animated} from '@react-spring/web'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {CloseOutline} from 'antd-mobile-icons'
import merge from "deepmerge";
// @ts-ignore
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native-web'

export type ModalProps = {
  afterClose?: () => void
  afterShow?: () => void
  image?: string
  header?: ReactNode
  title?: ReactNode
  content?: ReactNode
  actions?: Action[]
  onAction?: (action: Action, index: number) => void | Promise<void>
  closeOnAction?: boolean
  onClose?: () => void
  closeOnMaskClick?: boolean
  visible?: boolean
  getContainer?: GetContainer
  bodyStyle?: React.CSSProperties
  maskStyle?: React.CSSProperties
  maskClassName?: string
  stopPropagation?: PropagationEvent[]
  showCloseButton?: boolean
  disableBodyScroll?: boolean
} & NativeProps

const defaultProps = {
  visible: false,
  actions: [] as Action[],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ['click'],
  showCloseButton: false,
  getContainer: null,
  disableBodyScroll: true,
}

export const Modal: FC<ModalProps> = p => {
  const props = merge(defaultProps, p)

  const unmountedRef = useUnmountedRef()
  const style = useSpring({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 1.2,
      tension: 200,
      friction: 25,
      clamp: true,
    },
    onStart: () => {
      setActive(true)
    },
    onRest: () => {
      if (unmountedRef.current) return
      setActive(props.visible)
      if (props.visible) {
        props.afterShow?.()
      } else {
        props.afterClose?.()
      }
    },
  })

  const [active, setActive] = useState(props.visible)

  const withImageStyle = props.image ? {paddingTop: 0} : {}
  const noTop = !props.header && !props.title && !props.image
  const noTopContentStyle = noTop ? {marginTop: 20,} : {}
  const footerStyle = props.actions.length === 0 && {padding: 10, height: 8}
  const notPrimaryButton = props.actions.filter(item => !!item.primary).length === 0 ? {
    paddingVertical: 0,
    paddingTop: 15,
    paddingBottom: 0
  } : {}
  const body = (
    <View
      style={[styles.body, withImageStyle,  props.bodyStyle]}
    >
      {props.showCloseButton && (
        <TouchableOpacity onPress={props.onClose} style={styles.closeWrap}>
          <CloseOutline />
        </TouchableOpacity>
      )}
      {!!props.image && (
        <View style={styles.imageContainer}>
          <Image source={props.image} style={{
            width: '75vw',
            height: 200
          }} />
        </View>
      )}
      {!!props.header && (
        <View style={styles.header}>
          <AutoCenter>{props.header}</AutoCenter>
        </View>
      )}
      {!!props.title && <Text style={styles.title}>{props.title}</Text>}
      <View
        style={[styles.content, noTopContentStyle, !props.content ? styles.contentEmpty : null]}
      >
        {typeof props.content === 'string' ? (
          <AutoCenter><Text style={styles.contentText}>{props.content}</Text></AutoCenter>
        ) : (
          props.content
        )}
      </View>
      <View style={[styles.footer, footerStyle,notPrimaryButton]}>
        <Space vertical>
          {props.actions.map((action, index) => {
            return (
              <ModalActionButton
                key={action.key}
                action={action}
                onAction={async () => {
                  await Promise.all([
                    action.onPress?.(),
                    props.onAction?.(action, index),
                  ])
                  if (props.closeOnAction) {
                    props.onClose?.()
                  }
                }}
              />
            )
          })}
        </Space>
      </View>
    </View>
  )

  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <div
        style={{
          display: active ? 'flex' : 'none',
        }}
      >
        <Mask
          visible={props.visible}
          onMaskClick={props.closeOnMaskClick ? props.onClose : undefined}
          disableBodyScroll={props.disableBodyScroll}
        >
          <View
            style={[styles.wrap, {
              pointerEvents: props.visible ? 'flex' : 'none',
            }]}
          >
            <animated.div style={style}>{body}</animated.div>
          </View>
        </Mask>
      </div>
    )
  )

  return renderToContainer(props.getContainer, node)
}

const styles = StyleSheet.create({
  main: {},
  wrap: {
    position: "fixed",
    zIndex: 1,
    top: "50%",
    left: "50%",
    width: "auto",
    minWidth: 280,
    maxWidth: "75vw",
    transform: "translate(-50%,-50%)",
  },
  body: {
    width: "100%",
    maxHeight: "70vh",
    fontSize: 14,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "column",
  },
  header: {},
  footer: {
    padding: 15
  },
  title: {
    paddingVertical: 12,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 25,
    textAlign: "center",
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 0,
    maxHeight: "40vh",
    overflowX: "hidden",
    overflowY: "auto",
  },
  contentText: {
    fontSize: 15,
    color: "#333",
  },
  contentEmpty: {
    padding: 0,
    height: 12,
  },
  closeWrap: {
    position: "absolute",
    right: 8,
    top: 8,
    padding: 4,
  }
})
