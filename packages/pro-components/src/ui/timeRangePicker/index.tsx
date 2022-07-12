import React from "react"
import {TimePicker} from "antd";
import dayjs from "dayjs";

const format = "HH:mm"
const TimeRangePicker = (props: any) => {
  let {value, placeholder, onChange} = props || {}
  if (!Array.isArray(placeholder)) {
    placeholder = ['开始时间', '结束时间']
  }

  const _onChange = (_moment: any, strs: []) => {
    onChange(strs.join('~'))
  }

  if (!!value && typeof value === "string") {
    let ex = value.split('~')
    value = [dayjs(`2021-11-25 ${ex[0]}`), dayjs(`2021-11-25 ${ex[1]}`)]
  }
  return <TimePicker.RangePicker
    format={format} {...props} placeholder={placeholder}
    value={value ?? dayjs()}
    onChange={_onChange} />
}
export default TimeRangePicker
