import React, {ReactNode, useMemo} from 'react'
import {CheckOutline, CloseOutline} from 'antd-mobile-icons'
import Mask from '../mask'
import {mergeProps} from '../../utils/with-default-props'
import {PropagationEvent} from '../../utils/with-stop-propagation'
import {GetContainer} from '../../utils/render-to-container'
import AutoCenter from '../auto-center'
import SpinLoading from '../spin-loading'
// @ts-ignore
import {View, StyleSheet, Text} from 'react-native-web'


export interface ToastProps {
  afterClose?: () => void
  maskStyle?: React.CSSProperties
  maskClassName?: string
  maskClickable?: boolean
  content?: ReactNode
  icon?: 'success' | 'fail' | 'loading' | React.ReactNode
  duration?: number
  position?: 'top' | 'bottom' | 'center'
  visible?: boolean
  getContainer?: GetContainer
  stopPropagation?: PropagationEvent[]
}

const defaultProps = {
  maskClickable: true,
  stopPropagation: ['click'],
}

export const InternalToast: React.FC<ToastProps> = p => {
  const props = mergeProps(defaultProps, p)
  const {maskClickable, content, icon, position} = props

  const iconStyle = {
    color:"#FFFFFF",
    fontSize:36
  }

  const iconElement = useMemo(() => {
    if (icon === null || icon === undefined) return null
    switch (icon) {
      case 'success':
        return <CheckOutline style={iconStyle} />
      case 'fail':
        return <CloseOutline style={iconStyle}/>
      case 'loading':
        return (
          <SpinLoading color='white' />
        )
      default:
        return icon
    }
  }, [icon])

  const top = useMemo(() => {
    switch (position) {
      case 'top':
        return '20%'
      case 'bottom':
        return '80%'
      default:
        return '50%'
    }
  }, [position])


  return (
    <Mask
      visible={props.visible}
      destroyOnClose
      opacity={0}
      disableBodyScroll={!maskClickable}
      {...(!!props.getContainer ? {getContainer: props.getContainer} : null)}
      afterClose={props.afterClose}
      style={props.maskStyle}
      stopPropagation={props.stopPropagation}
    >
      <View style={styles.wrap}>
        <View
          style={[styles.main, {top}]}
        >
         <View style={[styles.mask,iconElement?{
           paddingBottom:10
         }:{}]}>
           {iconElement && (
             <View style={styles.iconWrap}>{iconElement}</View>
           )}
           <AutoCenter>
             <View><Text style={styles.text}>{content}</Text></View>
           </AutoCenter>
         </View>
        </View>
      </View>
    </Mask>
  )
}
const styles = StyleSheet.create({
  wrap: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  },
  main: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 96,
    maxWidth: "70%",
    maxHeight: "70%",
    flexDirection:'row',
    justifyContent:"center",
    alignItems: 'center'
  },
  mask:{
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 8,
    overflow: "auto",
  },
  text: {
    color: "white",
    fontSize: 14,
    padding: 12
  },
  iconWrap: {
    paddingHorizontal:40,
    paddingTop:30,
    justifyContent:"center",
    alignItems: 'center'
  },
  icon: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 36,
    lineHeight: 1,
    color:"#FFFFFF",
  }
})
