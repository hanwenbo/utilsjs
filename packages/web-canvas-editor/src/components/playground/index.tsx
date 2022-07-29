import React, {useState, useEffect} from "react"
import Tool from "../tool"
import View from "../view"
import Control from "../control"
import {ItemProps, ItemClickType} from "../../types";
import clone from "clone"
import {ProFormInstance} from "@ant-design/pro-components";

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
  renderTextVariableControl?: (_: ProFormInstance | any) => React.ReactElement
  renderLinkActionControl?: () => React.ReactElement
}
export default (p: Props) => {
  const [current, setCurrent] = useState<ItemProps>(p.items[p.currentIndex])
  const defaultProps = {
    renderLinkActionControl: () => <></>,
    renderTextVariableControl: (_: ProFormInstance | any) => <></>,
  }
  const props = {...defaultProps, ...p}

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
          renderLinkActionControl={props.renderLinkActionControl}
          renderTextVariableControl={props.renderTextVariableControl}
        />
      </div>
    </div>
  </div>
}
