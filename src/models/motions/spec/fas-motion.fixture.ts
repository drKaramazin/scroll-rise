import { MotionFixture } from './motion.fixture';
import { ChangeStage } from './test-tools';
import { Util } from '../../../util';

export class FasMotionFixture extends MotionFixture {

  static changeX = {
    timeFrame: MotionFixture.changeXTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        x: 0,
        y: Util.displayHeight(),
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight(),
        },
        x: 0,
        y: 0,
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 2,
        },
        x: Util.displayWidth() - MotionFixture.block.width,
        y: 0,
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        x: Util.displayWidth() - MotionFixture.block.width,
        y: -Util.displayHeight(),
      }];
    },
  };

  static changeY = {
    timeFrame: MotionFixture.changeYTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        x: 0,
        y: Util.displayHeight(),
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight(),
        },
        x: 0,
        y: 0,
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 2,
        },
        x: 0,
        y: Util.displayHeight() - MotionFixture.block.height,
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        x: 0,
        y: -MotionFixture.block.height,
      }];
    },
  };

  static changeXY = {
    timeFrame: MotionFixture.changeXYTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        x: 0,
        y: Util.displayHeight(),
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight(),
        },
        x: 0,
        y: 0,
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 2,
        },
        x: Util.displayWidth() - MotionFixture.block.width,
        y: Util.displayHeight() - MotionFixture.block.height,
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        x: Util.displayWidth() - MotionFixture.block.width,
        y: -MotionFixture.block.height,
      }];
    },
  };

}
