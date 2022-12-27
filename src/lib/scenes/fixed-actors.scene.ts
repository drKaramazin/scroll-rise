import { Actor } from '../actors/actor.model';
import { Util } from '../util';
import { Scene, SceneOptions } from './scene';
import { TimeFrame } from '../time-frame';

export class FixedActorsScene extends Scene<SceneOptions> {

  public override name = 'FixedActorsScene';

  override resizeHeight(): void {
    this.el.style.height = `${this.height(Util.clientWidth(), Util.clientHeight())}px`;
  }

  protected override init(): void {
    this.el.style.position = 'relative';
    this.resizeHeight();
    this.redrawMeasuringGrid();
  }

  override add(actor: Actor): void {
    super.add(actor);
    actor.element!.style.position = 'fixed';
    actor.initElement(this.elementY(), this);
  }

  interceptY(scrollPos: number, frame: TimeFrame, startY: () => number, endY: () => number): number | undefined {
    if (scrollPos < frame.getStartPos()) {
      return this.elementY() + startY();
    }
    const left = this.elementHeight() + this.elementY();
    if (left < Util.clientHeight()) {
      const d = Util.clientHeight() - left;
      return endY() - d;
    }

    return super.interceptY(scrollPos, frame, startY, endY);
  }

}
