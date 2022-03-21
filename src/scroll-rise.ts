import { SRCanvas } from './canvas';
import { Util } from './util';

export class ScrollRise {

  private ticking = false;
  private scrollListener: (() => void) | undefined;
  private resizeListener: (() => void) | undefined;

  private displayWidth: number;
  private displayHeight: number;

  constructor(
    public canvas: SRCanvas,
  ) {
    this.saveDisplaySize();
    this.init();
    this.tick();
  }

  saveDisplaySize() {
    this.displayWidth = Util.displayWidth();
    this.displayHeight = Util.displayHeight();
  }

  isNeedResize(): boolean {
    // console.log(this.displayWidth, Util.displayWidth(), this.displayHeight, Util.displayHeight());
    return this.displayWidth !== Util.displayWidth();
  }

  tick() {
    if (!this.ticking) {
      window?.requestAnimationFrame(() => {
        this.render(this.canvas.elementY());
        this.ticking = false;
      });

      this.ticking = true;
    }
  }

  pos(scrollPos: number): number {
    return scrollPos + this.canvas.offset();
  }

  scroll() {
    this.tick();
    this.canvas.scroll(this.canvas.elementY());
  }

  resize() {
    console.log('Resize');
    if (this.isNeedResize()) {
      this.canvas.resizeHeight();
      this.tick();
    }
  }

  private init() {
    this.scrollListener = this.scroll.bind(this);
    window?.addEventListener('scroll', this.scrollListener);
    this.resizeListener = this.resize.bind(this);
    window?.addEventListener('resize', this.resizeListener);
  }

  stop() {
    if (this.scrollListener) {
      window?.removeEventListener('scroll', this.scrollListener);
    }
    if (this.resizeListener) {
      window?.removeEventListener('resize', this.resizeListener);
    }
  }

  render(scrollPos: number) {
    const pos = this.pos(scrollPos);
    if (pos < 0) {
      for (const widget of this.canvas.list) {
        widget.render(-pos);
      }
    }
  }

}
