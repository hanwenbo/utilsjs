import {Colors} from './color';
import _ from "@hanwenbo/object";
import merge from "deepmerge";

export const theme = {
  Text: {
    default: {},
    primary: {color: Colors.primary},
    success: {color: Colors.success},
    danger: {color: Colors.danger},
    warning: {color: Colors.warning},
    white: {color: "#FFFFFF"},
    dark: {color: "#000"},
    h1: {fontSize: 38, lineHeight: 46, color: "#000", fontWeight: "600"},
    h2: {fontSize: 30, lineHeight: 40, color: "#000", fontWeight: "600"},
    h3: {fontSize: 30, lineHeight: 32, color: "#000", fontWeight: "600"},
    h4: {fontSize: 20, lineHeight: 28, color: "#000", fontWeight: "600"},
    h5: {fontSize: 16, lineHeight: 24, color: "#000", fontWeight: "600"},
  },
  // 没有大写开头
  // button的样式
  Button: {
    default: {
      borderWidth: 1,
      borderColor: Colors.border,
      backgroundColor: Colors.white
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
    disabled:{},
    dashed: {
      borderStyle: "dashed",
    },
    link: {
      borderWidth: 0
    },
    bold: {},
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
    fillNone:{
      borderWidth:0,
      backgroundColor:"transparent",
    },
    // shape
    round: {
      borderRadius: 100
    },
    rectangular: {
      borderRadius: 0,
    },
    Text: {
      default: {},
      primary: {
        color: "#FFFFFF",
      },
      success: {
        color: "#FFFFFF",
      },
      danger: {
        color: "#FFFFFF",
      },
      warning: {
        color: "#FFFFFF",
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
      link: {
        color: Colors.primary,
      },
      bold: {
        fontWeight: "bold",
      },
      disabled:{
        color:'red',
      }
    }
  },
  Space: {
    vertical: {
      flexDirection: "column",
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
  Mask: {
    default: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    thin: {
      backgroundColor: "rgba(0,0,0,0.35)",
    },
    thick: {
      backgroundColor: "rgba(0,0,0,0.75)",
    },
  },
  Modal: {},
  TextInput: {}
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
themeManager.loadTheme(theme)

export const getComponentTheme = (key: string): object => {
  return themeManager[key] = themeManager[key] || {};
}
export default themeManager


