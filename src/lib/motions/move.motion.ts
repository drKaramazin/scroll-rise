import { Value } from '../models/value.model';
import { Motion } from './motion';
import { TimeFrame } from '../time-frame';
import { Util } from '../util';
import { Scene } from '../scenes/scene';

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

  renderX(scrollPos: number, frame: TimeFrame, element: HTMLElement): void {
    if (element) {
      if (scrollPos < frame.getStartPos()) {
        element.style.left = `${this.startX(Util.clientWidth(), Util.clientHeight())}px`;
        return;
      }
      if (scrollPos > frame.getEndPos()) {
        element.style.left = `${this.endX(Util.clientWidth(), Util.clientHeight())}px`;
        return;
      }

      const motionL = this.endX(Util.clientWidth(), Util.clientHeight()) - this.startX(Util.clientWidth(), Util.clientHeight());
      const d = motionL / frame.length();
      const x = Util.castToInt(this.startX(Util.clientWidth(), Util.clientHeight()) + d * (scrollPos - frame.getStartPos()));

      element.style.left = `${x}px`;
    }
  }

  renderY(scrollPos: number, frame: TimeFrame, element: HTMLElement, scene: Scene<any>): void {
    const startY = (): number => this.startY(Util.clientWidth(), Util.clientHeight());
    const endY = (): number => this.endY(Util.clientWidth(), Util.clientHeight());

    if (element) {
      const motionL = endY() - startY();
      const d = motionL / frame.length();
      let y = Util.castToInt(startY() + d * (scrollPos - frame.getStartPos()));

      const sceneInterceptor = scene.interceptY(scrollPos, frame, startY, endY);
      if (sceneInterceptor !== undefined) {
        y = sceneInterceptor;
      }

      element.style.top = `${y}px`;
    }
  }

  make(scrollPosOnFrame: number, frame: TimeFrame, element: HTMLElement, scene: Scene<any>): void {
    this.renderX(scrollPosOnFrame, frame, element);
    this.renderY(scrollPosOnFrame, frame, element, scene);
  }

}
