import React, {useState} from "react"
import {Text} from "./text"
import {Image} from "./image"
import {HotArea} from "./hotArea"
import {ElementStyleProps, LinkActionType, ItemClickType, ItemProps} from "../../types"
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
  canvas: {
    width: number
    height: number
  }
  items?: ItemType[]
  onItemClick?: (_: ItemClickType) => void
  onItemsChange?: (items: ItemProps[]) => void
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
    },
    onItemsChange: (_: ItemType[]) => {
    }
  }
  const props = {...defaultProps, ...p}
  const elementKeys = {
    "text": Text,
    "image": Image,
    "hotArea": HotArea,
  }
  const [index, setIndex] = useState(0);

  const onReposition = (x: number, y: number, i: number) => {
    let _items = clone(props.items);
    _items[i].style.left = x;
    _items[i].style.top = y;
    props.onItemsChange(_items);
  };

  const onResize = (d: { width: number; height: number }, i: number) => {
    let _items = clone(props.items);
    let lastSize = _items[i].style;
    _items[i].style.width = lastSize.width + d.width
    _items[i].style.height = lastSize.height + d.height
    props.onItemsChange(_items);
  };

  const getDraggableItem = (item: DragItemType, i) => {
    const position = {x: item.style.left, y: item.style.top}
    const size = {width: item.style.width, height: item.style.height}
    const onStart = () => {
      setIndex(i)
    }
    const onStop = (e: any, data: { lastX: any; lastY: any }) => {
      setIndex(i)
      onReposition(data.lastX, data.lastY, i);
    }
    const onResizeStop = (e: any, direction: any, ref: any, d: { width: number; height: number }) => {
      onResize(d, i);
    }

    const onItemClick = (e: ItemClickType) => {
      props.onItemClick(e)
    }
    const className = `${index === i ? "active" : ""} `
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
      >
        <div className={`handle type-${item.type}`} onClick={() => onItemClick({item: item.originItem, index: i})}>
          {item.element}
        </div>
      </Resizable> : <div
        onClick={() => onItemClick({item: item.originItem, index: i})}
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
