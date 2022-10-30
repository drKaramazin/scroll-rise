import { MotionFixture } from './motion.fixture';
import { ChangeStage } from './test-tools';
import { Util } from '../../../util';

export class FasMoveFixture extends MotionFixture {

  static changeX = {
    timeFrame: MotionFixture.changeXTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        scrollTo: {
          x: 0,
          y: 0,
        },
        coords: {
          x: { value: 0 },
          y: { value: Util.displayHeight() },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight(),
        },
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 2,
        },
        coords: {
          x: { value: Util.displayWidth() - MotionFixture.block.width },
          y: { value: 0 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        coords: {
          x: { value: Util.displayWidth() - MotionFixture.block.width },
          y: { value: -Util.displayHeight() },
        },
      }];
    },
  };

  static changeY = {
    timeFrame: MotionFixture.changeYTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        scrollTo: {
          x: 0,
          y: 0,
        },
        coords: {
          x: { value: 0 },
          y: { value: Util.displayHeight() },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight(),
        },
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 2,
        },
        coords: {
          x: { value: 0 },
          y: { value: Util.displayHeight() - MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        coords: {
          x: { value: 0 },
          y: { value: -MotionFixture.block.height },
        },
      }];
    },
  };

  static changeXY = {
    timeFrame: MotionFixture.changeXYTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        scrollTo: {
          x: 0,
          y: 0,
        },
        coords: {
          x: { value: 0 },
          y: { value: Util.displayHeight() },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight(),
        },
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 2,
        },
        coords: {
          x: { value: Util.displayWidth() - MotionFixture.block.width },
          y: { value: Util.displayHeight() - MotionFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        coords: {
          x: { value: Util.displayWidth() - MotionFixture.block.width },
          y: { value: -MotionFixture.block.height },
        },
      }];
    },
  };

}
