import React, {FC, ReactNode} from 'react'
import {NativeProps} from '../../utils/native-props'
// @ts-ignore
import {StyleSheet, TouchableOpacity} from "react-native-web";
import ViewTextAuto from "../view-text-auto"
import View from "../view"
import {Colors} from "../../style/color";

export type CardProps = {
  title?: ReactNode
  extra?: ReactNode
  headerStyle?: React.CSSProperties
  headerTitleStyle?: React.CSSProperties
  bodyStyle?: React.CSSProperties
  onPress?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onBodyPress?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onHeaderPress?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
} & NativeProps

export const Card: FC<CardProps> = props => {
  const renderHeader = () => {
    if (!(props.title || props.extra)) {
      return null
    }
    return (<TouchableOpacity
        onPress={props.onHeaderPress}
        activeOpacity={1}
      >
        <View
          style={[styles.header, props.headerStyle]}
        >
          <ViewTextAuto style={[styles.headerTitle, props.headerTitleStyle]}>{props.title}</ViewTextAuto>
          <ViewTextAuto style={styles.extra}>{props.extra}</ViewTextAuto>
        </View>
      </TouchableOpacity>
    )
  }

  const renderBody = () => {
    if (!props.children) {
      return null
    }
    return (
      <View
        style={[styles.body, props.bodyStyle]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={props.onBodyPress}
        >
          <ViewTextAuto style={styles.extra}>{props.children}</ViewTextAuto>
        </TouchableOpacity>
      </View>
    )
  }
  return <View style={styles.main}>
    <TouchableOpacity onPress={props.onPress} activeOpacity={1}>
      {renderHeader()}
      {renderBody()}
    </TouchableOpacity>
  </View>
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontWeight: "bold",
  },
  extra: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.text
  },
  body: {
    paddingVertical: 12,
  }
})
