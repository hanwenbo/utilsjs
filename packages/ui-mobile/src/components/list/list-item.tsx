import React, {FC, ReactNode} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {RightOutline} from 'antd-mobile-icons'
import {classNames} from '../../utils/class-names'
// @ts-ignore
import {StyleSheet, View, TouchableOpacity} from "react-native-web";
import ViewTextAuto from "../view-text-auto"
import {Colors} from "../../style/color";


export type ListItemProps = {
  title?: ReactNode
  children?: ReactNode
  description?: ReactNode
  prefix?: ReactNode
  extra?: ReactNode
  clickable?: boolean
  arrow?: boolean | ReactNode
  disabled?: boolean
  onPress?: (e: React.MouseEvent) => void,
  prefixWidth?: number,
  activeBackgroundColor?: string
} & NativeProps

export const ListItem: FC<ListItemProps> = props => {
  const clickable = props.clickable ?? !!props.onPress
  const arrow = props.arrow === undefined ? clickable : props.arrow

  const content = (
    <View style={styles.content}>
      <View style={styles.titleWrap}>
        {props.prefix && (
          <View style={styles.prefix}>{props.prefix}</View>
        )}
        <View style={styles.contentMain}>
          {props.title && (
            <ViewTextAuto style={styles.title}>{props.title}</ViewTextAuto>
          )}
          <ViewTextAuto style={styles.defaultChildren}>{props.children}</ViewTextAuto>
          {props.description && (
            <ViewTextAuto style={styles.description}>
              {props.description}
            </ViewTextAuto>
          )}
        </View>
      </View>
      <View style={styles.extraWrap}>
        {props.extra && (
          <ViewTextAuto style={styles.contentExtra}>{props.extra}</ViewTextAuto>
        )}
        {arrow && (
          <View style={styles.contentArrow}>
            {arrow === true ? <RightOutline color={Colors.light} /> : arrow}
          </View>
        )}
      </View>
    </View>
  )
  let _props = {}
  if (clickable && props.disabled) {
    _props['activeOpacity'] = 1
  }
  // TODO 禁用灰色
  return withNativeProps(
    props,
    React.createElement(
      clickable ? TouchableOpacity : View,
      {
        style: classNames(props.disabled && styles.disabled),
        onPress: props.disabled ? undefined : props.onPress,
        ..._props
      },
      content
    )
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
    justifyContent: "space-between"
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: {
    marginRight: 12,
  },
  contentMain: {},
  title: {
    fontSize: 10,
    color: Colors.weak,
  },
  description: {
    fontSize: 10,
    color: Colors.weak,
  },
  contentExtra: {
    fontSize: 15,
    color: Colors.weak,
  },
  contentArrow: {},
  disabled: {},
  defaultChildren: {
    fontSize: 16,
    color: Colors.text,
  }
})
