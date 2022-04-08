import React from 'react';
import { TextInput, View, ThemeManager,Text } from "@hanwenbo/ui-web"

export default () => {
  const [value, onChangeText] = React.useState('Useless Placeholder');
  return <View>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
    <Text>{value}</Text>
  </View>
}
