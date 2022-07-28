import React, {useState, useEffect} from "react"
import Tool from "../tool"
import View from "../view"
import Control from "../control"
import {ItemProps, ItemClickType} from "../../types";
import clone from "clone"

type Props = {
  currentIndex: number
  onIndexChange: (index: number) => void
  canvasSize: {
    width: number
    height: number
  },
  items: ItemProps[],
  onItemsChange: (items: ItemProps[]) => void
  onToolClick: (item: ItemProps) => void
  onItemClick: (e: ItemClickType) => void
}
export default (props: Props) => {
  const [current, setCurrent] = useState<ItemProps>(props.items[props.currentIndex])

  useEffect(() => {
    setCurrent(props.items[props.currentIndex])
  }, [props.currentIndex]);


  const onItemChange = (item:ItemProps)=>{
    let _items = clone(props.items);
    _items[props.currentIndex] = item
    props.onItemsChange(_items);
    setCurrent(item)
  }


  const onIndexChange = (index: number) => {
    props.onIndexChange(index)
    const _item = clone(props.items[index]);
    setCurrent(_item)
  }

  return <div className={"web-canvas-editor"}>
    <div className={"playground"}>
      <div className={'tool'}>
        <Tool onItemClick={props.onToolClick} />
      </div>
      <div className={'view'}>
        <View
          currentIndex={props.currentIndex}
          canvas={props.canvasSize}
          items={props.items}
          onItemChange={onItemChange}
          onIndexChange={onIndexChange}
        />
      </div>
      <div className={'control'}>
        <Control
          current={current}
          onItemChange={onItemChange}
        />
      </div>
    </div>
  </div>
}
