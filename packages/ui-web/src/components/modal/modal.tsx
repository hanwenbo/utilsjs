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
import {View, Text, Image, StyleSheet} from 'react-native-web'

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
  bodyClassName?: string
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

  const renderTitle = (): any => {
    if (props.title) {
      return (
        <View style={styles.title}>
          {typeof props.title === "string" && <Text style={styles.titleText}>{props.title}</Text>}
          {typeof props.title !== "string" && props.title}
        </View>
      )
    }
  }
  const body = (
    <View
      style={[styles.body, props.bodyStyle]}
    >
      {props.showCloseButton && (
        <a
          onClick={props.onClose}
        >
          关闭
          <CloseOutline />
        </a>
      )}
      {!!props.image && (
        <div>
          <Image source={props.image} />
        </div>
      )}
      {!!props.header && (
        <div>
          <AutoCenter>{props.header}</AutoCenter>
        </div>
      )}
      {renderTitle()}
      <View style={styles.content}>
        {typeof props.content === 'string' ? (
          <AutoCenter><Text>{props.content}</Text></AutoCenter>
        ) : (
          props.content
        )}
      </View>
      <View style={styles.footer}>
        <Space vertical>
          {props.actions.map((action, index) => {
            return (
              <ModalActionButton
                key={action.key}
                action={action}
                onAction={async () => {
                  await Promise.all([
                    action.onClick?.(),
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
          display: active ? 'unset' : 'none',
        }}
      >
        <Mask
          visible={props.visible}
          onMaskClick={props.closeOnMaskClick ? props.onClose : undefined}
          disableBodyScroll={props.disableBodyScroll}
        >
          <View
            style={[styles.wrap, {
              pointerEvents: props.visible ? 'unset' : 'none',
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
    boxSizing: "border-box",
    fontSize: 14,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "column",
    paddingTop: 20,
  },
  footer: {
    padding: 15
  },
  title: {},
  titleText:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 15,
    textAlign: "center"
  }
})
