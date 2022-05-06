import React, {FC} from 'react'
// @ts-ignore
import {StyleSheet, View, Text} from "react-native-web";
// import classNames from 'classnames'

// const classPrefix = `adm-slider-mark`

export type SliderMarks = {
  [key: number]: React.ReactNode
}

type MarksProps = {
  marks: SliderMarks
  max: number
  min: number
  upperBound: number
  lowerBound: number
  markStyle?: {}
}

const Marks: FC<MarksProps> = ({marks, upperBound, lowerBound, max, min, markStyle}) => {
  const marksKeys = Object.keys(marks)

  const range = max - min
  const elements = marksKeys
    .map(parseFloat)
    .sort((a, b) => a - b)
    .filter(point => point >= min && point <= max)
    .map(point => {
      const markPoint = marks[point]
      if (!markPoint && markPoint !== 0) {
        return null
      }

      const isActive = point <= upperBound && point >= lowerBound

      const activeStyle = isActive ? {} : {}

      const style = {
        left: `${((point - min) / range) * 100}%`,
      }
      return (
        <Text style={[styles.mask, style, markStyle]} key={point}>
          {markPoint}
        </Text>
      )
    })

  return <View style={styles.main}>{elements}</View>
}

export default Marks


const styles = StyleSheet.create({
  main: {
    position: "relative",
    width: "100%",
    overflow: "visible",
    fontSize: 12,
    height: 12,
    marginTop: 4,
  },
  mask: {
    position: "absolute",
    display: "inline-block",
    lineHeight: 16,
    color: "#999",
    textAlign: "center",
    wordBreak: "keep-all",
    userSelect: "none",
    transform: "translateX(-50%)",
  }
})

