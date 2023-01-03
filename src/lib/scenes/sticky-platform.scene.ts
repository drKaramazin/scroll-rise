import { Actor } from '../actors/actor';
import { Util } from '../util';
import { Scene, SceneOptions } from './scene';
import { TimeFrame } from '../time-frame';

export interface StickyPlatformSceneOptions extends SceneOptions {
  stickyPlatformHeight?: (deviceWidth: number, deviceHeight: number) => number;
}

export class StickyPlatformScene extends Scene<StickyPlatformSceneOptions> {

  public override name = 'StickyPlatformScene';

  public platform: HTMLElement;

  override defaults(): StickyPlatformSceneOptions {
    return {
      ...super.defaults(),
      stickyPlatformHeight: (deviceWidth: number, deviceHeight: number) => deviceHeight,
    };
  }

  override resizeHeight(): void {
    this.element.style.height = `${this.height(Util.clientWidth(), Util.clientHeight())}px`;
    this.resizePlatform();
  }

  resizePlatform(): void {
    this.platform.style.height = `${this.options!.stickyPlatformHeight!(Util.clientWidth(), Util.clientHeight())}px`;
  }

  protected override init(): void {
    this.element.style.position = 'relative';
    this.element.style.overflow = 'visible';

    this.platform = document.createElement('div');
    this.platform.style.position = 'sticky';
    this.platform.style.top = '0';
    this.platform.style.left = '0';
    this.platform.style.width = '100%';

    this.element.appendChild(this.platform);
    console.log('scene',
      this.element.getBoundingClientRect().left,
      this.element.getBoundingClientRect().top,
      this.element.getBoundingClientRect().width,
      this.element.getBoundingClientRect().height,
    );

    if (typeof document !== 'undefined') {
      const testBody = document.getElementById('test-body');
      console.log('test-body',
        testBody!.getBoundingClientRect().left,
        testBody!.getBoundingClientRect().top,
        testBody!.getBoundingClientRect().width,
        testBody!.getBoundingClientRect().height,
      );

      const elem = document.elementFromPoint(2, 2);
      console.log(elem, elem?.tagName);
    }
  }

  override add(actor: Actor): void {
    super.add(actor);
    if (this.element === actor.element?.parentElement) {
      this.platform.appendChild(actor.element);
      actor.element.style.position = 'absolute';
    }
    actor.initElement(this.elementY(), this);
  }

  interceptY(scrollPos: number, frame: TimeFrame, startY: () => number, endY: () => number): number | undefined {
    if (scrollPos < frame.getStartPos()) {
      return startY();
    }
    if (scrollPos > frame.getEndPos()) {
      return endY();
    }

    return super.interceptY(scrollPos, frame, startY, endY);
  }

}
