// @ts-ignore
import {StyleSheet, TouchableOpacity, ActivityIndicator, View, Text} from "react-native-web";
import React, {forwardRef, Ref} from "react"
import {extractStyleCompose} from "../../common/modifiers"
import {GenericStyleProp} from "react-native-web/types";
import {ViewStyle} from "react-native-web/exports/View/types";
import {TextStyle} from "react-native-web/exports/Text/types";
import {mergeProps} from '../../utils/with-default-props'

type PropsType = {
  style?: GenericStyleProp<ViewStyle>,
  textStyle?: GenericStyleProp<TextStyle>,
  onPress?: Function,
  disabled?: boolean,
  loading?: boolean,
  children?: any | null | undefined;
  loadingProps?: object,
  [key: string]: any,
}
const Button = ({
                  style = null,
                  disabled = false,
                  loading = false,
                  loadingProps = {
                    size: 'small',
                    color: "#FFFFFF"
                  },
                  children = null,
                  onPress,
                  textStyle = null,
                  ...p
                }: PropsType, ref: Ref<any>) => {

  let wrapperProps = {}
  if (disabled || loading) {
    wrapperProps['onPress'] = undefined
    wrapperProps['activeOpacity'] = 1
  } else {
    wrapperProps['onPress'] = onPress
  }
  const defaultProps = {
    middle: true,
    default: true,
  }

  const props = mergeProps(defaultProps, p)
  let _style = extractStyleCompose('Button', props, style)
  // zIndex: "initial" 解决react-native-web默认为0的bug，在浏览器上会相对于空的dom层级要高
  _style = StyleSheet.flatten([styles.main, _style, {zIndex: "initial"}])
  if (_style && disabled) {
    _style['opacity'] = 0.5
    wrapperProps['activeOpacity'] = 0.5
  }
  const _textStyle = extractStyleCompose(['Button', 'Text'], props, textStyle)

  // @ts-ignore
  return <TouchableOpacity {...p} activeOpacity={0.7} {...wrapperProps} style={_style}>
    <View ref={ref} style={styles.wrap}>
      {loading && <View style={styles.loading}>
        <ActivityIndicator
          {...loadingProps}
        />
      </View>}
      <Text style={[styles.text, _textStyle]}>{children}</Text>
    </View>
  </TouchableOpacity>
}
export {Button};
export default forwardRef(Button)

const styles = StyleSheet.create({
  main: {},
  loading: {
    paddingRight: 8
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  text: {},
})
