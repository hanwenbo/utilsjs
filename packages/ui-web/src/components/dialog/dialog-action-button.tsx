import React, {FC, useState} from 'react'
import Button from '../button'
import {NativeProps, withNativeProps} from '../../utils/native-props'
// @ts-ignore
import {StyleSheet, ViewStyle} from "react-native-web";

export type Action = {
  key: string | number
  text: string
  disabled?: boolean
  danger?: boolean
  bold?: boolean
  onPress?: () => void | Promise<void>
} & NativeProps

export const DialogActionButton: FC<{
  buttonStyle?: ViewStyle
  action: Action
  onAction: () => void | Promise<void>
}> = props => {
  const {action} = props

  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const promise = props.onAction()
      await promise
      setLoading(false)
    } catch (e) {
      setLoading(false)
      throw e
    }
  }

  let colorProps = action.danger ? {danger: true} : {primary: true}
  return withNativeProps(
    props.action,
    <Button
      key={action.key}
      onPress={handleClick}
      style={[styles.button,props.buttonStyle]}
      bold={action.bold}
      block
      large
      {...colorProps}
      fillNone
      rectangular
      loading={loading}
      disabled={action.disabled}
    >
      {action.text}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {},
})
