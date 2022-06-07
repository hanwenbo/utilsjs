import React, {useState, useRef, FC} from 'react'
import {useUnmountedRef} from 'ahooks'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {mergeProps} from '../../utils/with-default-props'
import Mask from '../mask'
import {useLockScroll} from '../../utils/use-lock-scroll'
// @ts-ignore
import {StyleSheet} from "react-native-web"
import {
  GetContainer,
  renderToContainer,
} from '../../utils/render-to-container'
import {useSpring, animated} from '@react-spring/web'
import {useShouldRender} from '../../utils/should-render'
import {
  PropagationEvent,
  withStopPropagation,
} from '../../utils/with-stop-propagation'
import {TouchableOpacity, View} from "react-native-web"

export type PopupProps = {
  visible?: boolean
  mask?: boolean
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  destroyOnClose?: boolean
  forceRender?: boolean
  getContainer?: GetContainer
  afterShow?: () => void
  afterClose?: () => void
  position?: 'bottom' | 'top' | 'left' | 'right'
  bodyClassName?: string
  bodyStyle?: React.CSSProperties
  maskClassName?: string
  maskStyle?: React.CSSProperties
  onPress?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  stopPropagation?: PropagationEvent[]
} & NativeProps

const defaultProps = {
  position: 'bottom',
  visible: false,
  getContainer: () => document.body,
  mask: true,
  stopPropagation: ['click'],
}

export const Popup: FC<PopupProps> = p => {
  const props = mergeProps(defaultProps, p)

  let bodyStyle = {
    position: "fixed",
    zIndex: 1000,
    backgroundColor: "#FFFFFF",
  }
  bodyStyle[props.position] = 0
  if (props.position === 'left' || props.position === 'right') {
    bodyStyle['height'] = '100vh'
    bodyStyle['top'] = 0
  }else{
    bodyStyle['width'] = '100vw'
  }

  const ref = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(props.visible)
  useLockScroll(ref, active)
  const shouldRender = useShouldRender(
    active,
    props.forceRender,
    props.destroyOnClose
  )

  const unmountedRef = useUnmountedRef()
  const {percent} = useSpring({
    percent: props.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30,
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

  // zIndex 1000 为适配react-native-web view的默认zIndex
  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <View
        style={{display: active ? 'flex' : 'none', zIndex:1000}}
      >
        <TouchableOpacity onPress={props.onPress} activeOpacity={1}>
          {props.mask && (
            <Mask
              visible={props.visible}
              onMaskClick={props.onMaskClick}
              style={props.maskStyle}
              disableBodyScroll={false}
              stopPropagation={props.stopPropagation}
            />
          )}
          <animated.div
            // @ts-ignore
            style={{
              ...bodyStyle,
              ...props.bodyStyle,
              transform: percent.to(v => {
                if (props.position === 'bottom') {
                  return `translate(0, ${v}%)`
                }
                if (props.position === 'top') {
                  return `translate(0, -${v}%)`
                }
                if (props.position === 'left') {
                  return `translate(-${v}%, 0)`
                }
                if (props.position === 'right') {
                  return `translate(${v}%, 0)`
                }
                return 'none'
              }),
            }}
            ref={ref}
          >
            {shouldRender && props.children}
          </animated.div>
        </TouchableOpacity>
      </View>
    )
  )

  return renderToContainer(props.getContainer, node)
}

const styles = StyleSheet.create({})
