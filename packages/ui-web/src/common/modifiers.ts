import Typography from "../style/typography"
import Color from "../style/color"
import Obj from "@hanwenbo/object"
import View from "../style/view"
import Button from "../style/button"

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

export function extractButtonValue(props: any): object | undefined {
  let attr: any;
  Obj.forEach(Button, (key, value) => {
    if (props[key] === true) {
      attr = {...attr, ...value};
    }
  });
  return attr;
}

export function extractButtonTextValue(props: any): object | undefined {
  let attr: any;
  Obj.forEach(Button.textStyle, (key, value) => {
    if (props[key] === true) {
      attr = {...attr, ...value};
    }
  });
  return attr;
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
