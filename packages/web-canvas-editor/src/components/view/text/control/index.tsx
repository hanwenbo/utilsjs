import React, {useEffect, useRef} from "react"
import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormInstance
} from '@ant-design/pro-components';

type Props = {
  values: any
  renderTextVariableControl?: (_:ProFormInstance|any) => React.ReactElement
  renderLinkActionControl?: () => React.ReactElement
  onValuesChange?: (values: any) => void
}
export default React.forwardRef((p: Props, ref) => {
  const defaultProps = {
    values: {
      style:{
        left: 0,
        top: 0,
        width: 80,
        height: 16,
        zIndex: 0,
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: "left",
        lineHeight: 16,
      },
      children:"文字"
    },
    renderLinkActionControl: () => <></>,
    renderTextVariableControl: (_:ProFormInstance|any) => <></>,
    onValuesChange: (_: any) => {
    }
  }

  const props = {...defaultProps, ...p}
  const formRef = useRef<ProFormInstance|any>();
  useEffect(() => {
    formRef?.current?.setFieldsValue(props.values);
  }, [props.values])
  return <div className={"control"}>
    {/* @ts-ignore*/}
    <ProForm initialValues={props.values} onValuesChange={props.onValuesChange} formRef={formRef}>
      <ProForm.Group>
        <ProFormDigit width="xs" name="style.left" label="x"  />
        <ProFormDigit width="xs" name="style.top" label="y" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit width="xs" name="style.width" label="宽" />
        <ProFormDigit width="xs" name="style.height" label="高" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit width="xs" name="style.lineHeight" label="行高" />
        <ProFormDigit width="xs" name="style.fontSize" label="字体大小" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="xs"
          name="style.fontWeight"
          label="字体粗细"
          initialValue={'normal'}
          valueEnum={new Map([
            ["normal", "默认"],
            ["bold", "粗"],
            ["100", "100"],
            ["200", "200"],
            ["300", "300"],
            ["400", "400"],
            ["500", "500"],
            ["600", "600"],
            ["700", "700"],
            ["800", "800"],
            ["900", "900"],
          ])}
        />
        <ProFormSelect
          width="xs"
          name="style.textAlign"
          label="文字对齐"
          initialValue={'normal'}
          valueEnum={new Map([
            ["left", "居左"],
            ["center", "居中"],
            ["right", "居右"],
          ])}
        />
      </ProForm.Group>
      <ProFormText name="children" label="文本内容" />
      {props.renderTextVariableControl(formRef)}
      <ProForm.Item name={'link'} label='链接'>
        {props.renderLinkActionControl()}
      </ProForm.Item>
    </ProForm>
  </div>
})
