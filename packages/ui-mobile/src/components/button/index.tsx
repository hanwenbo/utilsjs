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
    activeOpacity: 0.8,
  }

  const props = mergeProps(defaultProps, p)
  let _style = extractStyleCompose('Button', props, style)
  _style = StyleSheet.flatten([styles.main, _style, {zIndex: "initial"}])
  const _textStyle = extractStyleCompose(['Button', 'Text'], props, textStyle)
  // @ts-ignore
  return <TouchableOpacity activeOpacity={0.6} {...p} {...wrapperProps} style={_style}>
    <View ref={ref} style={[styles.wrap, {
      opacity: disabled ? 0.5 : 1
    }]}>
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
