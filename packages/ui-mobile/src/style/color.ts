import _ from '@hanwenbo/object';

export class Color {
  [key: string]: any;

  constructor() {
    const colors = Object.assign({});
    Object.assign(this, colors);
  }

  /**
   * Load custom set of colors
   * arguments:
   * colors - map of keys and colors values e.g {grey10: '#20303C', grey20: '#43515C'}
   */
  loadColors(colors: { [key: string]: string }) {
    _.forEach(colors, (key, value) => {
      this[key] = value;
    });
  }

  getColor(key: string): string {
    return this[key];
  }
}

const colorObject = new Color();

export const Colors = {
  primary: '#1677ff',
  success: '#00b578',
  warning: '#ff8f1f',
  danger: '#ff3141',
  white: '#ffffff',
  weak: '#999999',
  light: '#cccccc',
  border: '#eeeeee',
  text: '#333333',
}
export default colorObject;

