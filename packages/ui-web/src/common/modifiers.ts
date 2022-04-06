import Typography from "../style/typography"
import Color from "../style/color"
import Obj from "@hanwenbo/object"
import View from "../style/view"
import Button from "../style/button"
import themeManager from "../style/themeManager";

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

export function extractStyle(componentName:string|string[],props: any): object | undefined {
  let attr: any;
  let _themeManager = themeManager
  if(Array.isArray(componentName)){
    componentName.forEach((name)=>{
      _themeManager = _themeManager[name]
    })
  }else{
    _themeManager = themeManager[componentName]
  }
  Obj.forEach(_themeManager, (key, value) => {
    if (props[key] === true) {
      attr = {...attr, ...value};
    }
  });
  return attr;
}

export function extractButtonValue(props: any): object | undefined {
  let attr: any;
  let _attrs  = themeManager.Button;
  Obj.forEach(_attrs, (key, value) => {
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
