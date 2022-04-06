// @ts-ignore
import {StyleSheet, TouchableOpacity, ActivityIndicator, View, Text} from "react-native-web";
import React, {forwardRef, Ref} from "react"
import {extractStyle} from "../../common/modifiers"
import {GenericStyleProp} from "react-native-web/types";
import {ViewStyle} from "react-native-web/exports/View/types";
import {TextStyle} from "react-native-web/exports/Text/types";

type PropsType = {
  style?: GenericStyleProp<ViewStyle>,
  textStyle?: GenericStyleProp<TextStyle>,
  onPress?: Function,
  disabled?: boolean,
  loading?: boolean,
  children?: any | null | undefined;
  loadingProps?: object
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
                  ...props
                }: PropsType, ref: Ref<any>) => {

  let wrapperProps = {}
  if (disabled || loading) {
    wrapperProps['onPress'] = undefined
    wrapperProps['activeOpacity'] = 1
  }
  const defaultProps = {
    middle: true,
    default: true
  }

  const _style = {...extractStyle('Button', {...defaultProps, ...props}), ...style}
  const _textStyle = {...extractStyle(['Button', 'Text'], props), ...textStyle}
  return <TouchableOpacity {...props} {...wrapperProps} ref={ref}>
    <View style={[styles.main, _style]}>
      {loading && <View style={styles.loading}>
        <ActivityIndicator
          {...loadingProps}
        />
      </View>}
      <Text style={[styles.text, _textStyle]}>{children}</Text>
    </View>
  </TouchableOpacity>
}
export {Button}; // For tests
export default forwardRef(Button)

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  loading: {
    paddingRight: 8
  },
  text: {},
})
