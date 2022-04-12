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
import {View, StyleSheet, Image, Text} from "react-native-web"
import {Colors} from "../../style/color";

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
  onPress?: () => void
  closeOnMaskClick?: boolean
  visible?: boolean
  getContainer?: GetContainer
  bodyStyle?: object
  maskStyle?: object
  stopPropagation?: PropagationEvent[]
  disableBodyScroll?: boolean,
  onClose?:() => void | Promise<void>
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
  const noTop = !props.header && !props.title
  const noTopContentStyle = noTop ? {marginTop: 20,} : {}

  const body = (
    <View
      style={[styles.body, props.bodyStyle]}
    >
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
      <View style={styles.footer}>
        {props.actions.map((row, index) => {
          const actions = Array.isArray(row) ? row : [row]
          return (
            <View style={styles.actionRow} key={index}>
              {actions.map((action, index) => {
                const isLast = actions.length === index+1
                const buttonStyle = isLast ? {} : {
                  borderRightWidth: StyleSheet.hairlineWidth,
                  borderRightColor: Colors.border
                }
                return <DialogActionButton
                  buttonStyle={buttonStyle}
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
              })}
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
        disableBodyScroll={props.disableBodyScroll}
      >
        <View style={styles.bodyWrap}>
          <animated.div style={style}>{body}</animated.div>
        </View>
      </Mask>
    </View>
  )

  return renderToContainer(!!props.getContainer ? props.getContainer : document.body, withStopPropagation(props.stopPropagation, node))
}


const styles = StyleSheet.create({
  bodyWrap: {
    justifyContent: "center",
    alignItems: "center",
    width: '100vw',
    height: '100vh',
  },
  body: {
    width: "75vw",
    maxHeight: "70vh",
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {},
  title: {
    paddingVertical: 12,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 25,
    textAlign: "center",
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    paddingTop: 0,
    maxHeight: "50vh",
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
  imageContainer: {},
  footer: {},
  actionRow: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border
  }
})
