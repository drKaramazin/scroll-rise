import { Value } from '../value.model';
import { Motion } from './motion.model';
import { Frame } from '../frame.model';
import { Util } from '../../util';

export interface ISizeMotion {
  startWidth: Value;
  endWidth: Value;
  startHeight: Value;
  endHeight: Value;
}

export class SizeMotion extends Motion {

  startWidth: Value;
  endWidth: Value;
  startHeight: Value;
  endHeight: Value;

  constructor(data: ISizeMotion) {
    super();

    this.startWidth = data.startWidth;
    this.endWidth = data.endWidth;
    this.startHeight = data.startHeight;
    this.endHeight = data.endHeight;
  }

  renderWidth(scrollPos: number, frame: Frame, element: HTMLElement) {
    if (element) {
      if (-scrollPos < frame.getStartPos()) {
        element.style.width = `${this.startWidth(Util.displayWidth(), Util.displayHeight())}px`;
        return;
      }
      if (-scrollPos > frame.getEndPos()) {
        element.style.width = `${this.endWidth(Util.displayWidth(), Util.displayHeight())}px`;
        return;
      }

      const motionL = this.endWidth(Util.displayWidth(), Util.displayHeight()) - this.startWidth(Util.displayWidth(), Util.displayHeight());
      const d = motionL/frame.length();
      const width = this.startWidth(Util.displayWidth(), Util.displayHeight()) + d * ((-scrollPos) - frame.getStartPos());

      element.style.width = `${width}px`;
    }
  }

  renderHeight(scrollPos: number, frame: Frame, element: HTMLElement) {
    if (element) {
      if (-scrollPos < frame.getStartPos()) {
        element.style.height = `${this.startHeight(Util.displayWidth(), Util.displayHeight())}px`;
        return;
      }
      if (-scrollPos > frame.getEndPos()) {
        element.style.height = `${this.endHeight(Util.displayWidth(), Util.displayHeight())}px`;
        return;
      }

      const motionL = this.endHeight(Util.displayWidth(), Util.displayHeight()) - this.startHeight(Util.displayWidth(), Util.displayHeight());
      const d = motionL/frame.length();
      const height = this.startHeight(Util.displayWidth(), Util.displayHeight()) + d * ((-scrollPos) - frame.getStartPos());

      element.style.height = `${height}px`;
    }
  }

  override make(scrollPosForFrame: number, frame: Frame, element: HTMLElement) {
    this.renderWidth(scrollPosForFrame, frame, element);
    this.renderHeight(scrollPosForFrame, frame, element);
  }

}
