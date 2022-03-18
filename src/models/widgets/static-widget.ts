import { InitiableWidget } from './initiable-widget';
import { Util } from '../../util';
import defaults from 'defaults';

export interface StaticWidgetOptions {
  initPosition?: boolean;
  initSize?: boolean;
  initOpacity?: boolean;
}

export class StaticWidget extends InitiableWidget {

  constructor(
    protected override element: HTMLElement | undefined,
    public options?: StaticWidgetOptions,
  ) {
    super();
    this.options = defaults(this.options, {
      initPosition: true,
      initSize: true,
      initOpacity: true,
    });
  }

  override bindElement(): HTMLElement | undefined {
    if (this.element) {
      if (this.options.initPosition) {
        this.element.style.position = 'absolute';
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
