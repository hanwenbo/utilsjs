// @ts-ignore
import {View, StyleSheet} from "react-native-web";
import React from "react"
import {GenericStyleProp} from "react-native-web/types";
import {ViewStyle} from "react-native-web/exports/View/types";
import {mergeProps} from "../../utils/with-default-props";

type PropsType = {
  contentPosition?: "left" | "right" | "center";
  style?: GenericStyleProp<ViewStyle>;
  startStyle?: GenericStyleProp<ViewStyle>,
  endStyle?: GenericStyleProp<ViewStyle>,
  childrenStyle?: GenericStyleProp<ViewStyle>,
  children?: React.ReactNode,
  shortSideWidth?: number | string,

}
const Divider = ({style, childrenStyle, children, ...p}: PropsType) => {
  const defaultProps = {
    contentPosition: "center",
    startStyle: {},
    endStyle: {},
    shortSideWidth: '5%'
  }
  let props = mergeProps(defaultProps, p)
  const hasChildren = !!children
  let startStyle = props.startStyle
  let endStyle = props.endStyle

  switch (props.contentPosition) {
    case 'center':
      // @ts-ignore
      startStyle = {flex: 'auto'}
      // @ts-ignore
      endStyle = {flex: 'auto'}
      break;
    case 'left':
      startStyle = {width: props.shortSideWidth,}
      endStyle = {flex: 1}
      break
    case 'right':
      startStyle = {flex: 1,}
      endStyle = {width: props.shortSideWidth}
      break
  }
  return <View
    {...props}
    style={[styles.divider, style]}
  >
    <View style={[styles.start, startStyle]} />
    {hasChildren && <View style={[styles.children, childrenStyle]}>{children}</View>}
    <View style={[styles.end, endStyle]} />
  </View>
}
export {Divider}; // For tests
export default Divider

const startEnd = {
  backgroundColor: "#0000000f",
  height: 1,
}
const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    color: "#000000d9",
    fontWeight: 500,
    fontSize: 16,
    whiteSpace: "nowrap",
    textAlign: "center",
    alignItems: "center",
    flex: "auto",
  },
  start: {
    ...startEnd,
  },
  end: {
    ...startEnd,
  },
  children: {
    position: "relative",
    zIndex: 1,
    paddingHorizontal: 15,
  },
})
