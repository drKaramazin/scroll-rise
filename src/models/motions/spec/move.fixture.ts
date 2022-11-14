import { MotionFixture } from './motion.fixture';
import { TimeFrame } from '../../time-frame.model';
import { MoveMotion } from '../move.motion';
import { ChangeStage } from './test-tools';
import { Util } from '../../../util';

export abstract class MoveFixture extends MotionFixture {

  static changeXTimeFrame(): TimeFrame {
    return new TimeFrame(new MoveMotion({
      startX: () => 0,
      startY: () => 0,
      endX: (w: number) => w - MotionFixture.block.width,
      endY: () => 0,
    }), () => 0, (w: number, h: number) => h);
  };

  static changeYTimeFrame(): TimeFrame {
    return new TimeFrame(new MoveMotion({
      startX: () => 0,
      startY: () => 0,
      endX: () => 0,
      endY: (w: number, h: number) => h - MotionFixture.block.height,
    }), () => 0, (w: number, h: number) => h);
  }

  static changeXYTimeFrame(): TimeFrame {
    return new TimeFrame(new MoveMotion({
      startX: () => 0,
      startY: () => 0,
      endX: (w: number) => w - MotionFixture.block.width,
      endY: (w: number, h: number) => h - MotionFixture.block.height,
    }), () => 0, (w: number, h: number) => h);
  }

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
          y: { value: -Util.clientHeight() },
        },
      }, {
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: -Util.innerHeight() - Util.clientHeight() },
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
          y: { value: -MoveFixture.block.height },
        },
      }, {
        coords: {
          x: { value: 0 },
          y: { value: -Util.innerHeight() - MoveFixture.block.height },
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
          y: { value: -MoveFixture.block.height },
        },
      }, {
        coords: {
          x: { value: Util.clientWidth() - MoveFixture.block.width },
          y: { value: -Util.innerHeight() - MoveFixture.block.height },
        },
      }];
    },
  };

}
