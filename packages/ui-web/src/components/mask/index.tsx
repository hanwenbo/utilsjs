// @ts-ignore
import {StyleSheet, TouchableOpacity, ActivityIndicator, View} from "react-native-web";
import React, {forwardRef, Ref, useState} from "react"
import {extractStyle} from "../../common/modifiers"
import {GenericStyleProp} from "react-native-web/types";
import {ViewStyle} from "react-native-web/exports/View/types";
import {useSpring, animated} from '@react-spring/web'
import {useUnmountedRef} from 'ahooks'
import ReactDOM from 'react-dom';

export type MaskProps = {
  style?: GenericStyleProp<ViewStyle>,
  children?: any | null | undefined;
  visible?: boolean,
  destroyOnClose?: Function,
  onMaskClick?: (event: any) => void | null | undefined,
  afterShow?: Function,
  afterClose?: Function,
  disableBodyScroll?:boolean,
}
const Mask = ({
                style = null,
                visible = false,
                children = null,
                destroyOnClose,
                onMaskClick,
                afterShow,
                afterClose,
                ...props
              }: MaskProps, ref: Ref<any>) => {

  props['default'] = true
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
  const portalContainer = document.body

  const node = <animated.div
    ref={ref}
    style={{
      ...{
        zIndex: 1000,
        position: 'fixed',
        top: 0,
        left: 0,
        width:'100%',
        height:"100%"
      },
      opacity,
      display: active ? 'unset' : 'none',
    }}
  >
    {/*{onMaskClick && (*/}
    {/*  <TouchableOpacity activeOpacity={1} onPress={onMaskClick}>*/}
    {/*    <View*/}
    {/*      style={[styles.button,_style]}*/}
    {/*    />*/}
    {/*  </TouchableOpacity>*/}
    {/*)}*/}
    <TouchableOpacity activeOpacity={1} onPress={onMaskClick}>
      <View
        style={[styles.button,_style]}
      />
    </TouchableOpacity>
    <View style={styles.content}>
      {children}
    </View>
  </animated.div>

  return ReactDOM.createPortal(node, portalContainer)
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
