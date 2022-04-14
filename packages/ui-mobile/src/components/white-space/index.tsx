import React from "react";
import {View} from "react-native-web";

export interface WingBlankProps {
  style?: any;
  size: number;
}

class WingBlank extends React.Component<WingBlankProps, any> {
  static defaultProps = {
    size: "lg"
  };

  render() {
    const {size, style} = this.props;
    return <View style={{
      ...style,
      height: size,
    }} />
  }
}

export default WingBlank;
