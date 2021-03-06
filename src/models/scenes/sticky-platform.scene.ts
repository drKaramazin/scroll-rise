import { Actor } from '../actors/actor.model';
import { Util } from '../../util';
import { SceneModel, SceneOptions } from './scene.model';

export interface StickyPlatformSceneOptions extends SceneOptions {
  stickyPlatformHeight?: (deviceWidth: number, deviceHeight: number) => number;
}

export class StickyPlatformScene extends SceneModel<StickyPlatformSceneOptions> {

  public override name = 'StickyPlatformScene';

  public platform: HTMLElement;

  override defaults(): StickyPlatformSceneOptions {
    return {
      ...super.defaults(),
      stickyPlatformHeight: (deviceWidth: number, deviceHeight: number) => deviceHeight,
    };
  }

  override resizeHeight() {
    this.el.style.height = `${this.height(Util.displayWidth(), Util.displayHeight())}px`;
    this.resizePlatform();
  }

  resizePlatform() {
    this.platform.style.height = `${this.options.stickyPlatformHeight(Util.displayWidth(), Util.displayHeight())}px`;
  }

  protected override init() {
    this.el.style.position = 'relative';
    this.el.style.overflow = 'visible';

    this.platform = document.createElement('div');
    this.platform.style.position = 'sticky';
    this.platform.style.top = `0`;
    this.platform.style.left = '0';
    this.platform.style.width = '100%';
    this.resizeHeight();

    this.el.appendChild(this.platform);
  }

  override add(actor: Actor) {
    super.add(actor);
    if (this.el === actor.element.parentElement) {
      this.platform.appendChild(actor.element);
      actor.element.style.position = 'absolute';
    }
    actor.initElement();
  }

}
