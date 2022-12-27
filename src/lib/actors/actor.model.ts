import { TimeFrame } from '../time-frame';
import { Util } from '../util';
import { Scene } from '../scenes/scene';

export abstract class Actor {

  public element?: HTMLElement;
  abstract bindElement(scrollPosOnFrame: number, scene: Scene<any>): HTMLElement | undefined;

  protected frames: TimeFrame[] = [];

  abstract findFirstMoveMotionFrame(): TimeFrame;

  afterBindElement(): void {}

  beforeRender?: () => void;
  afterRender?: () => void;

  private groupFramesByMotion(frames: TimeFrame[]): { [key: string]: TimeFrame[] } {
    return frames.reduce(
      (acc: any, frame) => {
        const motionName = frame.motion.name;
        acc[motionName] = acc[motionName] ? [...acc[motionName], frame] : [frame];

        return acc;
      },
      {},
    );
  }

  render(scrollPos: number, scene: Scene<any>): void {
    if (this.beforeRender) {
      this.beforeRender();
    }

    const frames = this.groupFramesByMotion(this.frames);

    for (const key of Object.keys(frames)) {
      if (frames[key].length > 1) {
        const visible = frames[key].filter(
          frame =>
            (scrollPos < frame.getStartPos() && scrollPos + Util.clientHeight() >= frame.getStartPos()) ||
            (scrollPos >= frame.getStartPos() && scrollPos + Util.clientHeight() <= frame.getEndPos()) ||
            (scrollPos >= frame.getStartPos() && scrollPos <= frame.getEndPos()),
        );

        if (visible.length === 1) {
          frames[key] = visible;
        } else if (visible.length === 0 && frames[key].length) {
          frames[key].sort((a, b) => a.getStartPos() - b.getStartPos());
          if (scrollPos + Util.clientHeight() < frames[key][0].getStartPos()) {
            frames[key] = [frames[key][0]];
          } else {
            frames[key].sort((a, b) => {
              if (a.getEndPos() > b.getEndPos()) {
                return -1;
              } else if (a.getEndPos() > b.getEndPos()) {
                return 0;
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

  addFrame(frame: TimeFrame): void {
    this.frames.push(frame);
  }

  addFrames(frames: TimeFrame[]): void {
    this.frames = this.frames.concat(frames);
  }

  initElement(scrollPosOnFrame: number, scene: Scene<any>): void {
    this.element = this.bindElement(scrollPosOnFrame, scene);
    this.afterBindElement();
  }

}
