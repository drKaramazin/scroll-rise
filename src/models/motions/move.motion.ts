import { Value } from '../value.model';
import { Motion } from './motion.model';
import { TimeFrame } from '../time-frame.model';
import { Util } from '../../util';
import { SceneModel } from '../scenes/scene.model';

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

  renderX(scrollPos: number, frame: TimeFrame, element: HTMLElement): number {
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
      const x = Util.castToInt(this.startX(Util.displayWidth(), Util.displayHeight()) + d * (scrollPos - frame.getStartPos()));

      element.style.left = `${x}px`;
    }
  }

  renderY(scrollPos: number, frame: TimeFrame, element: HTMLElement, scene: SceneModel<any>): number {
    if (element) {
      if (scene.name === 'StickyPlatformScene') {
        if (scrollPos < frame.getStartPos()) {
          element.style.top = `${this.startY(Util.displayWidth(), Util.displayHeight())}px`;
          return;
        }
        if (scrollPos > frame.getEndPos()) {
          element.style.top = `${this.endY(Util.displayWidth(), Util.displayHeight())}px`;
          return;
        }
      } else if (scene.name === 'FixedActorsScene') {
        if (scrollPos < frame.getStartPos()) {
          element.style.top = `${scene.elementY() + this.startY(Util.displayWidth(), Util.displayHeight())}px`;
          return;
        }
        if (scrollPos > frame.getEndPos()) {
          element.style.top = `${this.endY(Util.displayWidth(), Util.displayHeight()) - (scrollPos - frame.getEndPos())}px`;
          return;
        }
      }

      const motionL = this.endY(Util.displayWidth(), Util.displayHeight()) - this.startY(Util.displayWidth(), Util.displayHeight());
      const d = motionL/frame.length();
      const y = Util.castToInt(this.startY(Util.displayWidth(), Util.displayHeight()) + d * (frame.getStartPos() + scrollPos));

      element.style.top = `${y}px`;
    }
  }

  make(scrollPosOnFrame: number, frame: TimeFrame, element: HTMLElement, scene: SceneModel<any>) {
    this.renderX(scrollPosOnFrame, frame, element);
    this.renderY(scrollPosOnFrame, frame, element, scene);
  }

}
