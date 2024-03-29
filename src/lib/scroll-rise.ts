import { Util } from './util';
import { Scene, SceneOptions } from './scenes/scene';
import { Wrapped } from './decorators/wrapped';

declare const VERSION: string;

export interface ScrollRiseOptions {
  optimizeResizing: boolean;
}

export class ScrollRise {

  private initialized = false;
  private ticking = false;
  private scrollListener?: (() => void);
  private resizeListener?: (() => void);

  private clientWidth: number;
  private clientHeight: number;

  constructor(
    public scene: Scene<SceneOptions>,
    protected options?: ScrollRiseOptions,
  ) {
    this.setDefaults();
    this.saveDisplaySize();
    this.init();
    this.tick();
  }

  protected setDefaults(): void {
    this.options = {
      ...this.defaults(),
      ...this.options,
    } as ScrollRiseOptions;
  }

  protected defaults(): ScrollRiseOptions {
    return {
      optimizeResizing: false,
    };
  }

  saveDisplaySize(): void {
    this.clientWidth = Util.clientWidth();
    this.clientHeight = Util.clientHeight();
  }

  isNeedResize(): boolean {
    if (this.options?.optimizeResizing) {
      if (Util.clientWidth() !== this.clientWidth || Util.clientHeight() !== this.clientHeight) {
        this.saveDisplaySize();
        return true;
      }

      return false;
    }

    return true;
  }

  tick(): void {
    if (!this.ticking) {
      window?.requestAnimationFrame(() => {
        this.render();
        this.ticking = false;
      });

      this.ticking = true;
    }
  }

  scroll(): void {
    this.tick();
  }

  resize(): void {
    if (this.isNeedResize()) {
      this.scene.resizeHeight();
      this.scene.redrawMeasuringGrid();
      this.tick();
    }
  }

  private init(): void {
    if (!this.initialized) {
      this.initialized = true;
      this.scrollListener = this.scroll.bind(this);
      window?.addEventListener('scroll', this.scrollListener!);
      this.resizeListener = this.resize.bind(this);
      window?.addEventListener('resize', this.resizeListener!);
      this.tick();
    } else {
      throw new Error('Scroll-Rise has already been initialized');
    }
  }

  stop(): void {
    if (this.initialized) {
      this.initialized = false;
      if (this.scrollListener !== undefined) {
        window?.removeEventListener('scroll', this.scrollListener);
      }
      if (this.resizeListener !== undefined) {
        window?.removeEventListener('resize', this.resizeListener);
      }
    } else {
      throw new Error('Scroll-Rise hasn\'t yet been initialized');
    }
  }

  afterRender: () => void;
  beforeRender: () => void;
  @Wrapped({ before: 'beforeRender', after: 'afterRender' })
  render(): void {
    this.scene.render();
  }

  static version(): string {
    return VERSION;
  }

}
