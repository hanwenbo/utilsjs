// @ts-ignore
import {View, StyleSheet} from "react-native-web";
import React, {forwardRef, Ref} from "react"
import {GenericStyleProp} from "react-native-web/types";
import {ViewStyle} from "react-native-web/exports/View/types";

type PropsType = {
  style?: GenericStyleProp<ViewStyle>,
  startStyle?: GenericStyleProp<ViewStyle>,
  endStyle?: GenericStyleProp<ViewStyle>,
  childrenStyle?: GenericStyleProp<ViewStyle>,
  children?: React.ReactNode,
}
const Divider = ({style, startStyle, endStyle, childrenStyle, children, ...props}: PropsType, ref: Ref<any>) => {
  return <View {...props} style={[styles.divider, style]} ref={ref}>
    <View style={[styles.start, startStyle]} />
    {!!children && <View style={[styles.children, childrenStyle]}>{children}</View>}
    <View style={[styles.end, endStyle]} />
  </View>
}
export {Divider}; // For tests
export default forwardRef(Divider)

const startEnd = {
  position: "absolute",
  top: "50%",
  width: '50%',
  backgroundColor: "#0000000f",
  height: 1,
}
const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: "#000000d9",
    fontWeight: 500,
    fontSize: 16,
    whiteSpace: "nowrap",
    textAlign: "center",
    width: '100%',
  },
  start: {
    ...startEnd,
    left: 0,
  },
  end: {
    ...startEnd,
    right: 0,
  },
  children: {
    position: "relative",
    zIndex: 1,
    borderWidth: 15,
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  },
})
