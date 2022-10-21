import { TimeFrame } from '../time-frame.model';
import { Util } from '../../util';
import { SceneModel } from '../scenes/scene.model';

export abstract class Actor {

  public element: HTMLElement | undefined;
  abstract bindElement(scrollPosOnFrame: number, scene: SceneModel<any>): HTMLElement | undefined;

  protected frames: TimeFrame[] = [];

  abstract findFirstMoveMotionFrame(): TimeFrame;

  afterBindElement() {}

  beforeRender: () => void | undefined;
  afterRender: () => void | undefined;

  private groupFramesByMotion(frames: TimeFrame[]): { [key: string]: TimeFrame[] } {
    return frames.reduce(
      (acc: any, frame) => {
        const motionName = frame.motion.name;
        acc[motionName] = acc[motionName] ? [...acc[motionName], frame] : [frame];

        return acc;
      },
      {}
    );
  }

  render(scrollPos: number, scene: SceneModel<any>) {
    if (this.beforeRender) {
      this.beforeRender();
    }

    const frames = this.groupFramesByMotion(this.frames);

    for (const key of Object.keys(frames)) {
      if (frames[key].length > 1) {
        const visible = frames[key].filter(
          frame =>
            scrollPos < frame.getStartPos() && scrollPos + Util.displayHeight() >= frame.getStartPos() ||
            scrollPos >= frame.getStartPos() && scrollPos + Util.displayHeight() <= frame.getEndPos() ||
            scrollPos >= frame.getStartPos() && scrollPos <= frame.getEndPos()
        );

        if (visible.length === 1) {
          frames[key] = visible;
        } else if (visible.length === 0 && frames[key].length) {
          frames[key].sort((a, b) => a.getStartPos() - b.getStartPos())
          if (scrollPos + Util.displayHeight() < frames[key][0].getStartPos()) {
            frames[key] = [frames[key][0]];
          } else {
            frames[key].sort((a, b) => {
              if (a.getEndPos() > b.getEndPos()) {
                return -1;
              } else if (a.getEndPos() > b.getEndPos()) {
                return 0
              }
              return 1;
            });
            if (scrollPos > frames[key][0].getEndPos()) {
              frames[key] = [frames[key][0]];
            }
          }
        } else {
          visible.sort((a, b) => a.getStartPos() - b.getStartPos());
          frames[key] = [visible[visible.length - 1]];
        }
      }
    }

    if (this.element) {
      for (const key of Object.keys(frames)) {
        if (frames[key]?.length) {
          frames[key][0].motion.make(scrollPos, frames[key][0], this.element, scene);
        }
      }
    }

    if (this.afterRender) {
      this.afterRender();
    }
  }

  addFrame(frame: TimeFrame) {
    this.frames.push(frame);
  }

  addFrames(frames: TimeFrame[]) {
    this.frames = this.frames.concat(frames);
  }

  initElement(scrollPosOnFrame: number, scene: SceneModel<any>) {
    this.element = this.bindElement(scrollPosOnFrame, scene);
    this.afterBindElement();
  }

}
