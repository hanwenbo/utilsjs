import React, {FC, ReactNode} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {mergeProps} from '../../utils/with-default-props'
// @ts-ignore
import {StyleSheet, View, TouchableOpacity} from "react-native-web";
import {Colors} from "../../style/color";
import ViewTextAuto from "../view-text-auto"

export type ListProps = {
  header?: ReactNode
  mode?: 'default' | 'card', // 默认是整宽的列表，card 模式下展示为带 margin 和圆角的卡片
  headerFontSize?: number,
  prefixWidth?: number,
  prefixPaddingRight?: number,
  alignItems?: string,
  activeBackgroundColor?: string,
  borderInner?: number,
  borderTop?: number,
  borderBottom?: number,
  paddingLeft?: number,
  paddingRight?: number,
  fontSize?: number,
} & NativeProps
const defaultProps = {
  mode: 'default',
}

export const List: FC<ListProps> = p => {
  const props = mergeProps(defaultProps, p)
  return withNativeProps(
    props,
    <View style={styles.main}>
      {props.header && (
        <ViewTextAuto style={styles.header}>{props.header}</ViewTextAuto>
      )}
      <View style={styles.body}>
        <View style={styles.bodyInner}>{props.children}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FAFBFC',
  },
  header: {
    color: Colors.weak,
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  body: {},
  bodyInner: {},
})
