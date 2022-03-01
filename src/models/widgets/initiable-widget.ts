import { Widget } from './widget.model';
import { Coord } from '../coord.model';
import { Frame } from '../frame.model';
import { MoveMotion } from '../motions/move-motion.model';

export abstract class InitiableWidget extends Widget {

  calcStartPosition(): Coord {
    const firstFrame: Frame | undefined = this.frames.reduce(
      (acc: Frame | undefined, frame: Frame) => {
        if (frame.motion instanceof MoveMotion) {
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

    if (firstFrame) {
      const motion = firstFrame.motion as MoveMotion;

      if (!motion.startX) {
        throw new SyntaxError('\'startX\' wasn\'t found in the first frame');
      }
      if (!motion.startY) {
        throw new SyntaxError('\'startY\' wasn\'t found in the first frame');
      }

      return { X: motion.startX, Y: motion.startY };
    } else {
      throw new SyntaxError('First frame wasn\'t found');
    }
  }

  override bindElement(): HTMLElement | undefined {
    return this.element;
  }

}
