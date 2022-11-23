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
    }), (w: number, h: number) => h, (w: number, h: number) => 3 * h);
  };

  static changeYTimeFrame(): TimeFrame {
    return new TimeFrame(new MoveMotion({
      startX: () => 0,
      startY: () => 0,
      endX: () => 0,
      endY: (w: number, h: number) => h - MotionFixture.block.height,
    }), (w: number, h: number) => h, (w: number, h: number) => 3 * h);
  }

  static changeXYTimeFrame(): TimeFrame {
    return new TimeFrame(new MoveMotion({
      startX: () => 0,
      startY: () => 0,
      endX: (w: number) => w - MotionFixture.block.width,
      endY: (w: number, h: number) => h - MotionFixture.block.height,
    }), (w: number, h: number) => h, (w: number, h: number) => 3 * h);
  }

  static changeX = {
    timeFrame: MoveFixture.changeXTimeFrame,
    stages: (): ChangeStage[] => {
      return [{
        coords: {
          x: { value: 0 },
          y: { value: 2 * Util.innerHeight() },
        },
      }, {
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
          y: { value: 0 },
        },
      }, {
        coords: {
          x: { value: Math.round((Util.clientWidth() - MoveFixture.block.width) / 2), margin: 1 },
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
          y: { value: 2 * Util.innerHeight() },
        },
      }, {
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
          y: { value: 0 },
        },
      }, {
        coords: {
          x: { value: 0 },
          y: { value: Math.round((Util.clientHeight() - MoveFixture.block.height) / 2) },
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
          x: this.changeX.stages()[0].coords!.x,
          y: this.changeY.stages()[0].coords!.y,
        },
      }, {
        coords: {
          x: this.changeX.stages()[1].coords!.x,
          y: this.changeY.stages()[1].coords!.y,
        },
      }, {
        coords: {
          x: this.changeX.stages()[2].coords!.x,
          y: this.changeY.stages()[2].coords!.y,
        },
      }, {
        coords: {
          x: this.changeX.stages()[3].coords!.x,
          y: this.changeY.stages()[3].coords!.y,
        },
      }, {
        coords: {
          x: this.changeX.stages()[4].coords!.x,
          y: this.changeY.stages()[4].coords!.y,
        },
      }, {
        coords: {
          x: this.changeX.stages()[5].coords!.x,
          y: this.changeY.stages()[5].coords!.y,
        },
      }, {
        coords: {
          x: this.changeX.stages()[6].coords!.x,
          y: this.changeY.stages()[6].coords!.y,
        },
      }, {
        coords: {
          x: this.changeX.stages()[7].coords!.x,
          y: this.changeY.stages()[7].coords!.y,
        },
      }];
    },
  };

}
