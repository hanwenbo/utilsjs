import React from "react"
import {Text} from "./text"
import {Image} from "./image"
import {HotArea} from "./hotArea"
import {ElementStyleProps, LinkActionType} from "../../types"

type ItemType = {
  type: string
  src?: string
  isBackground?: boolean
  style: ElementStyleProps
  link?: LinkActionType
}
type Props = {
  canvas: {
    width: number
    height: number
  }
  items?: ItemType[]
}
export const Display = (p: Props) => {
  const defaultProps = {
    canvas: {
      width: 375,
      height: 375
    },
    items: [],
  }
  const props = {...defaultProps, ...p}
  const elementKeys = {
    "text": Text,
    "image": Image,
    "hotArea": HotArea,
  }

  const renderItem = (data: ItemType[]) => {
    return Array.isArray(data) ? data.map((item,index) => {
      const {type, ...subProps} = item
      return <div className={"item"} style={subProps.style} key={index}>
        {!!elementKeys[type] ? React.createElement(elementKeys[type], subProps) : "不存在的组件"}
      </div>
    }) : null
  }

  const content = renderItem(props.items)
  return <div
    className="web-canvas-editor-display"
    style={{
      width: props.canvas.width,
      height: props.canvas.height
    }}>
    {props.items.length > 0 && content}
  </div>
}
