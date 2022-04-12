import React from 'react'
import type {CSSProperties, ReactElement} from 'react'
import {TextStyle,ViewStyle} from "react-native-web"
import classNames from 'classnames'

export interface NativeProps<S extends string = never> {
  style?: CSSProperties & Partial<Record<S, string>> | TextStyle | { [key: string]: any } | undefined | any | ViewStyle
  tabIndex?: number,
  className?: string,
}

export function withNativeProps<P extends NativeProps>(
  props: P,
  element: ReactElement
) {
  const p = {
    ...element.props,
  }
  if (props.className) {
    p.className = classNames(element.props.className, props.className)
  }
  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    }
  }
  if (props.tabIndex !== undefined) {
    p.tabIndex = props.tabIndex
  }
  for (const key in props) {
    if (!props.hasOwnProperty(key)) continue
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key]
    }
  }
  return React.cloneElement(element, p)
}
