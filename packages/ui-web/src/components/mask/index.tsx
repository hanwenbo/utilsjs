// @ts-ignore
import {StyleSheet, TouchableOpacity, ActivityIndicator, View} from "react-native-web";
import React, {forwardRef, Ref, useState} from "react"
import {extractStyle} from "../../common/modifiers"
import {useSpring, animated} from '@react-spring/web'
import {useUnmountedRef} from 'ahooks'
import {useShouldRender} from '../../utils/should-render'
import {mergeProps} from "../../utils/with-default-props";
import {
  renderToContainer,
  GetContainer,
} from '../../utils/render-to-container'
import {
  PropagationEvent,
  withStopPropagation,
} from '../../utils/with-stop-propagation'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {renderToBody} from "../../utils/render-to-body"
import ReactDOM from "react-dom";

export type MaskProps = {
  children?: any | null | undefined;
  visible?: boolean
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  destroyOnClose?: boolean
  forceRender?: boolean
  disableBodyScroll?: boolean
  getContainer?: GetContainer
  afterShow?: () => void
  afterClose?: () => void
  stopPropagation?: PropagationEvent[],
  [key: string]: any
} & NativeProps
const Mask = ({
                style = {},
                visible = false,
                children = null,
                destroyOnClose,
                onMaskClick,
                afterShow,
                afterClose,
                ...p
              }: MaskProps, ref: Ref<any>) => {

  const defaultProps = {
    default: true,
    visible: true,
    destroyOnClose: false,
    forceRender: false,
    disableBodyScroll: true,
    getContainer: null,
    stopPropagation: ['click'],
  }

  let props = mergeProps(defaultProps, p)
  let _style = {...extractStyle('Mask', props), ...style}

  const [active, setActive] = useState(visible)
  const unmountedRef = useUnmountedRef()
  const {opacity} = useSpring({
    opacity: visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true,
    },
    onStart: () => {
      setActive(true)
    },
    onRest: () => {
      if (unmountedRef.current) return
      setActive(visible)
      if (visible) {
        afterShow?.()
      } else {
        afterClose?.()
      }
    },
  })

  const shouldRender = useShouldRender(
    active,
    props.forceRender,
    props.destroyOnClose
  )

  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props, <animated.div
        role={'mask'}
        ref={ref}
        style={{
          ...{
            zIndex: 1000,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: "100%"
          },
          opacity,
          display: active ? 'unset' : 'none',
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={onMaskClick}>
          <View
            style={[styles.button, _style]}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          {children}
        </View>
      </animated.div>
    )
  )
  // return shouldRender && ReactDOM.createPortal(node, document.body)
  return renderToContainer(props.getContainer, node)
}
export {Mask}; // For tests
export default forwardRef(Mask)

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
  },
  button: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100vw',
    height: '100vh',
  },
  content: {
    zIndex: 2,
  }
})
