import React, {useState} from "react";
import {Drawer} from "antd"
import {ProDescriptionsItemProps,ProDescriptions} from "@ant-design/pro-components";

type Props = {
  info: any;
  columns: ProDescriptionsItemProps[];
  onSuccess?: () => void;
}
export const Detail = (props: Props) => {
  const {info, columns} = props
  const [visible, setVisible] = useState<boolean>(false);
  return <div>
    <a onClick={() => {
      setVisible(true)
    }}>详情</a>
    <Drawer
      width={600}
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
      closable={false}
    >
      {visible && !!info && (
        <ProDescriptions
          column={1}
          request={async () => ({
            data: info || {},
          })}
          columns={columns as ProDescriptionsItemProps[]}
        />
      )}
    </Drawer>
  </div>
}

export default Detail
