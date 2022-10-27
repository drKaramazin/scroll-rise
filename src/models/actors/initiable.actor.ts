import { Actor } from './actor.model';
import { TimeFrame } from '../time-frame.model';
import { Dimensions } from '../dimensions';
import { SizeMotion } from '../motions/size.motion';
import { OpacityMotion } from '../motions/opacity.motion';
import { Value } from '../value.model';
import { SceneModel } from '../scenes/scene.model';

export abstract class InitiableActor extends Actor {

  findFirstFrame(motionName: string): TimeFrame | undefined {
    return this.frames.reduce(
      (acc: TimeFrame | undefined, frame: TimeFrame) => {
        if (frame.motion.name === motionName) {
          if (acc) {
            if (frame.getStartPos() < acc?.getStartPos()) {
              return frame;
            } else {
              return acc;
            }
          } else {
            return frame;
          }
        } else {
          if (acc) {
            return acc;
          }
          return undefined;
        }
      },
      undefined,
    );
  }

  findFirstMoveMotionFrame(): TimeFrame {
    const firstFrame = this.findFirstFrame('MoveMotion');

    if (firstFrame) {
      return firstFrame;
    } else {
      throw new Error('First "MoveMotion" frame wasn\'t found');
    }
  }

  calcStartSize(): Dimensions {
    const firstFrame = this.findFirstFrame('SizeMotion');

    if (firstFrame) {
      const motion = firstFrame.motion as SizeMotion;
      return { width: motion.startWidth, height: motion.startHeight };
    } else {
      throw new Error('First "SizeMotion" frame wasn\'t found');
    }
  }

  calcStartOpacity(): Value {
    const firstFrame = this.findFirstFrame('OpacityMotion');

    if (firstFrame) {
      const motion = firstFrame.motion as OpacityMotion;
      return motion.start;
    } else {
      throw new Error('First "OpacityMotion" frame wasn\'t found');
    }
  }

  override bindElement(scrollPosOnFrame: number, scene: SceneModel<any>): HTMLElement | undefined {
    return this.element;
  }

}
