import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {useDrag} from '@use-gesture/react'
import {useSpring, animated} from '@react-spring/web'
import {supportsPassive} from '../../utils/supports-passive'
import {nearest} from '../../utils/nearest'
import {mergeProps} from '../../utils/with-default-props'
import {useLockScroll} from '../../utils/use-lock-scroll'
import {useMemoizedFn} from 'ahooks'
import {Colors} from "../../style/color";

export type FloatingPanelRef = {
  setHeight: (
    height: number,
    options?: {
      immediate?: boolean
    }
  ) => void
}

export type FloatingPanelProps = {
  anchors: number[]
  children: ReactNode
  onHeightChange?: (height: number, animating: boolean) => void
  onDrag?: (state: any) => void
  handleDraggingOfContent?: boolean,
  borderRadius?: number,
  zIndex?: number,
  headerHeight?: number,
  headerHandlerBarStyle?: React.CSSProperties,
  wrapStyle?: React.CSSProperties,
} & NativeProps

const defaultProps = {
  handleDraggingOfContent: true,
  borderRadius: 8,
  headerHeight: 28,
  zIndex: 900,
  headerHandlerBarStyle: {
    backgroundColor: Colors.weak
  },
  wrapStyle: {},
}

export const FloatingPanel = forwardRef<FloatingPanelRef, FloatingPanelProps>(
  (p, ref) => {
    const props = mergeProps(defaultProps, p)
    const {anchors} = props
    const maxHeight = anchors[anchors.length - 1] ?? window.innerHeight

    const possibles = anchors.map(x => -x)

    const elementRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [pulling, setPulling] = useState(false)
    const pullingRef = useRef(false)

    const bounds = {
      top: possibles[possibles.length - 1],
      bottom: possibles[0],
    }

    const onHeightChange = useMemoizedFn(props.onHeightChange ?? (() => {
    }))

    const [{y}, api] = useSpring(() => ({
      y: bounds.bottom,
      config: {tension: 300},
      onChange: result => {
        onHeightChange(result.value.y, y.isAnimating)
      },
    }))

    useDrag(
      state => {
        props?.onDrag?.(state)
        const [, offsetY] = state.offset
        if (state.first) {
          const target = state.event.target as Element
          const header = headerRef.current
          if (header === target || header?.contains(target)) {
            pullingRef.current = true
          } else {
            if (!props.handleDraggingOfContent) return
            const reachedTop = y.goal <= bounds.top
            const content = contentRef.current
            if (!content) return
            if (reachedTop) {
              if (content.scrollTop <= 0 && state.direction[1] > 0) {
                pullingRef.current = true
              }
            } else {
              pullingRef.current = true
            }
          }
        }
        setPulling(pullingRef.current)
        if (!pullingRef.current) return
        const {event} = state
        if (event.cancelable) {
          event.preventDefault()
        }
        event.stopPropagation()
        let nextY = offsetY
        if (state.last) {
          pullingRef.current = false
          setPulling(false)
          nextY = nearest(possibles, offsetY)
        }
        api.start({
          y: nextY,
        })
      },
      {
        axis: 'y',
        bounds,
        rubberband: true,
        from: () => [0, y.get()],
        pointer: {touch: true},
        target: elementRef,
        eventOptions: supportsPassive ? {passive: false} : false,
      }
    )

    useImperativeHandle(
      ref,
      () => ({
        setHeight: (
          height: number,
          options?: {
            immediate?: boolean
          }
        ) => {
          api.start({
            y: -height,
            immediate: options?.immediate,
          })
        },
      }),
      [api]
    )

    useLockScroll(elementRef, true)

    // TODO wrapStyle?????????create ????????????

    const anmStyle = {
      '--z-index': props.zIndex,
      '--border-radius': `${props.borderRadius}PX`,
      '--header-height': `${props.headerHeight}PX`,
      translateY: y.to(y => `calc(100% + (${y}px))`),
      height: maxHeight,
      ...props.wrapStyle,
    }
    return withNativeProps(
      props,
      <animated.div
        ref={elementRef}
        className='adm-floating-panel'
        // @ts-ignore
        style={anmStyle}
      >
        <div
          className='adm-floating-panel-mask'
          style={{
            display: pulling ? 'block' : 'none',
          }}
        />
        <div className='adm-floating-panel-header' ref={headerRef}>
          <div className='adm-floating-panel-bar' style={props.headerHandlerBarStyle} />
        </div>
        <div className='adm-floating-panel-content' ref={contentRef}>
          {props.children}
        </div>
      </animated.div>
    )
  }
)

