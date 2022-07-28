import React, {useEffect, useRef} from "react"
import {
  ProForm,
  ProFormDigit,
  ProFormInstance
} from '@ant-design/pro-components';

type Props = {
  values: any
  renderImageControl?: () => React.ReactElement
  renderLinkActionControl?: () => React.ReactElement
  onValuesChange?: (values: any) => void
}
export default React.forwardRef((p: Props, ref) => {
  const defaultProps = {
    values: {
      style: {
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        zIndex: 0,
      },
      src: ""
    },
    renderLinkActionControl: () => <></>,
    renderImageControl: () => <></>,
    onValuesChange: (_: any) => {
    }
  }

  const props = {...defaultProps, ...p}
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    formRef?.current?.setFieldsValue(props.values);

  }, [props.values])

  const onValuesChange = (_: any) => {
    props.onValuesChange(formRef?.current?.getFieldsValue())
  }

  return <div className={"control"}>
    <ProForm onValuesChange={onValuesChange} formRef={formRef}>
      <ProForm.Group>
        <ProFormDigit width="xs" name={['style','left']} label="x" />
        <ProFormDigit width="xs" name={['style', 'top']} label="y" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit width="xs" name={['style', 'width']} label="宽" />
        <ProFormDigit width="xs" name={['style', 'height']} label="高" />
      </ProForm.Group>
      <ProForm.Item name={'src'} label='图片'>
        {props.renderImageControl()}
      </ProForm.Item>
      <ProForm.Item name={'link'} label='链接'>
        {props.renderLinkActionControl()}
      </ProForm.Item>
    </ProForm>
  </div>
})
