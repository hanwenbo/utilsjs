import React, {FC} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
// @ts-ignore
import {View, StyleSheet} from "react-native-web";

export type AutoCenterProps = {
  children?: React.ReactNode,
} & NativeProps

export const AutoCenter: FC<AutoCenterProps> = ({...props}) => {
  return withNativeProps(
    props,
    <View style={styles.main}>
      <View style={styles.content}>{props.children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  content: {
    flex: '0 1 auto'
  }
})
