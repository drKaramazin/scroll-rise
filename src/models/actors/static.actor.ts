import { InitiableActor } from './initiable.actor';
import { Util } from '../../util';

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

  override bindElement(): HTMLElement | undefined {
    if (this.element) {
      if (this.options.initPosition) {
        const startCoord = this.calcStartPosition();
        this.element.style.left = `${startCoord.X(Util.displayWidth(), Util.displayHeight())}px`;
        this.element.style.top = `${startCoord.Y(Util.displayWidth(), Util.displayHeight())}px`;
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
