import Typography from "../style/typography"
import Color from "../style/color"
import Obj from "@hanwenbo/object"
import View from "../style/view"

export function extractTypographyValue(props: any): object | undefined {
  let typography: any;
  Obj.forEach(Typography, (key, value) => {
    if (props[key] === true) {
      typography = {...typography, ...value};
    }
  });
  return typography;
}


export function extractViewValue(props: any): object | undefined {
  let view: any;
  Obj.forEach(View, (key, value) => {
    if (props[key] === true) {
      view = {...view, ...value};
    }
  });
  return view;
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
