import classNames from "classnames";
import styles from "./index.less";
import {ProTable} from "@ant-design/pro-components";
import React from "react";
import {RequestType} from "../../../types";

type Props = any & {
  service:RequestType
  paddingClear:boolean
}
export const TableList = (props: Props) => {
  const {service, paddingClear, ..._props} = props || {};
  const defaultProps = {
    rowKey: 'id',
    search: {labelWidth: 'auto'},
    scroll: {x: 2000}
  };

  let newObj = {};

  if (service) {
    newObj['request'] = async (params: any, sorter: any, filter: any) => {
      const res = await service(params, sorter, filter);
      return {
        data: res.result.list,
        success: true,
        total: res.result.total_number,
      };
    }
  }

  const style = classNames(styles.main, paddingClear ? styles.paddingFalse : null)
  return <>
    <div className={style}>
      <ProTable
        {...newObj}
        {...defaultProps}
        {..._props}
      />
    </div>
  </>;
};

