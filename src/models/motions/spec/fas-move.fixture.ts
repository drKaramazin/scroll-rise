import { ChangeStage } from './test-tools';
import { Util } from '../../../util';
import { MoveFixture } from './move.fixture';

export class FasMoveFixture extends MoveFixture {

  static changeX = {
    timeFrame: MoveFixture.changeXTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        coords: {
          x: { value: 0 },
          y: { value: Util.innerHeight() },
        },
      }, {
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: 0 },
        },
      }, {
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
        coords: {
          x: { value: 0 },
          y: { value: Util.innerHeight() },
        },
      }, {
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        coords: {
          x: { value: 0 },
          y: { value: Util.clientHeight() - MoveFixture.block.height },
        },
      }, {
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
        coords: {
          x: { value: 0 },
          y: { value: Util.innerHeight() },
        },
      }, {
        coords: {
          x: { value: 0 },
          y: { value: 0 },
        },
      }, {
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: Util.clientHeight() - MoveFixture.block.height },
        },
      }, {
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: -MoveFixture.block.height },
        },
      }];
    },
  };

}
