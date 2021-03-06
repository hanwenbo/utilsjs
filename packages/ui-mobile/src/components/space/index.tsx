// @ts-ignore
import {StyleSheet, TouchableOpacity, ActivityIndicator, View, Text} from "react-native-web";
import React, {forwardRef, Ref} from "react"
import {extractStyle} from "../../common/modifiers"
import {GenericStyleProp} from "react-native-web/types";
import {ViewStyle} from "react-native-web/exports/View/types";

type PropsType = {
  style?: GenericStyleProp<ViewStyle>,
  children: any | null | undefined;
  loadingProps?: object,
  vertical?: boolean,
  wrap?: boolean,
  gap?: number,
  block?: boolean,
}
const Space = ({
                 style = null,
                 wrap = false,
                 gap = 8,
                 children = null,
                 block = false,
                 ...props
               }: PropsType, ref: Ref<any>) => {

  let _style = {...extractStyle('Space', props), ...style}
  if (wrap) {
    _style['flexWrap'] = 'wrap'
    _style['marginBottom'] = -gap
  }
  if (props?.vertical) {
    _style['marginBottom'] = -gap
  }

  const childrenCount = React.Children.count(children)
  const lastItemStyle = {marginRight: 0}

  // zIndex: "initial" 解决多个Mask层级错乱问题
  // @ts-ignore
  return <View style={[styles.main, _style, {zIndex: "initial"}]}>
    {React.Children.map(children, (child, index) => {
      const isLast = childrenCount === index + 1
      let itemStyles = [styles.item, {marginRight: gap, zIndex: "initial"}]

      if (isLast) {
        itemStyles.push(lastItemStyle)
      }
      if (wrap) {
        itemStyles.push({marginBottom: gap})
      }
      if (props?.vertical) {
        itemStyles.push({marginBottom: gap, marginRight: 0, flexDirection: "column"})
      }
      if (block) {
        itemStyles.push({flex: 1})
      }
      return (
        child !== null &&
        child !== undefined && (
          <View style={itemStyles}>{child}</View>
        )
      )
    })}
  </View>
}
export {Space};
export default forwardRef(Space)

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
  },
})
