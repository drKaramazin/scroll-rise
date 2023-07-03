import { Actor } from '../actors/actor';
import { Util } from '../util';
import { Scene, SceneOptions } from './scene';
import { MotionParams } from '../models/motion-params.model';

export class FixedActorsScene extends Scene<SceneOptions> {

  public override name = 'FixedActorsScene';
  protected platformHeight = Util.clientHeight;

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

  interceptY(params: MotionParams, y: number, startY: () => number, endY: () => number): number | undefined {
    if (params.scrollPosOnScene < params.frame.getStartPos()) {
      return this.elementY() < 0 ? startY() : this.elementY() + startY();
    }
    if (params.scrollPosOnScene > params.frame.getEndPos()) {
      const top = this.elementHeight() + this.elementY();
      return top < this.platformHeight() ? endY() - (this.platformHeight() - top) : endY();
    }

    return super.interceptY(params, y, startY, endY);
  }

}
