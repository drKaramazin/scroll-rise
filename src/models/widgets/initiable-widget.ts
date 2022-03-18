import { Widget } from './widget.model';
import { Coord } from '../coord.model';
import { Frame } from '../frame.model';
import { MoveMotion } from '../motions/move-motion.model';
import { Dimensions } from '../dimensions';
import { SizeMotion } from '../motions/size-motion.model';
import { OpacityMotion } from '../motions/opacity-motion.model';
import { Value } from '../value.model';

export abstract class InitiableWidget extends Widget {

  findFirstFrame(motionName: string): Frame | undefined {
    return  this.frames.reduce(
      (acc: Frame | undefined, frame: Frame) => {
        if (frame.motion.name === motionName) {
          if (acc) {
            if (frame.getStartPos() < acc?.getStartPos()) {
              return frame;
            } else  {
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
      undefined
    );
  }

  calcStartPosition(): Coord {
    const firstFrame = this.findFirstFrame('MoveMotion');

    if (firstFrame) {
      const motion = firstFrame.motion as MoveMotion;
      return { X: motion.startX, Y: motion.startY };
    } else {
      throw new SyntaxError('First "MoveMotion" frame wasn\'t found');
    }
  }

  calcStartSize(): Dimensions {
    const firstFrame = this.findFirstFrame('SizeMotion');

    if (firstFrame) {
      const motion = firstFrame.motion as SizeMotion;
      return { width: motion.startWidth, height: motion.startHeight };
    } else {
      throw new SyntaxError('First "SizeMotion" frame wasn\'t found');
    }
  }

  calcStartOpacity(): Value {
    const firstFrame = this.findFirstFrame('OpacityMotion');

    if (firstFrame) {
      const motion = firstFrame.motion as OpacityMotion;
      return motion.start;
    } else {
      throw new SyntaxError('First "OpacityMotion" frame wasn\'t found');
    }
  }

  override bindElement(): HTMLElement | undefined {
    return this.element;
  }

}
