import { MotionFixture } from './motion.fixture';
import { TimeFrame } from '../time-frame';
import { OpacityMotion } from '../motions/opacity.motion';
import { ChangeStage } from './test-tools';

export class OpacityFixture extends MotionFixture {

  static timeFrame(): TimeFrame {
    return new TimeFrame(new OpacityMotion({
      start: () => 1,
      end: () => 0,
    }), (w, h) => h, (w, h) => 3 * h);
  };

  static changeOpacity = {
    timeFrame: OpacityFixture.timeFrame,
    stages: (): ChangeStage[] => {
      return [];
    },
  };

}
