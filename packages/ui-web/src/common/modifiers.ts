import Typography from "../style/typography"
import Color from "../style/color"
import Obj from "@hanwenbo/object"

export function extractTypographyValue(props: any): object | undefined {
  let typography: any;
  Obj.forEach(Typography, (key, value) => {
    if (props[key] === true) {
      // 合并样式
      typography = {...typography, ...value};
    }
  });
  return typography;
}

export function extractColorValue(props: any): string | undefined {
  let color: any;
  Obj.forEach(Color, (key, value) => {
    if (props[key] === true) {
      color = value;
    }
  });
  return color;
}
