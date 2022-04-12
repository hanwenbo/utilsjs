import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import type {ReactNode} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {usePropsValue} from '../../utils/use-props-value'
import {mergeProps} from '../../utils/with-default-props'
import {devError} from '../../utils/dev-log'
// @ts-ignore
import {StyleSheet, View} from "react-native-web";

export type TextAreaProps = Pick<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement>,
  | 'autoComplete'
  | 'autoFocus'
  | 'disabled'
  | 'readOnly'
  | 'onFocus'
  | 'onBlur'
  | 'onCompositionStart'
  | 'onCompositionEnd'> & {
  onChange?: (val: string) => void
  value?: string
  defaultValue?: string
  placeholder?: string
  rows?: number
  maxLength?: number
  showCount?: boolean | ((length: number, maxLength?: number) => ReactNode)
  autoSize?:
    | boolean
    | {
    minRows?: number
    maxRows?: number
  }
  id?: string
} & NativeProps

export type TextAreaRef = {
  clear: () => void
  focus: () => void
  blur: () => void
}

const defaultProps = {
  rows: 2,
  showCount: false as NonNullable<TextAreaProps['showCount']>,
  autoSize: false as NonNullable<TextAreaProps['autoSize']>,
  defaultValue: '',
}

export const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  (p: TextAreaProps, ref) => {
    const props = mergeProps(defaultProps, p)
    const {autoSize, showCount, maxLength} = props
    const [value, setValue] = usePropsValue({
      ...props,
      value: props.value === null ? '' : props.value,
    })
    if (props.value === null) {
      devError(
        'TextArea',
        '`value` prop on `TextArea` should not be `null`. Consider using an empty string to clear the component.'
      )
    }
    const nativeTextAreaRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => ({
      clear: () => {
        setValue('')
      },
      focus: () => {
        nativeTextAreaRef.current?.focus()
      },
      blur: () => {
        nativeTextAreaRef.current?.blur()
      },
    }))

    useEffect(() => {
      if (!autoSize) return
      const textArea = nativeTextAreaRef.current
      if (!textArea) return
      textArea.style.height = 'auto'
      let height = textArea.scrollHeight
      if (typeof autoSize === 'object') {
        const computedStyle = window.getComputedStyle(textArea)
        const lineHeight = parseFloat(computedStyle.lineHeight)
        if (autoSize.minRows) {
          height = Math.max(height, autoSize.minRows * lineHeight)
        }
        if (autoSize.maxRows) {
          height = Math.min(height, autoSize.maxRows * lineHeight)
        }
      }
      textArea.style.height = `${height}px`
    }, [value, autoSize])

    const compositingRef = useRef(false)

    let count
    const valueLength = [...value].length
    if (typeof showCount === 'function') {
      count = showCount(valueLength, maxLength)
    } else if (showCount) {
      count = (
        <View style={styles.countWrap}>
          {maxLength === undefined
            ? valueLength
            : valueLength + '/' + maxLength}
        </View>
      )
    }

    return withNativeProps(
      props,
      <View style={styles.container}>
        <textarea
          ref={nativeTextAreaRef}
          // @ts-ignore
          style={htmlStyle.element}
          className={'textarea'}
          rows={props.rows}
          value={value}
          placeholder={props.placeholder}
          onChange={e => {
            let v = e.target.value
            if (maxLength && !compositingRef.current) {
              v = [...v].slice(0, maxLength).join('')
            }
            setValue(v)
          }}
          id={props.id}
          onCompositionStart={e => {
            compositingRef.current = true
            props.onCompositionStart?.(e)
          }}
          onCompositionEnd={e => {
            compositingRef.current = false
            if (maxLength) {
              setValue([...value].slice(0, maxLength).join(''))
            }
            props.onCompositionEnd?.(e)
          }}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          disabled={props.disabled}
          readOnly={props.readOnly}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        {count}
      </View>
    )
  }
)

TextArea.defaultProps = defaultProps

const htmlStyle = {
  element: {
    resize: "none",
    flex: "auto",
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    padding: 0,
    margin: 0,
    lineHeight: 1.5,
    background: "transparent",
    border: 0,
    outline: "none",
    appearance: "none",
    minHeight: "1.5em",
    fontSize: 14,
    color: "#333",
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  countWrap: {
    textAlign: "right",
    color: "#999",
    fontSize: 13,
    paddingTop: 8,
  }
})
