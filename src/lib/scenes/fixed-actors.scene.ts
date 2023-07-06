import { Actor } from '../actors/actor';
import { Util } from '../util';
import { Scene, SceneOptions } from './scene';
import { MotionParams } from '../models/motion-params.model';

export class FixedActorsScene extends Scene<SceneOptions> {

  public override name = 'FixedActorsScene';

  protected platformHeight(deviceWidth: number, deviceHeight: number): number {
    return deviceHeight;
  }

  override resizeHeight(): void {
    this.element.style.height = `${this.height(Util.clientWidth(), Util.clientHeight())}px`;
  }

  protected override init(): void {
    this.element.style.position = 'relative';
  }

  override add(actor: Actor): void {
    super.add(actor);
    actor.element!.style.position = 'fixed';
    actor.initElement(this.elementY(), this);
  }

  interceptY(y: number, params: MotionParams, startY: () => number, endY: () => number): number {
    if (params.scrollPosOnScene < 0) {
      return this.elementY() < 0 ? startY() : this.elementY() + startY();
    }

    if (params.scrollPosOnScene > this.elementHeight() - this.platformHeightValue()) {
      const top = this.elementHeight() + this.elementY();
      return top < this.platformHeightValue() ? endY() - (this.platformHeightValue() - top) : endY();
    }

    return super.interceptY(y, params, startY, endY);
  }

}
