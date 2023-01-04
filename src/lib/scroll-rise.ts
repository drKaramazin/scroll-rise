import { Util } from './util';
import { Scene, SceneOptions } from './scenes/scene';

export class ScrollRise {

  private initialized = false;
  private ticking = false;
  private scrollListener?: (() => void);
  private resizeListener?: (() => void);

  private displayWidth: number;
  private displayHeight: number;

  constructor(
    public scene: Scene<SceneOptions>,
  ) {
    this.saveDisplaySize();
    this.init();
    this.tick();
  }

  saveDisplaySize(): void {
    this.displayWidth = Util.clientWidth();
    this.displayHeight = Util.clientHeight();
  }

  isNeedResize(): boolean {
    return true;
  }

  tick(): void {
    if (!this.ticking) {
      window?.requestAnimationFrame(() => {
        this.render(this.scene.elementY());
        this.ticking = false;
      });

      this.ticking = true;
    }
  }

  pos(scrollPos: number): number {
    return -(scrollPos + this.scene.offset());
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

  render(scrollPos: number): void {
    for (const actor of this.scene.actors) {
      actor.render(this.pos(scrollPos), this.scene);
    }
  }

}
