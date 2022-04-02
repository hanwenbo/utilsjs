// @ts-ignore
import {StyleSheet, TouchableOpacity, ActivityIndicator, View, Text} from "react-native-web";
import React, {forwardRef, Ref} from "react"
import {extractButtonTextValue, extractButtonValue} from "../../common/modifiers"
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
}
const Button = ({
                  style = null,
                  disabled = false,
                  loading = false,
                  children = null,
                  onPress,
                  textStyle = null,
                  ...props
                }: PropsType, ref: Ref<any>) => {
  let _props = {}
  if (disabled || loading) {
    _props['onPress'] = undefined
    _props['activeOpacity'] = 1
  }
  const _style = {...style, ...extractButtonValue(props)}
  const _textStyle = {...style, ...extractButtonTextValue(props)}
  return <TouchableOpacity {...props} {..._props} ref={ref}>
    <View style={[styles.main, _style]}>
      {loading && <View style={styles.loading}><ActivityIndicator size={'small'} /></View>}
      <Text style={[styles.text, _textStyle, textStyle]}>{children}</Text>
    </View>
  </TouchableOpacity>
}
export {Button}; // For tests
export default forwardRef(Button)

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center"
  },
  loading: {
    paddingRight: 8
  },
  text: {},
})
