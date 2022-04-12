import {FC} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import React from 'react'
import View from "../view"

export type SafeAreaProps = {
  position: 'top' | 'bottom'
} & NativeProps

export const SafeArea: FC<SafeAreaProps> = props => {
  return withNativeProps(
    props,
    <View
      style={{
        width: '100%',
        paddingTop: props.position === 'top' ? "env(safe-area-inset-top)" : 0,
        paddingBottom: props.position === 'bottom' ? "env(safe-area-inset-top)" : 0,
      }}
    />
  )
}
