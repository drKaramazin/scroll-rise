export class ScrollMotionSpeed {

  private mouseupListener: (() => void) | undefined;
  private mousedownListener: (() => void) | undefined;
  private mousewheelListener: ((e: any) => void) | undefined;

  constructor(
    public container: HTMLElement,
    protected options?: {
      deltaY?: number,
      limitY?: number,
      excludeIds?: string[],
    }
  ) {}

  handleScrollReset() {
    scrollY = this.container.scrollTop;
  }

  exclude(e: any): any {
    if (this.options?.excludeIds?.length) {
      return document.elementsFromPoint(e.clientX, e.clientY).find(element => this.options?.excludeIds?.includes(element.id));
    }
  }

  handleMouseWheel(e: any) {
    if (!this.exclude(e)) {
      e.preventDefault();
      let delta = e.deltaY;
      delta = this.options?.deltaY ? delta * this.options.deltaY : delta;
      if (this.options?.limitY && Math.abs(delta) > this.options.limitY) {
        delta = delta > 0 ? this.options.limitY : -this.options.limitY;
      }
      scrollY += delta;
      if (scrollY > 0) {
        var limitY = this.container.scrollHeight - this.container.clientHeight;
        if (scrollY > limitY) {
          scrollY = limitY;
        }
      }
      window?.scrollTo(0, scrollY);
    }
  }

  init() {
    this.mouseupListener = this.handleScrollReset.bind(this);
    this.mousedownListener = this.handleScrollReset.bind(this);
    this.mousewheelListener = this.handleMouseWheel.bind(this);
    this.container.addEventListener('mouseup', this.mouseupListener, false);
    this.container.addEventListener('mousedown', this.mousedownListener, false);
    this.container.addEventListener('mousewheel', this.mousewheelListener, {
      passive: false,
    });
  }

  stop() {
    if (this.mouseupListener) {
      this.container.removeEventListener('mouseup', this.mouseupListener);
    }
    if (this.mousedownListener) {
      this.container.removeEventListener('mousedown', this.mousedownListener);
    }
    if (this.mousewheelListener) {
      this.container.removeEventListener('mousewheel', this.mousewheelListener);
    }
  }

}
