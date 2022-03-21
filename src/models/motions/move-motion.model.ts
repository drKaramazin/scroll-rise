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

  renderX(scrollPos: number, frame: Frame, element: HTMLElement): number {
    if (element) {
      if (scrollPos < frame.getStartPos()) {
        element.style.left = `${this.startX(Util.displayWidth(), Util.displayHeight())}px`;
        return;
      }
      if (scrollPos > frame.getEndPos()) {
        element.style.left = `${this.endX(Util.displayWidth(), Util.displayHeight())}px`;
        return;
      }

      const motionL = this.endX(Util.displayWidth(), Util.displayHeight()) - this.startX(Util.displayWidth(), Util.displayHeight());
      const d = motionL/frame.length();
      const x = this.startX(Util.displayWidth(), Util.displayHeight()) + d * (scrollPos - frame.getStartPos());

      // return x;
      element.style.left = `${x}px`;
    }
  }

  renderY(scrollPos: number, frame: Frame, element: HTMLElement): number {
    if (element) {
      if (scrollPos > frame.getEndPos()) {
        return;
      }

      const motionL = this.endY(Util.displayWidth(), Util.displayHeight()) - this.startY(Util.displayWidth(), Util.displayHeight());
      const d = motionL/frame.length();
      const y = scrollPos + Math.round(this.startY(Util.displayWidth(), Util.displayHeight()) + d * (frame.getStartPos() + scrollPos));

      // return y;
      element.style.top = `${y}px`;

      // console.log('Here');
      // element.style.transform = `translateY(${y}px)`;
    }
  }

  make(scrollPosForFrame: number, frame: Frame, element: HTMLElement) {
    // element.style.transform =
    //     `translate(${this.renderX(scrollPosForFrame, frame, element)}px, ${this.renderY(scrollPosForFrame, frame, element)}px)`;
    this.renderX(scrollPosForFrame, frame, element);
    this.renderY(scrollPosForFrame, frame, element);
  }

}
