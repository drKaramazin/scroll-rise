export interface WindowSizes {
  clientWidth: number;
  clientHeight: number;
  innerWidth: number;
  innerHeight: number;
  documentHeight: number;
}

export class Util {

  static displayWidth(): number {
    return this.clientWidth();
  }

  static displayHeight(): number {
    return this.clientHeight();
  }

  static clientWidth(): number {
    return document.documentElement.clientWidth;
  }

  static clientHeight(): number {
    return document.documentElement.clientHeight;
  }

  static innerWidth(): number {
    return window.innerWidth;
  }

  static innerHeight(): number {
    return window.innerHeight;
  }

  static documentHeight(): number {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight,
    );
  }

  static windowSizes(): WindowSizes {
    return {
      clientWidth: this.clientWidth(),
      clientHeight: this.clientHeight(),
      innerWidth: this.innerWidth(),
      innerHeight: this.innerHeight(),
      documentHeight: this.documentHeight(),
    };
  }

  static logWindowSizes(): void {
    console.log('Window size:');
    console.log('document.documentElement.clientWidth, clientHeight', document.documentElement.clientWidth, document.documentElement.clientHeight);
    console.log('document.documentElement.scrollWidth, scrollHeight', document.documentElement.scrollWidth, document.documentElement.scrollHeight);
    console.log('document.body.scrollWidth, scrollHeight', document.body.scrollWidth, document.body.scrollHeight);
    console.log('document.body.offsetWidth, offsetHeight', document.body.offsetWidth, document.body.offsetHeight);
    console.log('document.documentElement.offsetWidth, offsetHeight', document.documentElement.offsetWidth, document.documentElement.offsetHeight);
    console.log('document.body.clientWidth, clientHeight', document.body.clientWidth, document.body.clientHeight);
    console.log('window.innerWidth, innerHeight', window.innerWidth, window.innerHeight);
  }

  static castToInt(num: number): number {
    return Math.trunc(num);
  }

}
