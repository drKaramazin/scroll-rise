import { MotionFixture } from './motion.fixture';
import { ChangeStage } from './test-tools';
import { TimeFrame } from '../../time-frame.model';
import { SizeMotion } from '../size.motion';
import { Util } from '../../../util';

export class SizeFixture extends MotionFixture {

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
      endHeight: () => MotionFixture.block.height * 3,
    }), (w: number, h: number) => 0, (w: number, h: number) => h);
  };

  static changeWidthHeightTimeFrame(): TimeFrame {
    return new TimeFrame(new SizeMotion({
      startWidth: () => MotionFixture.block.width,
      startHeight: () => MotionFixture.block.height,
      endWidth: () => MotionFixture.block.width * 2,
      endHeight: () => MotionFixture.block.height * 3,
    }), (w: number, h: number) => 0, (w: number, h: number) => h);
  };

  static changeWidth = {
    timeFrame: SizeFixture.changeWidthTimeFrame,
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
          y: Util.innerHeight(),
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 2,
        },
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 3,
        },
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
          y: Util.innerHeight(),
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 2,
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height * 3 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 3,
        },
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
          y: Util.innerHeight(),
        },
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 2,
        },
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height * 3 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 3,
        },
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height * 3 },
        },
      }];
    },
  };

}
