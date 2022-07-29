import React, {useState} from 'react'
import {Playground,ViewDisplay} from "@hanwenbo/web-canvas-editor"
import "@hanwenbo/web-canvas-editor/style/index.less"
import clone from "clone"

const defaultItems = [
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
]
export default () => {
  const [items, setItems] = useState(defaultItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canvasSize, setCanvasSize] = useState( {width: 375, height: 375});
  const onToolClick = (e: { type: string }) => {
    const {type} = e
    let _items = []
    const zIndex = items.length + 1
    switch (type) {
      case "text":
        _items = clone([
          ...items,
          {
            type: "text",
            style: {
              left: 0,
              top: 0,
              width: 100,
              height: 18,
              fontSize: 14,
              lineHeight: 1.5,
              fontWeight: "normal",
              color: "#000",
              zIndex
            },
            link: {
              action: "doNotJump",
              params: {}
            },
            children: "我是文字"
          }
        ])
        setItems(_items)
        break
      case "image":
        _items = clone([
          ...items,
          {
            type: "image",
            style: {left: 0, top: 0, width: 100, height: 100, zIndex},
            src: "http://mojiim-static.oss-cn-beijing.aliyuncs.com/goods.png",
            link: {
              action: "doNotJump",
              params: {}
            },
          }
        ])
        setItems(_items)
        break
      case "hotArea":
        _items = clone([
          ...items,
          {
            type: "hotArea",
            style: {left: 0, top: 0, width: 100, height: 100, zIndex,},
            link: {
              action: "doNotJump",
              params: {}
            },
          }
        ])
        setItems(_items)
        break
    }
    setCurrentIndex(_items.length - 1)
  }
  const onItemsChange = (_items)=>{
    setItems(_items)
  }
  return <>
    <Playground
      canvasSize={canvasSize}
      items={items}
      currentIndex={currentIndex}
      onIndexChange={setCurrentIndex}
      onItemsChange={onItemsChange}
      onToolClick={onToolClick}
      onCanvasSizeChange={setCanvasSize}
    />
    <ViewDisplay
      canvas={canvasSize}
      items={items}
    />
  </>
}
