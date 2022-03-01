import { Motion } from './motion.model';
import { Frame } from '../frame.model';

export interface IPositionMotion {
  from: 'relative' | 'fixed';
  to: 'relative' | 'fixed';
}

export class PositionMotion extends Motion {

  from: 'relative' | 'fixed';
  to: 'relative' | 'fixed';

  constructor(data: IPositionMotion) {
    super();

    this.from = data.from;
    this.to = data.to;
  }

  override make(scrollPosForFrame: number, frame: Frame, element: HTMLElement) {
    if (-scrollPosForFrame >= frame.getStartPos() && element.style.position !== this.to) {
      element.style.position = this.to;
    }
    if (-scrollPosForFrame < frame.getStartPos() && element.style.position !== this.from) {
      element.style.position = this.from;
    }
  }

}
