import React, {FC, useRef, RefObject} from 'react'
import {useDrag} from '@use-gesture/react'
import {ThumbIcon} from './thumb-icon'
// @ts-ignore
import {StyleSheet, View} from "react-native-web";

type ThumbProps = {
  value: number
  min: number
  max: number
  disabled: boolean
  onDrag: (value: number, first: boolean, last: boolean) => void
  trackRef: RefObject<HTMLDivElement>
  icon?: React.ReactNode,
  thumbStyle?: React.CSSProperties,
}

const Thumb: FC<ThumbProps> = props => {
  const {value, min, max, disabled, onDrag, icon,thumbStyle={}} = props
  const prevValue = useRef(value)

  const currentPosition = () => {
    return {
      left: `${((value - min) / (max - min)) * 100}%`,
      right: 'auto',
    }
  }

  const bind = useDrag(
    state => {
      if (disabled) return
      if (state.first) {
        prevValue.current = value
      }
      const x = state.xy[0] - state.initial[0]
      const sliderOffsetWith = props.trackRef.current?.offsetWidth
      if (!sliderOffsetWith) return
      const diff = (x / Math.ceil(sliderOffsetWith)) * (max - min)
      onDrag(prevValue.current + diff, state.first, state.last)
    },
    {
      axis: 'x',
      pointer: {touch: true},
    }
  )

  return (
    <div
      // @ts-ignore
      style={{
        ...htmlStyle.container,
        ...thumbStyle,
        ...currentPosition()
      }}
      {...bind()}
    >
      <View style={styles.wrap}>
        {icon ? icon : <View style={styles.icon}>
          <ThumbIcon />
        </View>}
      </View>
    </div>
  )
}

export default Thumb

const htmlStyle = {
  container: {
    cursor: "grab",
    touchAction: "none",
    position: "absolute",
    zIndex: 2,
    width: 22,
    height: 22,
    borderRadius: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFFFFF",
    // border:"1px solid #E0E0E0",
    alignItems:"center",
    justifyContent:"center",
    display:"flex",
    boxShadow: "0 3px 5px 0 rgb(0 0 0 / 12%), 0 1.5px 3px -2px rgb(0 0 0 / 25%)"
  },
}
const styles = StyleSheet.create({
  icon: {
    width: 10,
    height: 10,
    margin: 6,
  }
})
