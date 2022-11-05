import { MotionFixture } from './motion.fixture';
import { TimeFrame } from '../../time-frame.model';
import { MoveMotion } from '../move.motion';
import { Util } from '../../../util';

export abstract class MoveFixture extends MotionFixture {

  static changeXTimeFrame(): TimeFrame {
    return new TimeFrame(new MoveMotion({
      startX: () => 0,
      endX: (w: number) => w - MotionFixture.block.width,
      startY: () => 0,
      endY: (w: number, h: number) => 0,
    }), (w: number, h: number) => 0, (w: number, h: number) => Util.innerHeight());
  };

  static changeYTimeFrame(): TimeFrame {
    return new TimeFrame(new MoveMotion({
      startX: () => 0,
      endX: (w: number) => 0,
      startY: () => 0,
      endY: (w: number, h: number) => h - MotionFixture.block.height,
    }), (w: number, h: number) => 0, (w: number, h: number) => Util.innerHeight());
  }

  static changeXYTimeFrame(): TimeFrame {
    return new TimeFrame(new MoveMotion({
      startX: () => 0,
      endX: (w: number) => w - MotionFixture.block.width,
      startY: () => 0,
      endY: (w: number, h: number) => h - MotionFixture.block.height,
    }), (w: number, h: number) => 0, (w: number, h: number) => Util.innerHeight());
  }

}
