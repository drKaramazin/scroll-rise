import { Util } from './util';
import { SceneModel, SceneOptions } from './models/scenes/scene.model';

export class ScrollRise {

  private ticking = false;
  private scrollListener: (() => void) | undefined;
  private resizeListener: (() => void) | undefined;

  private displayWidth: number;
  private displayHeight: number;

  constructor(
    public scene: SceneModel<SceneOptions>,
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
    return true;
  }

  tick() {
    if (!this.ticking) {
      window?.requestAnimationFrame(() => {
        this.render(this.scene.elementY());
        this.ticking = false;
      });

      this.ticking = true;
    }
  }

  pos(scrollPos: number): number {
    return scrollPos + this.scene.offset();
  }

  scroll() {
    this.tick();
  }

  resize() {
    if (this.isNeedResize()) {
      this.scene.resizeHeight();
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
    for (const actor of this.scene.actors) {
      actor.render(-this.pos(scrollPos), this.scene);
    }
  }

}
