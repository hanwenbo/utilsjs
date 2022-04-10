import classNames from 'classnames'
import React, {FC, ReactNode, useState} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {usePropsValue} from '../../utils/use-props-value'
import {mergeProps} from '../../utils/with-default-props'
import {SpinIcon} from './spin-icon'
import {Colors} from "../../style/color";

const classPrefix = `adm-switch`

export type SwitchProps = {
  loading?: boolean
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  beforeChange?: (val: boolean) => Promise<void>
  onChange?: (checked: boolean) => void
  checkedText?: ReactNode
  uncheckedText?: ReactNode,
  checkedColor?: string,
  width?: number,
  height?: number,
  borderWidth?: number,
} & NativeProps

const defaultProps = {
  defaultChecked: false,
  checkedColor: Colors.primary,
  width: 51,
  height: 31,
  borderWidth: 2,
}

export const Switch: FC<SwitchProps> = p => {

  let props = mergeProps(defaultProps, p)
  const disabled = props.disabled || props.loading || false
  const [changing, setChanging] = useState(false)
  props['style'] = {
    '--checked-color': props.checkedColor,
    '--height': `${props.height}PX`,
    '--width': `${props.width}PX`,
    '--adm-color-weak': Colors.weak,
    '--adm-color-white': Colors.white,
  }

  const [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange,
  })

  async function onPress() {
    if (disabled || props.loading || changing) {
      return
    }
    const nextChecked = !checked
    if (props.beforeChange) {
      setChanging(true)
      try {
        await props.beforeChange(nextChecked)
        setChecked(nextChecked)
        setChanging(false)
      } catch (e) {
        setChanging(false)
        throw e
      }
    } else {
      setChecked(nextChecked)
    }
  }

  return withNativeProps(
    props,
    <div
      style={props.style}
      onClick={onPress}
      className={classNames(classPrefix, {
        [`${classPrefix}-checked`]: checked,
        [`${classPrefix}-disabled`]: disabled || changing,
      })}
    >
      <div className={`${classPrefix}-checkbox`}>
        <div className={`${classPrefix}-handle`}>
          {(props.loading || changing) && (
            <SpinIcon className={`${classPrefix}-spin-icon`} />
          )}
        </div>
        <div className={`${classPrefix}-inner`}>
          {checked ? props.checkedText : props.uncheckedText}
        </div>
      </div>
    </div>
  )
}
