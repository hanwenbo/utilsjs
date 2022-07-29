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
  onCanvasSizeChange: (canvasSize: { width: number, height: number }) => void
  items: ItemProps[],
  onItemsChange: (items: ItemProps[]) => void
  onToolClick: (item: ItemProps) => void
  onItemClick: (e: ItemClickType) => void
  renderTextVariableControl?: (_: ProFormInstance | any) => React.ReactElement
  renderLinkActionControl?: () => React.ReactElement
  renderImageControl?: () => React.ReactElement
  renderViewFooter?: () => React.ReactElement
  renderViewHeader?: () => React.ReactElement
}
export default (p: Props) => {
  const [current, setCurrent] = useState<ItemProps>(p.items[p.currentIndex])
  const defaultProps = {
    renderLinkActionControl: () => <></>,
    renderImageControl: () => <></>,
    renderTextVariableControl: (_: ProFormInstance | any) => <></>,
    renderViewFooter: () => <></>,
    renderViewHeader: () => <></>,
  }
  const props = {...defaultProps, ...p}

  useEffect(() => {
    setCurrent(props.items[props.currentIndex])
  }, [props.currentIndex]);


  const onItemChange = (item: ItemProps) => {
    let _items = clone(props.items);
    if(!!_items[props.currentIndex]){
      _items[props.currentIndex] = item
      onItemsChange(_items);
      setCurrent(item)
    }
  }

  const onIndexChange = (index: number) => {
    props.onIndexChange(index)
    if(!!props.items[index]) {
      const _item = clone(props.items[index]);
      setCurrent(_item)
    }
  }

  const onDelete = () => {
    props.items.splice(props.currentIndex, 1);
    onItemsChange(props.items);
    onIndexChange(props.currentIndex - 1);
  }

  const onItemsChange = (items) => {
    props.onItemsChange(clone(items))
  }
  return <div className={"web-canvas-editor"}>
    <div className={"playground"}>
      <div className={'tool'}>
        <Tool onItemClick={props.onToolClick} />
      </div>
      <div className={"view-control"}>
        <div className={'view'}>
          <View
            currentIndex={props.currentIndex}
            canvas={props.canvasSize}
            items={props.items}
            onItemChange={onItemChange}
            onIndexChange={onIndexChange}
            onCanvasSizeChange={props.onCanvasSizeChange}
            renderViewFooter={props.renderViewFooter}
            renderViewHeader={props.renderViewHeader}
          />
        </div>
        {props.items.length > 0 && !!current && <div className={'control'}>
          <Control
            current={current}
            onItemChange={onItemChange}
            renderLinkActionControl={props.renderLinkActionControl}
            renderTextVariableControl={props.renderTextVariableControl}
            renderImageControl={props.renderImageControl}
            onDelete={onDelete}
          />
        </div>}
      </div>
    </div>
  </div>
}
