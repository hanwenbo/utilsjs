import React from "react"
import {Text} from "./text"
import {Image} from "./image"
import {HotArea} from "./hotArea"
import {ElementStyleProps, LinkActionType, ItemProps} from "../../types"
import Draggable from "react-draggable";
import {Resizable} from "re-resizable";
import clone from "clone"

type DragItemType = ItemType & {
  resizableProps: any
  element: React.ReactElement
  originItem: ItemProps
}
type ItemType = {
  type: string
  src?: string
  isBackground?: boolean
  style: ElementStyleProps
  link?: LinkActionType
}
type Props = {
  currentIndex: number
  onIndexChange: (index: number) => void
  canvas: {
    width: number
    height: number
  }
  items?: ItemType[]
  onItemsChange?: (items: ItemProps[]) => void
  onItemChange?: (item: ItemProps) => void
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
    onItemsChange: (_: ItemType[]) => {
    },
    onItemChange: (_: ItemProps) => {
    },
    onIndexChange: (_: number) => {
    }
  }
  const props = {...defaultProps, ...p}
  const elementKeys = {
    "text": Text,
    "image": Image,
    "hotArea": HotArea,
  }

  const onReposition = (x: number, y: number, i: number) => {
    let _item = clone(props.items[props.currentIndex]);
    _item.style.left = x
    _item.style.top = y
    props.onItemChange(_item);
  };

  const onResize = (d: { width: number; height: number }, i: number) => {
    let _item = clone(props.items[props.currentIndex]);
    let lastSize = _item.style;
    _item.style.width = lastSize.width + d.width
    _item.style.height = lastSize.height + d.height
    props.onItemChange(_item);
  };

  const getDraggableItem = (item: DragItemType, i) => {
    const position = {x: item.style.left, y: item.style.top}
    const size = {width: item.style.width, height: item.style.height}

    const onStart = () => {
      props.onIndexChange(i)
    }
    const onStop = (e: any, data: { lastX: any; lastY: any }) => {
      onReposition(data.lastX, data.lastY, i);
    }
    const onResizeStop = (e: any, direction: any, ref: any, d: { width: number; height: number }) => {
      onResize(d, i);
    }


    const className = `${props.currentIndex === i ? "active" : ""} `
    return <Draggable
      key={`k${i}`}
      bounds="parent"
      axis="both"
      handle='.handle'
      position={position}
      grid={[1, 1]}
      onStart={onStart}
      onStop={onStop}>
      {!!item?.resizableProps ? <Resizable
        bounds={"parent"}
        className={className}
        minWidth={item.type === 'text' ? 60 : 10}
        minHeight={item.type === 'text' ? 18 : 10}
        size={size}
        onResizeStop={onResizeStop}
        data-index={i}
        {...item?.resizableProps}
        style={{
          zIndex: item.style.zIndex
        }}
      >
        <div className={`handle type-${item.type}`}>
          {item.element}
        </div>
      </Resizable> : <div
        className={className}
        style={size}
        data-index={i}
      >
        <div className={`handle type-${item.type}`}>
          {item.element}
        </div>
      </div>}
    </Draggable>;
  }
  const initFormatItems = (data: ItemType[]) => {
    return Array.isArray(data) ? data.map((item) => {
      const {type, ...subProps} = item

      const element = !!elementKeys[type] ? React.createElement(elementKeys[type], subProps) :
        <div className={"item"}>不存在的组件</div>
      return {
        ...item,
        originItem: item,
        resizableProps: {
          lockAspectRatio: null,
        },
        element
      };
    }) : []
  };

  const content = initFormatItems(props.items).map((item, i) => getDraggableItem(item, i))

  return <div className="web-canvas-editor-view" style={{
    width: props.canvas.width,
    height: props.canvas.height
  }}>
    {props.items.length > 0 && content}
  </div>
}
