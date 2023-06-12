import { TimeFrame } from '../time-frame';
import { Util } from '../util';
import { Scene } from '../scenes/scene';
import { Wrapped } from '../decorators/wrapped';

interface FrameGroups {
  [key: string]: TimeFrame[];
}

export abstract class Actor {

  public element?: HTMLElement;
  abstract bindElement(scrollPosOnFrame: number, scene: Scene<any>): HTMLElement | undefined;

  protected frames: TimeFrame[] = [];

  abstract findFirstMoveMotionFrame(): TimeFrame;

  afterBindElement(): void {}

  private groupFramesByMotion(frames: TimeFrame[]): FrameGroups {
    return frames.reduce(
      (acc: FrameGroups, frame) => {
        const motionName = frame.motion.motionName();
        acc[motionName] = acc[motionName] ? [...acc[motionName], frame] : [frame];

        return acc;
      },
      {},
    );
  }

  private filterInvisibleFrames(frames: TimeFrame[], scrollPos: number): TimeFrame[] {
    return frames.filter(
      frame =>
        (scrollPos < frame.getStartPos() && scrollPos + Util.clientHeight() >= frame.getStartPos()) ||
        (scrollPos >= frame.getStartPos() && scrollPos + Util.clientHeight() <= frame.getEndPos()) ||
        (scrollPos >= frame.getStartPos() && scrollPos <= frame.getEndPos()),
    );
  }

  beforeRender: () => void;
  afterRender: () => void;
  @Wrapped({ before: 'beforeRender', after: 'afterRender' })
  render(scrollPos: number, scene: Scene<any>): void {
    const frameGroups = this.groupFramesByMotion(this.frames);

    for (const key of Object.keys(frameGroups)) {
      if (frameGroups[key].length > 1) {
        const visibleFrames = this.filterInvisibleFrames(frameGroups[key], scrollPos);

        if (visibleFrames.length === 1) {
          frameGroups[key] = visibleFrames;
        } else if (visibleFrames.length === 0 && frameGroups[key].length) {
          frameGroups[key].sort((a, b) => a.getStartPos() - b.getStartPos());
          if (scrollPos + Util.clientHeight() < frameGroups[key][0].getStartPos()) {
            frameGroups[key] = [frameGroups[key][0]];
          } else {
            frameGroups[key].sort((a, b) => {
              if (a.getEndPos() > b.getEndPos()) {
                return -1;
              } else if (a.getEndPos() > b.getEndPos()) {
                return 0;
              }
              return 1;
            });
            if (scrollPos > frameGroups[key][0].getEndPos()) {
              frameGroups[key] = [frameGroups[key][0]];
            }
          }
        } else {
          visibleFrames.sort((a, b) => a.getStartPos() - b.getStartPos());
          frameGroups[key] = [visibleFrames[visibleFrames.length - 1]];
        }
      }
    }

    if (this.element) {
      for (const key of Object.keys(frameGroups)) {
        if (frameGroups[key]?.length) {
          frameGroups[key][0].motion.make(scrollPos, frameGroups[key][0], this.element, scene);
        }
      }
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
