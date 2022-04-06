import {Colors} from './color';
import _ from "@hanwenbo/object";
import merge from "deepmerge";

export const theme = {
  // 没有大写开头
  // button的样式
  Button: {
    default: {
      borderWidth: 1,
      borderColor: Colors.border,
    },
    primary: {
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
    },
    success: {
      backgroundColor: Colors.success,
      borderColor: Colors.success,
    },
    danger: {
      backgroundColor: Colors.danger,
      borderColor: Colors.danger,
    },
    warning: {
      backgroundColor: Colors.warning,
      borderColor: Colors.warning,
    },
    dashed:{
      borderStyle:"dashed",
    },
    link:{
      borderWidth:0
    },
    mini: {
      paddingHorizontal: 12,
      paddingVertical: 3,
      borderRadius: 5,
    },
    small: {
      paddingHorizontal: 12,
      paddingVertical: 3,
      borderRadius: 5,
    },
    middle: {
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 5,
    },
    large: {
      paddingHorizontal: 12,
      paddingVertical: 11,
      borderRadius: 5,
    },
    // shape
    round:{
      borderRadius:100
    },
    rectangular:{
      borderRadius:0,
    },
    Text: {
      default: {
      },
      primary: {
        color:"#FFFFFF",
      },
      success: {
        color:"#FFFFFF",
      },
      danger: {
        color:"#FFFFFF",
      },
      warning: {
        color:"#FFFFFF",
      },
      mini: {
        fontSize: 12,
      },
      small: {
        fontSize: 13,
      },
      middle: {
        fontSize: 14,
      },
      large: {
        fontSize: 18,
      },
      link:{
        color: Colors.primary,
      }
    }
  },
  View: {
    row: {
      flexDirection: 'row',
    },
    middle: {
      alignItems: "center",
    },
    center: {
      justifyContent: "center",
    },
  },
}

class ThemeManager {
  Button = {}

  loadTheme(themeObject: object) {
    let _theme = merge(theme, themeObject)
    _.forEach(_theme, (key, value) => {
      this[key] = value;
    });
  }
}

const themeManager = new ThemeManager();

export const getComponentTheme = (key: string): object => {
  return themeManager[key] = themeManager[key] || {};
}
export default themeManager


