import { Motion } from './motions/motion.model';
import { Util } from '../util';

export class Frame {

  constructor(
    public motion: Motion,
    public start: (deviceWidth: number, deviceHeight: number) => number,
    public end: (deviceWidth: number, deviceHeight: number) => number = start,
  ) {
    if (end === undefined) {
      this.end = start;
    } else  {
      if (this.getStartPos() > this.getEndPos()) {
        throw new SyntaxError('"Start" later than "End" in the frame');
      }
    }
  }

  getStartPos(): number {
    return this.start(Util.displayWidth(), Util.displayHeight());
  }

  getEndPos(): number {
    return this.end(Util.displayWidth(), Util.displayHeight());
  }

  length(): number {
    return this.getEndPos() - this.getStartPos();
  }

}
