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
  loadColors(colors: {[key: string]: string}) {
    _.forEach(colors, (key,value) => {
      this[key] = value;
    });
  }
}

const colorObject = new Color();
export default colorObject;
