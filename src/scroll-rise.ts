import { SMCanvas } from './canvas';

export class ScrollRise {

  private lastKnownScrollPosition = 0;
  private ticking = false;
  private scrollListener: (() => void) | undefined;
  private resizeListener: (() => void) | undefined;

  constructor(
    public canvas: SMCanvas,
  ) {
    this.init();
    this.tick();
  }

  tick() {
    this.lastKnownScrollPosition = window?.scrollY;
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
    for (const widget of this.canvas.list) {
      widget.render(scrollPos);
    }
  }

}
