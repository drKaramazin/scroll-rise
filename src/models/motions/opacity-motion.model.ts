import { Value } from '../value.model';
import { Motion } from './motion.model';
import { Frame } from '../frame.model';
import { Util } from '../../util';

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

  renderOpacity(scrollPos: number, frame: Frame, element: HTMLElement) {
    if (element) {
      if (scrollPos < frame.getStartPos()) {
        element.style.opacity = this.start(Util.displayWidth(), Util.displayHeight()).toString();
        return;
      }
      if (scrollPos > frame.getEndPos()) {
        element.style.opacity = this.end(Util.displayWidth(), Util.displayHeight()).toString();
        return;
      }

      const motionL = this.end(Util.displayWidth(), Util.displayHeight()) - this.start(Util.displayWidth(), Util.displayHeight());
      const d = motionL/frame.length();
      const opacity = this.start(Util.displayWidth(), Util.displayHeight()) + d * (scrollPos - frame.getStartPos());

      element.style.opacity = opacity.toString();
    }
  }

  override make(scrollPosForFrame: number, frame: Frame, element: HTMLElement) {
    this.renderOpacity(scrollPosForFrame, frame, element);
  }

}
