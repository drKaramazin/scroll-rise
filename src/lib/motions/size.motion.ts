import { Value } from '../models/value.model';
import { Motion } from './motion';
import { Util } from '../util';
import { MotionParams } from '../models/motion-params.model';

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

  renderWidth(params: MotionParams): void {
    if (params.scrollPosOnScene < params.frame.getStartPos()) {
      params.element.style.width = `${this.startWidth(Util.clientWidth(), Util.clientHeight())}px`;
      return;
    }
    if (params.scrollPosOnScene > params.frame.getEndPos()) {
      params.element.style.width = `${this.endWidth(Util.clientWidth(), Util.clientHeight())}px`;
      return;
    }

    const motionL = this.endWidth(Util.clientWidth(), Util.clientHeight()) - this.startWidth(Util.clientWidth(), Util.clientHeight());
    const d = motionL / params.frame.length();
    const width = this.startWidth(Util.clientWidth(), Util.clientHeight()) + d * (params.scrollPosOnScene - params.frame.getStartPos());

    params.element.style.width = `${width}px`;
  }

  renderHeight(params: MotionParams): void {
    if (params.scrollPosOnScene < params.frame.getStartPos()) {
      params.element.style.height = `${this.startHeight(Util.clientWidth(), Util.clientHeight())}px`;
      return;
    }
    if (params.scrollPosOnScene > params.frame.getEndPos()) {
      params.element.style.height = `${this.endHeight(Util.clientWidth(), Util.clientHeight())}px`;
      return;
    }

    const motionL = this.endHeight(Util.clientWidth(), Util.clientHeight()) - this.startHeight(Util.clientWidth(), Util.clientHeight());
    const d = motionL / params.frame.length();
    const height = this.startHeight(Util.clientWidth(), Util.clientHeight()) + d * (params.scrollPosOnScene - params.frame.getStartPos());

    params.element.style.height = `${height}px`;
  }

  override make(params: MotionParams): void {
    if (params.element) {
      this.renderWidth(params);
      this.renderHeight(params);
    } else {
      throw new Error('There is no an element');
    }
  }

}
