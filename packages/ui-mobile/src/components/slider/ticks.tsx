import React, {FC} from 'react'
// @ts-ignore
import {StyleSheet, View} from "react-native-web";
import {Colors} from "../../style/color";


type TicksProps = {
  points: number[]
  max: number
  min: number
  upperBound: number
  lowerBound: number,
  tickStyle?:{},
  fillColor: string,
}

const Ticks: FC<TicksProps> = ({
                                 points,
                                 max,
                                 min,
                                 upperBound,
                                 lowerBound,
                                 tickStyle={},
                                 fillColor
                               }) => {
  const range = max - min
  const elements = points.map(point => {
    const offset = `${(Math.abs(point - min) / range) * 100}%`

    const isActived = point <= upperBound && point >= lowerBound
    const style = {left: offset}

    // const pointClassName = classNames({
    //   [`${classPrefix}-tick`]: true,
    //   [`${classPrefix}-tick-active`]: isActived,
    // })
    const activeStyle = isActived ? { backgroundColor: fillColor } : {}

    return <View style={[styles.tick, style, tickStyle,activeStyle]} key={point} />
  })

  return <View style={styles.main}>{elements}</View>
}

export default Ticks
const styles = StyleSheet.create({
  container:{},
  tick: {
    position: "absolute",
    top: "50%",
    width: 12,
    height: 12,
    marginLeft: -5,
    backgroundColor: "#f5f5f5",
    borderRadius: "50%",
    transform: "translate(0, -40%)",
  },
  fill: {
    backgroundColor: Colors.primary,
  },
  wrap: {},
  icon: {}
})
