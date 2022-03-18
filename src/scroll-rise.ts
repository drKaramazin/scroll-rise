import { SRCanvas } from './canvas';

export class ScrollRise {

  private ticking = false;
  private scrollListener: (() => void) | undefined;
  private resizeListener: (() => void) | undefined;

  constructor(
    public canvas: SRCanvas,
  ) {
    this.init();
    this.tick();
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

  scroll() {
    this.tick();
  }

  resize() {
    this.canvas.init();
    this.tick();
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
    const pos = this.canvas.offset() ? scrollPos + this.canvas.offset() : scrollPos;
    console.log(pos);
    if (pos < 0) {
      for (const widget of this.canvas.list) {
        widget.render(-pos);
      }
    }
  }

}
