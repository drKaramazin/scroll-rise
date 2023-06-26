import { Value } from '../models/value.model';
import { Motion } from './motion';
import { Util } from '../util';
import { MotionParams } from '../models/motion-params.model';

export interface IOpacityMotion {
  start: Value;
  end: Value;
}

export class OpacityMotion extends Motion {

  override name = 'OpacityMotion';

  start: Value;
  end: Value;

  constructor(data: IOpacityMotion) {
    super();

    this.start = data.start;
    this.end = data.end;
  }

  override make(params: MotionParams): void {
    if (params.element) {
      if (params.scrollPosOnScene < params.frame.getStartPos()) {
        params.element.style.opacity = this.start(Util.clientWidth(), Util.clientHeight()).toString();
        return;
      }
      if (params.scrollPosOnScene > params.frame.getEndPos()) {
        params.element.style.opacity = this.end(Util.clientWidth(), Util.clientHeight()).toString();
        return;
      }

      const motionL = this.end(Util.clientWidth(), Util.clientHeight()) - this.start(Util.clientWidth(), Util.clientHeight());
      const d = motionL / params.frame.length();
      const opacity = this.start(Util.clientWidth(), Util.clientHeight()) + d * (params.scrollPosOnScene - params.frame.getStartPos());

      params.element.style.opacity = opacity.toString();
    } else {
      throw new Error('There is no an element');
    }
  }

}
