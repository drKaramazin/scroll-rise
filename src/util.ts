import { Size } from './models/size.model';
import { Measure } from './models/measure';

export class Util {

  static displayWidth(): number {
    return document.documentElement.clientWidth;
  }

  static displayHeight(): number {
    return document.documentElement.clientHeight;
  }

  static vmin(percent: number = 1): number {
    return (Math.min(this.displayWidth(), this.displayHeight()) / 100) * percent;
  }

  static asmSize(cssValue: string): Size | undefined {
    const result = cssValue.match(/(\d+\.?\d*)(\D+)/);
    if (!result) {
      return undefined;
    }
    return {
      value: Number(result[1]),
      measure: result[2],
    };
  }

  static px(cssValue: string): number | undefined {
    const size = this.asmSize(cssValue);
    switch (size?.measure) {
      case Measure.px:
        return size.value;
      case Measure.vmin:
        return this.vmin(size.value);
    }
    return undefined;
  }

}
