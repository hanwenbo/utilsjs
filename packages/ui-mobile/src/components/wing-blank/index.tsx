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
        const {size, style, children} = this.props;
        return <View style={{
            ...style,
            marginLeft: size,
            marginRight: size
        }}>
            {children}
        </View>
    }
}

export default WingBlank;
