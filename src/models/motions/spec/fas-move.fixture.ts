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
          y: { value: Util.innerHeight() },
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
          y: Util.innerHeight() + Util.clientHeight(),
        },
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: 0 },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 2 + Util.clientHeight(),
        },
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
        scrollTo: {
          x: 0,
          y: 0,
        },
        coords: {
          x: { value: 0 },
          y: { value: Util.innerHeight() },
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
          y: Util.innerHeight() + Util.clientHeight(),
        },
        coords: {
          x: { value: 0 },
          y: { value: Util.clientHeight() - MoveFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 2 + Util.clientHeight(),
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
          y: { value: Util.innerHeight() },
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
          y: Util.innerHeight() + Util.clientHeight(),
        },
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: Util.innerHeight() - MoveFixture.block.height },
        },
      }, {
        scrollTo: {
          x: 0,
          y: Util.innerHeight() * 2 + Util.clientHeight(),
        },
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: -MoveFixture.block.height },
        },
      }];
    },
  };

}
