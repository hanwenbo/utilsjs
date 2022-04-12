// @ts-ignore
import {StyleSheet, ViewStyle, TextStyle, TouchableOpacityStyle} from "react-native-web";
import Obj from "@hanwenbo/object";

type Style = ViewStyle | TextStyle | TouchableOpacityStyle;

export function classNames(styles: StyleSheet, ...args: Style): Style {
  let attr = {}
  Obj.forEach(args, (key, v) => {
    const value = styles?.[key]
    if (typeof key === "string" && v === true && !!value) {
      attr = {...attr, ...value};
    }
  });
  return attr
}
