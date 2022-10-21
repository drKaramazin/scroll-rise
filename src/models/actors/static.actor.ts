import { InitiableActor } from './initiable.actor';
import { Util } from '../../util';
import { MoveMotion } from '../motions/move.motion';
import { SceneModel } from "../scenes/scene.model";

export interface StaticActorOptions {
  initPosition?: boolean;
  initSize?: boolean;
  initOpacity?: boolean;
}

export class StaticActor extends InitiableActor {

  constructor(
    public override element: HTMLElement | undefined,
    public options?: StaticActorOptions,
  ) {
    super();
    this.options = {
      initPosition: true,
      initSize: true,
      initOpacity: true,
      ...this.options,
    };
  }

  override bindElement(scrollPosOnFrame: number, scene: SceneModel<any>): HTMLElement | undefined {
    if (this.element) {
      if (this.options.initPosition) {
        const timeFrame = this.findFirstMoveMotionFrame();
        (timeFrame.motion as MoveMotion).make(scrollPosOnFrame, timeFrame, this.element, scene);
      }
      if (this.options.initSize) {
        const startDimensions = this.calcStartSize();
        this.element.style.width = `${startDimensions.width(Util.displayWidth(), Util.displayHeight())}px`;
        this.element.style.height = `${startDimensions.height(Util.displayWidth(), Util.displayHeight())}px`;
      }
      if (this.options.initOpacity) {
        const startOpacity = this.calcStartOpacity();
        this.element.style.opacity = `${startOpacity(Util.displayWidth(), Util.displayHeight())}`;
      }
    }
    return this.element;
  }

}
