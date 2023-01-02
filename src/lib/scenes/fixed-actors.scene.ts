import { Actor } from '../actors/actor.model';
import { Util } from '../util';
import { Scene, SceneOptions } from './scene';
import { TimeFrame } from '../time-frame';

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

  interceptY(scrollPos: number, frame: TimeFrame, startY: () => number, endY: () => number): number | undefined {
    if (scrollPos < frame.getStartPos()) {
      return this.elementY() < 0 ? startY() : this.elementY() + startY();
    }
    if (scrollPos > frame.getEndPos()) {
      const top = this.elementHeight() + this.elementY();
      return top < this.platformHeight() ? endY() - (this.platformHeight() - top) : endY();
    }

    return super.interceptY(scrollPos, frame, startY, endY);
  }

}
