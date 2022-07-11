import React from "react";
import {message} from "antd";

export type requestParamsType = {
  service: (data?: {}) => Promise<{
    code: number,
    msg: string,
    result: any[] | any
  }>
  params?: any,
  onSuccess: (res: any) => any,
}
export const onRequest = async (p: requestParamsType) => {
  const defaultProps = {
    params: {},
  }
  const props = {...defaultProps, ...p}
  const res = await props.service(props.params)
  if (res.code === 0) {
    return props.onSuccess(res)
  }

  message.error(`${res?.msg}`)
  return null
}
export type finishParamsType = {
  service: (data?: {}) => Promise<{
    code: number,
    msg: string,
    result: any[] | any
  }>
  params?: any,
  successMessage?: {
    title: string,
  },
  onSuccess?: (res: any) => any,
}
export const onFinish = async (p: finishParamsType) => {
  const defaultProps = {
    params: {},
    successMessage: {title: "已保存"},
    onSuccess: (_: any) => {
    }
  }
  const props = {...defaultProps, ...p}
  const res = await props.service(props.params)
  if (res.code === 0) {
    if (props.successMessage) {
      message.success(props.successMessage.title)
    }
    props.onSuccess(res)
    return true
  }

  message.error(`${res?.msg}`)
  return true
}

export interface FormBetaProps {
  style?: any;
  size: number;
}

export const FormBeta = (p: FormBetaProps) => {
  return <div />
}

