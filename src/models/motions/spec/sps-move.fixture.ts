import { ChangeStage } from './test-tools';
import { Util } from '../../../util';
import { MoveFixture } from './move.fixture';

export class SpsMoveFixture extends MoveFixture {

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
          y: Util.innerHeight(),
        },
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 2,
        },
        coords: {
          x: { value: Util.displayWidth() - MoveFixture.block.width },
          y: { value: -Util.displayHeight() },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 3,
        },
        coords: {
          x: { value: Util.displayWidth() - MoveFixture.block.width },
          y: { value: -Util.displayHeight() * 2 },
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
          y: Util.innerHeight(),
        },
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 2,
        },
        coords: {
          x: { value: 0 },
          y: { value: -MoveFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 3,
        },
        coords: {
          x: { value: 0 },
          y: { value: -Util.displayHeight() - MoveFixture.block.height },
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
          y: Util.innerHeight(),
        },
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 2,
        },
        coords: {
          x: { value: Util.displayWidth() - MoveFixture.block.width },
          y: { value: -MoveFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 3,
        },
        coords: {
          x: { value: Util.displayWidth() - MoveFixture.block.width },
          y: { value: -Util.displayHeight() - MoveFixture.block.height },
        },
      }];
    },
  };

}
