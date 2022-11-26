import { Value } from '../value.model';
import { Motion } from './motion.model';
import { TimeFrame } from '../time-frame.model';
import { Util } from '../util';

export interface ISizeMotion {
  startWidth: Value;
  endWidth: Value;
  startHeight: Value;
  endHeight: Value;
}

export class SizeMotion extends Motion {

  override name = 'SizeMotion';

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

  renderWidth(scrollPos: number, frame: TimeFrame, element: HTMLElement): void {
    if (element) {
      if (scrollPos < frame.getStartPos()) {
        element.style.width = `${this.startWidth(Util.clientWidth(), Util.clientHeight())}px`;
        return;
      }
      if (scrollPos > frame.getEndPos()) {
        element.style.width = `${this.endWidth(Util.clientWidth(), Util.clientHeight())}px`;
        return;
      }

      const motionL = this.endWidth(Util.clientWidth(), Util.clientHeight()) - this.startWidth(Util.clientWidth(), Util.clientHeight());
      const d = motionL / frame.length();
      const width = this.startWidth(Util.clientWidth(), Util.clientHeight()) + d * (scrollPos - frame.getStartPos());

      element.style.width = `${width}px`;
    }
  }

  renderHeight(scrollPos: number, frame: TimeFrame, element: HTMLElement): void {
    if (element) {
      if (scrollPos < frame.getStartPos()) {
        element.style.height = `${this.startHeight(Util.clientWidth(), Util.clientHeight())}px`;
        return;
      }
      if (scrollPos > frame.getEndPos()) {
        element.style.height = `${this.endHeight(Util.clientWidth(), Util.clientHeight())}px`;
        return;
      }

      const motionL = this.endHeight(Util.clientWidth(), Util.clientHeight()) - this.startHeight(Util.clientWidth(), Util.clientHeight());
      const d = motionL / frame.length();
      const height = this.startHeight(Util.clientWidth(), Util.clientHeight()) + d * (scrollPos - frame.getStartPos());

      element.style.height = `${height}px`;
    }
  }

  override make(scrollPosForFrame: number, frame: TimeFrame, element: HTMLElement): void {
    this.renderWidth(scrollPosForFrame, frame, element);
    this.renderHeight(scrollPosForFrame, frame, element);
  }

}
