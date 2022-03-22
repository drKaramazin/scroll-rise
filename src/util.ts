export class Util {

  static displayWidth(): number {
    return Math.max(window.innerWidth, document.body.clientWidth);
  }

  static displayHeight(): number {
    return Math.max(window.innerHeight, document.body.clientHeight);
  }

}
