import { ChangeStage } from './test-tools';
import { Util } from '../../../util';
import { MoveFixture } from './move.fixture';
import { MotionFixture } from './motion.fixture';

export class FasMoveFixture extends MoveFixture {

  static changeX = {
    timeFrame: MoveFixture.changeXTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        scrollTo: MotionFixture.stages[0],
        coords: {
          x: { value: 0 },
          y: { value: Util.innerHeight() },
        },
      }, {
        scrollTo: MotionFixture.stages[1],
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        scrollTo: MotionFixture.stages[2],
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: 0 },
        },
      }, {
        scrollTo: MotionFixture.stages[3],
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: -Util.innerHeight() },
        },
      }];
    },
  };

  static changeY = {
    timeFrame: MoveFixture.changeYTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        scrollTo: MotionFixture.stages[0],
        coords: {
          x: { value: 0 },
          y: { value: Util.innerHeight() },
        },
      }, {
        scrollTo: MotionFixture.stages[1],
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        scrollTo: MotionFixture.stages[2],
        coords: {
          x: { value: 0 },
          y: { value: Util.clientHeight() - MoveFixture.block.height },
        },
      }, {
        scrollTo: MotionFixture.stages[3],
        coords: {
          x: { value: 0 },
          y: { value: -MoveFixture.block.height },
        },
      }];
    },
  };

  static changeXY = {
    timeFrame: MoveFixture.changeXYTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        scrollTo: MotionFixture.stages[0],
        coords: {
          x: { value: 0 },
          y: { value: Util.innerHeight() },
        },
      }, {
        scrollTo: MotionFixture.stages[1],
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        scrollTo: MotionFixture.stages[2],
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: Util.clientHeight() - MoveFixture.block.height },
        },
      }, {
        scrollTo: MotionFixture.stages[3],
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: -MoveFixture.block.height },
        },
      }];
    },
  };

}
