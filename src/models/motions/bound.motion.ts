import { Motion } from './motion.model';
import { TimeFrame } from '../time-frame.model';
import { Util } from '../../util';

export declare type BoundValue = (deviceWidth: number, deviceHeight: number) => Partial<CSSStyleDeclaration>;

export interface IBoundMotion {
  before: BoundValue;
  after: BoundValue;
}

export class BoundMotion extends Motion {

  override name = 'BoundMotion';

  before: BoundValue;
  after: BoundValue;

  constructor(data: IBoundMotion) {
    super();

    this.before = data.before;
    this.after = data.after;
  }

  applyProperties(element: HTMLElement, properties: Partial<CSSStyleDeclaration>): void {
    for (const property of Object.keys(properties)) {
      element.style[property] = properties[property];
    }
  }

  override make(scrollPosForFrame: number, frame: TimeFrame, element: HTMLElement): void {
    if (element) {
      if (scrollPosForFrame < frame.getStartPos()) {
        this.applyProperties(element, this.before(Util.displayWidth(), Util.displayHeight()));
      } else {
        this.applyProperties(element, this.after(Util.displayWidth(), Util.displayHeight()));
      }
    }
  }

}
