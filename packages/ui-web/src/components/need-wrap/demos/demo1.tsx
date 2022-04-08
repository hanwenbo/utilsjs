import React, {useState} from 'react';
import {Space, NeedWrap, View, Button, Text} from '@hanwenbo/ui-web';

export default () => {
  const [need, setNeed] = useState(true);
  return (
    <Space vertical size={'10px'} alignItems={'flex-start'}>
      <NeedWrap wrap={View} need={need} wrapProps={{
        style: {
          borderWidth: 1,
          borderColor: "red",
          margin: 15,
        }
      }}>
        <View style={{width: 100, height: 100, background: '#fff'}}>
          <Text>我是内容</Text>
        </View>
      </NeedWrap>
      <Button primary onPress={() => setNeed(!need)}>
        切换是否需要包装
      </Button>
    </Space>
  );
};
