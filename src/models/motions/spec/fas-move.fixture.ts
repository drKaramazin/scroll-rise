import { ChangeStage } from './test-tools';
import { Util } from '../../../util';
import { MoveFixture } from './move.fixture';

export class FasMoveFixture extends MoveFixture {

  static changeX = {
    timeFrame: MoveFixture.changeXTimeFrame,
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
          x: { value: Util.displayWidth() - MoveFixture.block.width },
          y: { value: 0 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        coords: {
          x: { value: Util.displayWidth() - MoveFixture.block.width },
          y: { value: -Util.displayHeight() },
        },
      }];
    },
  };

  static changeY = {
    timeFrame: MoveFixture.changeYTimeFrame,
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
          y: { value: Util.displayHeight() - MoveFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
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
          x: { value: Util.displayWidth() - MoveFixture.block.width },
          y: { value: Util.displayHeight() - MoveFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.displayHeight() * 3,
        },
        coords: {
          x: { value: Util.displayWidth() - MoveFixture.block.width },
          y: { value: -MoveFixture.block.height },
        },
      }];
    },
  };

}
