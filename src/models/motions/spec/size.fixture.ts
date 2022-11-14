import { MotionFixture } from './motion.fixture';
import { ChangeStage } from './test-tools';
import { TimeFrame } from '../../time-frame.model';
import { SizeMotion } from '../size.motion';

export class SizeFixture extends MotionFixture {

  static changeWidthTimeFrame(): TimeFrame {
    return new TimeFrame(new SizeMotion({
      startWidth: () => MotionFixture.block.width,
      startHeight: () => MotionFixture.block.height,
      endWidth: () => MotionFixture.block.width * 2,
      endHeight: () => MotionFixture.block.height,
    }), () => 0, (w: number, h: number) => h);
  };

  static changeHeightTimeFrame(): TimeFrame {
    return new TimeFrame(new SizeMotion({
      startWidth: () => MotionFixture.block.width,
      startHeight: () => MotionFixture.block.height,
      endWidth: () => MotionFixture.block.width,
      endHeight: () => MotionFixture.block.height * 3,
    }), () => 0, (w: number, h: number) => h);
  };

  static changeWidthHeightTimeFrame(): TimeFrame {
    return new TimeFrame(new SizeMotion({
      startWidth: () => MotionFixture.block.width,
      startHeight: () => MotionFixture.block.height,
      endWidth: () => MotionFixture.block.width * 2,
      endHeight: () => MotionFixture.block.height * 3,
    }), () => 0, (w: number, h: number) => h);
  };

  static changeWidth = {
    timeFrame: SizeFixture.changeWidthTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height },
        },
      }, {
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height },
        },
      }];
    },
  };

  static changeHeight = {
    timeFrame: SizeFixture.changeHeightTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height * 3 },
        },
      }, {
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height * 3 },
        },
      }];
    },
  };

  static changeWidthHeight = {
    timeFrame: SizeFixture.changeWidthHeightTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height * 3 },
        },
      }, {
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height * 3 },
        },
      }];
    },
  };

}
