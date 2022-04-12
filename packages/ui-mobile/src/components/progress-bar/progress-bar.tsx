import React, {FC} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {mergeProps} from '../../utils/with-default-props'
// @ts-ignore
import {View, StyleSheet} from "react-native-web"
import {Colors} from '../../style/color';

export type ProgressBarProps = {
  trackWidth?: number,
  trackColor?: string,
  fillColor?: string,
  percent?: number,
} & NativeProps

export const ProgressBar: FC<ProgressBarProps> = p => {
  const props = mergeProps({percent: 0, trackWidth: 3, trackColor: "#e5e5e5", fillColor: Colors.primary}, p)
  const fillStyle = {
    width: `${props.percent}%`,
  }
  return withNativeProps(
    props,
    <View style={styles.main}>
      <View style={[styles.trail, {
        height: props.trackWidth,
        backgroundColor: props.trackColor,
        borderRadius: props.trackWidth
      }]}>
        <View style={[styles.fill, fillStyle, {backgroundColor: props.fillColor, borderRadius: props.trackWidth,height: props.trackWidth,}]} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
  },
  trail: {
    overflow: "hidden"
  },
  fill: {
    transition: 'width 0.3s',
    overflow: "hidden"
  }
})
