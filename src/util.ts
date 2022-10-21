export class Util {

  static displayWidth(): number {
    return document.documentElement.clientWidth;
  }

  static displayHeight(): number {
    return document.documentElement.clientHeight;
  }

  static castToInt(num: number): number {
    return Math.trunc(num);
  }

}
