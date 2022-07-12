import React, {useState} from 'react';
import {AutoComplete as AntAutoComplete, Input} from 'antd';
import {APILoader, AutoComplete} from '@pansy/react-amap';

type Props = {
  value?: string
  onAddressSelect: (item: AMap.AutoComplete.Tip) => void;
}
export default (props: Props) => {
  const [autoComplete, setAutoComplete] = useState<AMap.AutoComplete>();
  const [options, setOptions] = useState([]);

  const handleSearch = (value: string) => {
    if (!autoComplete) return;

    autoComplete.search(value, (status, results) => {
      console.log("handleSearch", results)

      if (status === 'complete') {
        // @ts-ignore
        setOptions(results.tips.filter((item) => item.id).map(renderItem));
      }
    })
  }

  const onAddressSelect = (item: AMap.AutoComplete.Tip) => {
    props.onAddressSelect(item)
  }
  const renderItem = (item: AMap.AutoComplete.Tip) => {
    return {
      ...item,
      value: item.name,
      key: item.id,
      label: (
        <div onClick={() => onAddressSelect(item)}>
          {item.name}
          <span style={{paddingLeft: 4, color: 'rgba(0, 0, 0, 0.45)'}}>{item.district}</span>
        </div>
      )
    };
  };

  return (
    <APILoader>
      <AutoComplete
        events={{
          created: (obj) => {
            setAutoComplete(obj);
          }
        }}
      />

      <AntAutoComplete
        onSearch={handleSearch}
        options={options}
      >
        <Input.Search
          placeholder="请输入地址"
          style={{
            width: 400
          }}
          value={props?.value}
        />
      </AntAutoComplete>
    </APILoader>
  )
}
