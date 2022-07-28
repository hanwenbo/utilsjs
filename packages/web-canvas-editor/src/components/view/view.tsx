import React from "react"
import {Text} from "./text"
import {Image} from "./image"
import {HotArea} from "./hotArea"
import {LinkActionType, ElementStyleProps} from "../../types"

type ItemType = {
  type: string
  src?: string
  isBackground?: boolean
  style?: ElementStyleProps
  link?: LinkActionType
}
type Props = {
  canvas: {
    width: number
    height: number
  }
  items?: ItemType[]
  onItemClick?: (_: ItemClickType) => void
}
type ItemClickType = {
  item: any
  index: number
}
export const View = (p: Props) => {
  const defaultProps = {
    canvas: {
      width: 375,
      height: 375
    },
    items: [
      {
        type: "image",
        src: "http://mojiim-static.oss-cn-beijing.aliyuncs.com/goods.png",
        style: {left: 0, top: 0, width: 375, height: 375, zIndex: 0},
        link: {
          action: "doNotJump",
          params: {}
        }
      },
      {
        type: "hotArea",
        style: {left: 0, top: 0, width: 100, height: 100, zIndex: 1},
        link: {
          action: "doNotJump",
          params: {}
        }
      },
    ],
    onItemClick: (_: ItemClickType) => {
    }
  }
  const props = {...defaultProps, ...p}
  const elementKeys = {
    "text": Text,
    "image": Image,
    "hotArea": HotArea,
  }

  return <div className="web-canvas-editor-view" style={{
    width: props.canvas.width,
    height: props.canvas.height
  }}>
    {props.items.map((item, index) => {
      const {type, ...subProps} = item
      return <div
        key={index}
        className={"item"}
        onClick={() => props.onItemClick({item, index})}
        style={{
          ...item.style,
          position: "absolute",
        }}
      >
        {!!elementKeys[type] ? React.createElement(elementKeys[type], subProps) : <div className={"item"}>不存在的组件</div>}
      </div>
    })}
  </div>
}
