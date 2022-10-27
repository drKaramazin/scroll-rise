import { Actor } from '../actors/actor.model';
import { Util } from '../../util';
import { SceneModel, SceneOptions } from './scene.model';

export class FixedActorsScene extends SceneModel<SceneOptions> {

  public override name = 'FixedActorsScene';

  override resizeHeight(): void {
    this.el.style.height = `${this.height(Util.displayWidth(), Util.displayHeight())}px`;
  }

  protected override init(): void {
    this.resizeHeight();
  }

  override add(actor: Actor): void {
    super.add(actor);
    actor.element.style.position = 'fixed';
    actor.initElement(this.elementY(), this);
  }

}
