import React, {FC, ReactNode, useState} from 'react'
import {mergeProps} from '../../utils/with-default-props'
import {useUnmountedRef} from 'ahooks'
import Mask from '../mask'
import {Action, DialogActionButton} from './dialog-action-button'
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
// @ts-ignore
import {View, StyleSheet, Image} from "react-native-web"

export type DialogProps = {
  afterClose?: () => void
  afterShow?: () => void
  image?: string
  header?: ReactNode
  title?: ReactNode
  content?: ReactNode
  actions?: (Action | Action[])[]
  onAction?: (action: Action, index: number) => void | Promise<void>
  closeOnAction?: boolean
  onClose?: () => void
  closeOnMaskClick?: boolean
  visible?: boolean
  getContainer?: GetContainer
  bodyStyle?: object
  maskStyle?: object
  stopPropagation?: PropagationEvent[]
  disableBodyScroll?: boolean
} & NativeProps

const defaultProps = {
  visible: false,
  actions: [] as Action[],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ['click'],
  getContainer: null,
  disableBodyScroll: true,
}

export const Dialog: FC<DialogProps> = p => {
  const props = mergeProps(defaultProps, p)

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

  const body = (
    <View
      style={props.bodyStyle}
    >
      {!!props.image && (
        <View style={styles.imageContainer}>
          <Image source={props.image} style={{
            width: '100%',
          }}/>
        </View>
      )}
      {!!props.header && (
        <View style={styles.header}>
          <AutoCenter>{props.header}</AutoCenter>
        </View>
      )}
      {!!props.title && <View style={styles.title}>{props.title}</View>}
      <View
        style={styles.content}
        // empty
      >
        {typeof props.content === 'string' ? (
          <AutoCenter>{props.content}</AutoCenter>
        ) : (
          props.content
        )}
      </View>
      <View style={styles.footer}>
        {props.actions.map((row, index) => {
          const actions = Array.isArray(row) ? row : [row]
          return (
            <View style={styles.actionRow} key={index}>
              {actions.map((action, index) => (
                <DialogActionButton
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
              ))}
            </View>
          )
        })}
      </View>
    </View>
  )

  const node = withNativeProps(
    props,
    <View
      style={{
        display: active ? 'unset' : 'none',
      }}
    >
      <Mask
        visible={props.visible}
        onMaskClick={props.closeOnMaskClick ? props.onClose : undefined}
        // style={props.maskStyle}
        disableBodyScroll={props.disableBodyScroll}
      />
      <div
        style={{
          pointerEvents: props.visible ? 'unset' : 'none',
        }}
      >
        <animated.div style={style}>{body}</animated.div>
      </div>
    </View>
  )

  return renderToContainer(
    props.getContainer,
    withStopPropagation(props.stopPropagation, node)
  )
}


const styles = StyleSheet.create({
  header: {},
  title: {},
  content: {},
  contentEmpty: {},
  imageContainer: {},
  footer: {},
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
})
