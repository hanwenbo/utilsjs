import React from "react"
import Tool from "../tool"
import View from "../view"
import {ItemProps,ItemClickType} from "../../types";

type Props = {
  canvasSize:{
    width: number
    height: number
  },
  items: ItemProps[],
  onItemsChange: (items: ItemProps[]) => void
  onToolClick: (item: ItemProps) => void
  onItemClick: (e: ItemClickType) => void
}
export default (props:Props) => {
  return <div className={"web-canvas-editor"}>
    <div className={"playground"}>
      <div className={'tool'}>
        <Tool onItemClick={props.onToolClick}/>
      </div>
      <div className={'view'}>
        <View
          canvas={props.canvasSize}
          items={props.items}
          onItemClick={props.onItemClick}
          onItemsChange={props.onItemsChange}
        />
      </div>
      <div className={'control'}>
      </div>
    </div>
  </div>
}
