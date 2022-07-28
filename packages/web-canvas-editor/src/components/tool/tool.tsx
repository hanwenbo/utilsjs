import React from "react"
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import PictureOutlined from '@ant-design/icons/PictureOutlined';
import GatewayOutlined from '@ant-design/icons/GatewayOutlined';
import {Col, Row} from 'antd';

type ToolItemType = {
  label: string
  type: string
  icon: React.ReactNode
}
type Props = {
  items?: ToolItemType[]
  onItemClick?: (item: ToolItemType) => void
}
export const Tool = (p: Props) => {
  const defaultProps = {
    items: [
      {label: "文字", "icon": <MessageOutlined />, 'type': 'text'},
      {label: "图片", "icon": <PictureOutlined />, 'type': 'image'},
      {label: "热区", "icon": <GatewayOutlined />, 'type': 'hotArea'},
    ],
    onItemClick: (_: ToolItemType) => {}
  }
  const props = {...defaultProps, ...p}
  return <Row gutter={[16, 16]} className={"web-canvas-editor-tool"}>
    {props.items.map((item, index) => {
      return <Col span={12} className={"item"} key={index} onClick={() => props?.onItemClick?.(item)}>
        <Row gutter={5} justify={'center'} align={'middle'}>
          <Col span={24}>{item.icon}</Col>
          <Col span={24}>{item.label}</Col>
        </Row>
      </Col>
    })}
  </Row>
}
