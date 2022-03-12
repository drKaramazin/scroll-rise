import { Value } from '../value.model';
import { Motion } from './motion.model';
import { Frame } from '../frame.model';
import { Util } from '../../util';

export interface IMoveMotion {
  startX: Value;
  endX: Value;
  startY: Value;
  endY: Value;
}

export class MoveMotion extends Motion {

  override name = 'MoveMotion';

  startX: Value;
  endX: Value;
  startY: Value;
  endY: Value;

  constructor(data: IMoveMotion) {
    super();

    this.startX = data.startX;
    this.endX = data.endX;
    this.startY = data.startY;
    this.endY = data.endY;
  }

  renderX(scrollPos: number, frame: Frame, element: HTMLElement) {
    if (element) {
      if (-scrollPos < frame.getStartPos()) {
        element.style.left = `${this.startX(Util.displayWidth(), Util.displayHeight())}px`;
        return;
      }
      if (-scrollPos > frame.getEndPos()) {
        element.style.left = `${this.endX(Util.displayWidth(), Util.displayHeight())}px`;
        return;
      }

      const motionL = this.endX(Util.displayWidth(), Util.displayHeight()) - this.startX(Util.displayWidth(), Util.displayHeight());
      const d = motionL/frame.length();
      const y = this.startX(Util.displayWidth(), Util.displayHeight()) + d * ((-scrollPos) - frame.getStartPos());

      element.style.left = `${y}px`;
    }
  }

  renderY(scrollPos: number, frame: Frame, element: HTMLElement) {
    if (element) {
      if (-scrollPos < frame.getStartPos()) {
        element.style.top = `${scrollPos + this.startY(Util.displayWidth(), Util.displayHeight())}px`;
        return;
      }
      if (-scrollPos > frame.getEndPos()) {
        element.style.top = `${this.endY(Util.displayWidth(), Util.displayHeight()) - (-scrollPos - frame.getEndPos())}px`;
        return;
      }

      const motionL = this.endY(Util.displayWidth(), Util.displayHeight()) - this.startY(Util.displayWidth(), Util.displayHeight());
      const d = motionL/frame.length();
      const y = Math.round(this.startY(Util.displayWidth(), Util.displayHeight()) + d * (frame.getStartPos() - scrollPos));

      element.style.top = `${y}px`;
    }
  }

  make(scrollPosForFrame: number, frame: Frame, element: HTMLElement) {
    this.renderX(scrollPosForFrame, frame, element);
    this.renderY(scrollPosForFrame, frame, element);
  }

}
