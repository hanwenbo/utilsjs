import React from "react";
import {Upload, Button, Typography, Space, UploadFile} from "antd";
import {ModalForm} from "@ant-design/pro-components";
import {UploadChangeParam} from "antd/lib/upload";

const {Paragraph, Text} = Typography;

export default (props: any) => {
  let {
    name = 'excel_file',
    action = '',
    template = {
      url: '',
      text: '下载导入模板',
      tips: []
    },
    onSuccess,
  } = props || {}
  // let action = "/admin/employees/importGoods";
  // @ts-ignore
  action = process.env.NODE_ENV === "production" ? process.env.production.api.url + action : action;
  // @ts-ignore
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {"Access-Token": token.accessToken};

  const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
    let fileList = info.fileList;
    fileList.filter(_file => {
      onSuccess && onSuccess()
      return true;
    });
  };
  // @ts-ignore
  return (
    <Space>
      <Upload
        accept={".xlsx"}
        name={name}
        action={action}
        headers={headers}
        onChange={e => {
          onChange(e);
        }}
        fileList={[]}
        listType={"text"}
        data={{type: 1}}
      >
        <Button
          type="default"
        >
          导入
        </Button>
      </Upload>
      <ModalForm
        title="Excel格式说明"
        trigger={<a>说明</a>}
        modalProps={{
          onCancel: () => console.log('run'),
        }}
        onFinish={async (_values) => {
          return true;
        }}
      >
        <Typography>
          <Paragraph>
            <ul>
              {Array.isArray(template.tips) && template?.tips.map((text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => {
                return <li>
                  <Text>{text}</Text>
                </li>
              })}
              <li>
                <a href={template.url} target="_blank">{template?.text}</a>
              </li>
            </ul>
          </Paragraph>
        </Typography>
      </ModalForm>
    </Space>
  );
}

