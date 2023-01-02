import { MotionFixture } from './motion.fixture';
import { ChangeStage } from './test-tools';
import { TimeFrame } from '../time-frame';
import { SizeMotion } from '../motions/size.motion';

export class SizeFixture extends MotionFixture {

  static changeWidthTimeFrame(): TimeFrame {
    return new TimeFrame(new SizeMotion({
      startWidth: () => MotionFixture.block.width,
      startHeight: () => MotionFixture.block.height,
      endWidth: () => MotionFixture.block.width * 2,
      endHeight: () => MotionFixture.block.height,
    }), () => 0, (w: number, h: number) => 2 * h);
  };

  static changeHeightTimeFrame(): TimeFrame {
    return new TimeFrame(new SizeMotion({
      startWidth: () => MotionFixture.block.width,
      startHeight: () => MotionFixture.block.height,
      endWidth: () => MotionFixture.block.width,
      endHeight: () => MotionFixture.block.height * 3,
    }), () => 0, (w: number, h: number) => 2 * h);
  };

  static changeWidthHeightTimeFrame(): TimeFrame {
    return new TimeFrame(new SizeMotion({
      startWidth: () => MotionFixture.block.width,
      startHeight: () => MotionFixture.block.height,
      endWidth: () => MotionFixture.block.width * 2,
      endHeight: () => MotionFixture.block.height * 3,
    }), () => 0, (w: number, h: number) => 2 * h);
  };

  static changeWidth = {
    timeFrame: SizeFixture.changeWidthTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        scrollTo: this.stages()[0],
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: this.stages()[2],
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: this.stages()[4],
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: this.stages()[6],
        size: {
          width: { value: MotionFixture.block.width + MotionFixture.block.width / 2, margin: 1 },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: this.stages()[8],
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: this.stages()[10],
        size: {
          width: { value: MotionFixture.block.width * 2 },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: this.stages()[12],
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
        scrollTo: this.stages()[0],
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: this.stages()[2],
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: this.stages()[4],
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height },
        },
      }, {
        scrollTo: this.stages()[6],
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height * 2 },
        },
      }, {
        scrollTo: this.stages()[8],
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height * 3 },
        },
      }, {
        scrollTo: this.stages()[10],
        size: {
          width: { value: MotionFixture.block.width },
          height: { value: MotionFixture.block.height * 3 },
        },
      }, {
        scrollTo: this.stages()[12],
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
      return this.changeWidth.stages().map((stage, index) => ({
        scrollTo: this.changeWidth.stages()[index].scrollTo,
        coords: {
          x: this.changeWidth.stages()[index].size!.width,
          y: this.changeHeight.stages()[index].size!.height,
        },
      }));
    },
  };

}
