import React, {FC, ReactNode} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {mergeProps} from '../../utils/with-default-props'
import Popup from '../popup'
import Button from '../button'
import {GetContainer} from '../../utils/render-to-container'
import SafeArea from '../safe-area'
import {renderImperatively} from '../../utils/render-imperatively'
// @ts-ignore
import {StyleSheet, View, Text} from "react-native-web";
import {Colors} from "../../style/color";
import {TextStyle} from "react-native-web/exports/Text/types";

export type Action = {
  key: string | number
  text: ReactNode
  disabled?: boolean
  description?: ReactNode
  danger?: boolean
  onPress?: () => void,
  textStyle?: TextStyle
}

export type ActionSheetProps = {
  visible?: boolean
  actions: Action[]
  extra?: React.ReactNode
  cancelText?: React.ReactNode
  onAction?: (action: Action, index: number) => void
  onClose?: () => void
  afterClose?: () => void
  onMaskClick?: () => void
  closeOnAction?: boolean
  closeOnMaskClick?: boolean
  getContainer?: GetContainer
  safeArea?: boolean
  popupClassName?: string
  popupStyle?: React.CSSProperties
} & NativeProps

const defaultProps = {
  visible: false,
  actions: [],
  cancelText: '',
  closeOnAction: false,
  closeOnMaskClick: true,
  safeArea: true,
}

export const ActionSheet: FC<ActionSheetProps> = p => {
  const props = mergeProps(defaultProps, p)
  return (
    <Popup
      visible={props.visible}
      onMaskClick={() => {
        props.onMaskClick?.()
        if (props.closeOnMaskClick) {
          props.onClose?.()
        }
      }}
      afterClose={props.afterClose}
      bodyStyle={StyleSheet.flatten(styles.popup, props.popupStyle)}
      {...(!!props.getContainer ? {getContainer: props.getContainer} : null)}
    >
      {withNativeProps(
        props,
        <View style={styles.main}>
          {props.extra && (
            <View style={styles.extra}>{props.extra}</View>
          )}
          <View style={styles.buttonList}>
            {props.actions.map((action, index) => {
              let textStyle = {fontSize: 14}
              if (action.danger) textStyle['color'] = Colors.danger
              if (action.disabled) textStyle['color'] = Colors.weak

              return <View
                key={action.key}
                style={styles.buttonItemWrapper}
              >
                <Button
                  block
                  rectangular
                  fillNone
                  large
                  disabled={action.disabled}
                  onPress={() => {
                    action.onPress?.()
                    props.onAction?.(action, index)
                    if (props.closeOnAction) {
                      props.onClose?.()
                    }
                  }}
                >
                  <View style={styles.buttonItem}>
                    <Text style={[textStyle, action.textStyle]}>{action.text}</Text>
                    {action.description && (
                      <Text style={styles.buttonItemDescription}>
                        {action.description}
                      </Text>
                    )}
                  </View>
                </Button>
              </View>
            })}
          </View>

          {props.cancelText && (
            <View style={styles.cancel}>
              <View style={styles.buttonItemWrapper}>
                <Button
                  block
                  rectangular
                  fillNone
                  onPress={() => {
                    props.onClose?.()
                  }}
                >
                  <Text style={styles.buttonItemName}>
                    {props.cancelText}
                  </Text>
                </Button>
              </View>
            </View>
          )}
          {props.safeArea && <SafeArea position='bottom' />}
        </View>
      )}
    </Popup>
  )
}

export type ActionSheetShowHandler = {
  close: () => void
}

export function showActionSheet(props: Omit<ActionSheetProps, 'visible'>) {
  return renderImperatively(
    <ActionSheet {...props} />
  ) as ActionSheetShowHandler
}

const styles = StyleSheet.create({
  popup: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
  },
  main: {},
  extra: {
    justifyContent: "center",
    center: "center",
    alignItems: "center",
    color: Colors.weak,
    fontSize: 13,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  buttonList: {},
  buttonItemWrapper: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: Colors.border
  },
  buttonItem: {
    textAlign: "center",
    justifyContent:"center",
    alignItems:"center"
  },
  buttonItemName: {
    fontSize: 14,
  },
  buttonItemDescription: {
    fontSize: 12,
    color: Colors.weak,
    paddingTop: 4,
  },
  cancel: {
    backgroundColor: "#f5f5f5",
    paddingTop: 8,
  }
})

