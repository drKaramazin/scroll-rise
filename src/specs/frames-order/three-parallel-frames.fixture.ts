import { OrderChanges } from './order-changes.model';
import { FramesOrderFixture } from './frames-order.fixture';
import { DummyMotion } from './dummy.motion';
import { TimeFrame } from '../../lib';
import { ChangeStage } from '../test-tools';

export class ThreeParallelFramesFixture {

  static changes(spyOne: jasmine.Spy, spyTwo: jasmine.Spy, spyThree: jasmine.Spy): OrderChanges {
    const stages = FramesOrderFixture.stages();

    return {
      timeFrames: [
        (motion: DummyMotion) => new TimeFrame(
          motion,
          (w, h) => h,
          (w, h) => 4 * h,
        ),
        (motion: DummyMotion) => new TimeFrame(
          motion,
          (w, h) => h,
          (w, h) => 4 * h,
        ),
        (motion: DummyMotion) => new TimeFrame(
          motion,
          (w, h) => h,
          (w, h) => 4 * h,
        ),
      ],
      stages: (): ChangeStage[] => {
        return [{
          scrollTo: stages[0],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 1,
          }],
        }, {
          scrollTo: stages[1],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 2,
          }],
        }, {
          scrollTo: stages[2],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 3,
          }],
        }, {
          scrollTo: stages[3],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 4,
          }],
        }, {
          scrollTo: stages[4],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 5,
          }],
        }, {
          scrollTo: stages[5],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 6,
          }],
        }, {
          scrollTo: stages[6],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 7,
          }],
        }, {
          scrollTo: stages[7],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 8,
          }],
        }, {
          scrollTo: stages[8],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 9,
          }],
        }, {
          scrollTo: stages[9],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 10,
          }],
        }, {
          scrollTo: stages[10],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 11,
          }],
        }, {
          scrollTo: stages[11],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 12,
          }],
        }, {
          scrollTo: stages[12],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 13,
          }],
        }, {
          scrollTo: stages[13],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 14,
          }],
        }, {
          scrollTo: stages[14],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 15,
          }],
        }, {
          scrollTo: stages[15],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 16,
          }],
        }, {
          scrollTo: stages[16],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 0,
          }, {
            spy: spyTwo,
            times: 0,
          }, {
            spy: spyThree,
            times: 17,
          }],
        }];
      },
    };
  }

}
