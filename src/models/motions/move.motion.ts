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

  private setY(element: HTMLElement, y: number): void {
    element.style.top = `${y}px`;
  }

  renderY(scrollPos: number, frame: TimeFrame, element: HTMLElement, scene: SceneModel<any>): void {
    const startY = (): number => this.startY(Util.clientWidth(), Util.clientHeight());
    const endY = (): number => this.endY(Util.clientWidth(), Util.clientHeight());

    if (element) {
      if (scene.name === 'StickyPlatformScene') {
        if (scrollPos < frame.getStartPos()) {
          this.setY(element, startY());
          return;
        }
        if (scrollPos > frame.getEndPos()) {
          this.setY(element, endY());
          return;
        }
      }

      const motionL = endY() - startY();
      const d = motionL / frame.length();
      let y = Util.castToInt(startY() + d * (frame.getStartPos() + scrollPos));

      if (scene.name === 'FixedActorsScene') {
        const fasD = scene.elementY();
        y += fasD;

        if (scrollPos < frame.getStartPos()) {
          this.setY(element, fasD + startY());
          return;
        }
        if (scrollPos > frame.getEndPos()) {
          this.setY(element, fasD + endY());
          return;
        }
      }

      this.setY(element, y);
    }
  }

  make(scrollPosOnFrame: number, frame: TimeFrame, element: HTMLElement, scene: SceneModel<any>): void {
    this.renderX(scrollPosOnFrame, frame, element);
    this.renderY(scrollPosOnFrame, frame, element, scene);
  }

}
