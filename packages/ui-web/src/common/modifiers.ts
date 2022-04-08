import Color from "../style/color"
import Obj from "@hanwenbo/object"
import themeManager from "../style/themeManager";

export function extractStyle(componentName: string | string[], props: any): object | undefined {
  let attr: any;
  let _themeManager = themeManager
  if (Array.isArray(componentName)) {
    componentName.forEach((name) => {
      _themeManager = _themeManager[name]
    })
  } else {
    _themeManager = themeManager[componentName]
  }
  Obj.forEach(props, (key, v) => {
    const value = _themeManager[key]
    if (typeof key === "string" && v === true && !!value) {
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
