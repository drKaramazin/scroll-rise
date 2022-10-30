import { MotionFixture } from './motion.fixture';
import { ChangeStage } from './test-tools';
import { TimeFrame } from '../../time-frame.model';
import { SizeMotion } from '../size.motion';
import { Util } from '../../../util';

export class SpsSizeFixture extends MotionFixture {

  static changeWidthTimeFrame(): TimeFrame {
    return new TimeFrame(new SizeMotion({
      startWidth: () => MotionFixture.block.width,
      startHeight: () => MotionFixture.block.height,
      endWidth: () => MotionFixture.block.width * 2,
      endHeight: () => MotionFixture.block.height,
    }), (w: number, h: number) => 0, (w: number, h: number) => h);
  };

  static changeHeightTimeFrame(): TimeFrame {
    return new TimeFrame(new SizeMotion({
      startWidth: () => MotionFixture.block.width,
      startHeight: () => MotionFixture.block.height,
      endWidth: () => MotionFixture.block.width,
      endHeight: () => MotionFixture.block.height * 2,
    }), (w: number, h: number) => 0, (w: number, h: number) => h);
  };

  static changeWidthHeightTimeFrame(): TimeFrame {
    return new TimeFrame(new SizeMotion({
      startWidth: () => MotionFixture.block.width,
      startHeight: () => MotionFixture.block.height,
      endWidth: () => MotionFixture.block.width * 2,
      endHeight: () => MotionFixture.block.height * 2,
    }), (w: number, h: number) => 0, (w: number, h: number) => h);
  };

  static changeWidth = {
    timeFrame: SpsSizeFixture.changeWidthTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        scrollTo: {
          x: 0,
          y: 0,
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight(),
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 2,
        },
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height },
        },
      }];
    },
  };

  static changeHeight = {
    timeFrame: SpsSizeFixture.changeHeightTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        scrollTo: {
          x: 0,
          y: 0,
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight(),
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 2,
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height * 2 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height * 2 },
        },
      }];
    },
  };

  static changeWidthHeight = {
    timeFrame: SpsSizeFixture.changeWidthHeightTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        scrollTo: {
          x: 0,
          y: 0,
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight(),
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 2,
        },
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height * 2 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height * 2 },
        },
      }];
    },
  };

}
