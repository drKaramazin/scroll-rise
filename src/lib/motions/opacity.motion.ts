import { Value } from '../models/value.model';
import { Motion } from './motion';
import { TimeFrame } from '../time-frame';
import { Util } from '../util';

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

  renderOpacity(scrollPos: number, frame: TimeFrame, element: HTMLElement): void {
    if (element) {
      if (scrollPos < frame.getStartPos()) {
        element.style.opacity = this.start(Util.clientWidth(), Util.clientHeight()).toString();
        return;
      }
      if (scrollPos > frame.getEndPos()) {
        element.style.opacity = this.end(Util.clientWidth(), Util.clientHeight()).toString();
        return;
      }

      const motionL = this.end(Util.clientWidth(), Util.clientHeight()) - this.start(Util.clientWidth(), Util.clientHeight());
      const d = motionL / frame.length();
      const opacity = this.start(Util.clientWidth(), Util.clientHeight()) + d * (scrollPos - frame.getStartPos());

      element.style.opacity = opacity.toString();
    }
  }

  override make(scrollPosForFrame: number, frame: TimeFrame, element: HTMLElement): void {
    this.renderOpacity(scrollPosForFrame, frame, element);
  }

}
