import { Motion, TimeFrame, Util } from '../lib';
import { DummyMotion } from './dummy.motion';
import { TestStage } from './motion.fixture';
import { ChangeStage } from './test-tools';

interface OrderChanges {
  timeFrames: Array<(motion: Motion) => TimeFrame>;
  stages: () => ChangeStage[];
}

export class FramesOrderFixture {

  static block = {
    width: 17,
    height: 12,
  };

  static htmlTemplate(): string {
    return `
      <div id="test-body">
        <div class="display"></div>
        <div class="display"></div>
        <div id="scene">
            <div id="block" style="width: ${FramesOrderFixture.block.width}px; height: ${FramesOrderFixture.block.height}px;"></div>
        </div>
        <div class="display"></div>
        <div class="display"></div>
      </div>
    `;
  }

  static stages: () => TestStage[] = function() {
    return [{
      x: 0,
      y: 0,
    }, {
      x: 0,
      y: Util.castToInt(Util.innerHeight() / 2),
    }, {
      x: 0,
      y: Util.innerHeight(),
    }, {
      x: 0,
      y: Util.innerHeight() + Util.castToInt(Util.innerHeight() / 2),
    }, {
      x: 0,
      y: 2 * Util.innerHeight(),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + Util.castToInt(Util.clientHeight() / 2),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + Util.clientHeight(),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + Util.clientHeight() + Util.castToInt(Util.clientHeight() / 2),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + 2 * Util.clientHeight(),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + 2 * Util.clientHeight() + Util.castToInt(Util.clientHeight() / 2),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + 3 * Util.clientHeight(),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + 3 * Util.clientHeight() + Util.castToInt(Util.clientHeight() / 2),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + 4 * Util.clientHeight(),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + 4 * Util.clientHeight() + Util.castToInt(Util.clientHeight() / 2),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + 5 * Util.clientHeight(),
    }, {
      x: 0,
      y: 2 * Util.innerHeight() + 5 * Util.clientHeight() + Util.castToInt(Util.innerHeight() / 2),
    }, {
      x: 0,
      y: 3 * Util.innerHeight() + 5 * Util.clientHeight(),
    }];
  };

  static firstChanges(spy: jasmine.Spy): OrderChanges {
    return {
      timeFrames: [
        (motion: DummyMotion) => new TimeFrame(
          motion,
          (w, h) => h,
          (w, h) => 3 * h,
        ),
      ],
      stages: (): ChangeStage[] => {
        return [{
          scrollTo: this.stages()[0],
          toHaveBeenCalledTimes: [{
            spy,
            times: 1,
          }],
        }, {
          scrollTo: this.stages()[1],
          toHaveBeenCalledTimes: [{
            spy,
            times: 2,
          }],
        }, {
          scrollTo: this.stages()[2],
          toHaveBeenCalledTimes: [{
            spy,
            times: 3,
          }],
        }, {
          scrollTo: this.stages()[3],
          toHaveBeenCalledTimes: [{
            spy,
            times: 4,
          }],
        }, {
          scrollTo: this.stages()[4],
          toHaveBeenCalledTimes: [{
            spy,
            times: 5,
          }],
        }, {
          scrollTo: this.stages()[5],
          toHaveBeenCalledTimes: [{
            spy,
            times: 6,
          }],
        }, {
          scrollTo: this.stages()[6],
          toHaveBeenCalledTimes: [{
            spy,
            times: 7,
          }],
        }, {
          scrollTo: this.stages()[7],
          toHaveBeenCalledTimes: [{
            spy,
            times: 8,
          }],
        }, {
          scrollTo: this.stages()[8],
          toHaveBeenCalledTimes: [{
            spy,
            times: 9,
          }],
        }, {
          scrollTo: this.stages()[9],
          toHaveBeenCalledTimes: [{
            spy,
            times: 10,
          }],
        }, {
          scrollTo: this.stages()[10],
          toHaveBeenCalledTimes: [{
            spy,
            times: 11,
          }],
        }, {
          scrollTo: this.stages()[11],
          toHaveBeenCalledTimes: [{
            spy,
            times: 12,
          }],
        }, {
          scrollTo: this.stages()[12],
          toHaveBeenCalledTimes: [{
            spy,
            times: 13,
          }],
        }, {
          scrollTo: this.stages()[13],
          toHaveBeenCalledTimes: [{
            spy,
            times: 14,
          }],
        }, {
          scrollTo: this.stages()[14],
          toHaveBeenCalledTimes: [{
            spy,
            times: 15,
          }],
        }, {
          scrollTo: this.stages()[15],
          toHaveBeenCalledTimes: [{
            spy,
            times: 16,
          }],
        }, {
          scrollTo: this.stages()[16],
          toHaveBeenCalledTimes: [{
            spy,
            times: 17,
          }],
        }];
      },
    };
  };

  static secondChanges(spyOne: jasmine.Spy, spyTwo: jasmine.Spy): OrderChanges {
    return {
      timeFrames: [
        (motion: DummyMotion) => new TimeFrame(
          motion,
          (w, h) => h,
          (w, h) => 2 * h,
        ),
        (motion: DummyMotion) => new TimeFrame(
          motion,
          (w, h) => 3 * h,
          (w, h) => 4 * h,
        ),
      ],
      stages: (): ChangeStage[] => {
        return [{
          scrollTo: this.stages()[0],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 1,
          }, {
            spy: spyTwo,
            times: 0,
          }],
        }, {
          scrollTo: this.stages()[1],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 2,
          }, {
            spy: spyTwo,
            times: 0,
          }],
        }, {
          scrollTo: this.stages()[2],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 3,
          }, {
            spy: spyTwo,
            times: 0,
          }],
        }, {
          scrollTo: this.stages()[3],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 4,
          }, {
            spy: spyTwo,
            times: 0,
          }],
        }, {
          scrollTo: this.stages()[4],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 5,
          }, {
            spy: spyTwo,
            times: 0,
          }],
        }, {
          scrollTo: this.stages()[5],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 6,
          }, {
            spy: spyTwo,
            times: 0,
          }],
        }, {
          scrollTo: this.stages()[6],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 7,
          }, {
            spy: spyTwo,
            times: 0,
          }],
        }, {
          scrollTo: this.stages()[7],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 8,
          }, {
            spy: spyTwo,
            times: 0,
          }],
        }, {
          scrollTo: this.stages()[8],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 9,
          }, {
            spy: spyTwo,
            times: 0,
          }],
        }, {
          scrollTo: this.stages()[9],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 10,
          }, {
            spy: spyTwo,
            times: 0,
          }],
        }, {
          scrollTo: this.stages()[10],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 10,
          }, {
            spy: spyTwo,
            times: 1,
          }],
        }, {
          scrollTo: this.stages()[11],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 10,
          }, {
            spy: spyTwo,
            times: 2,
          }],
        }, {
          scrollTo: this.stages()[12],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 10,
          }, {
            spy: spyTwo,
            times: 3,
          }],
        }, {
          scrollTo: this.stages()[13],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 10,
          }, {
            spy: spyTwo,
            times: 4,
          }],
        }, {
          scrollTo: this.stages()[14],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 10,
          }, {
            spy: spyTwo,
            times: 5,
          }],
        }, {
          scrollTo: this.stages()[15],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 10,
          }, {
            spy: spyTwo,
            times: 6,
          }],
        }, {
          scrollTo: this.stages()[16],
          toHaveBeenCalledTimes: [{
            spy: spyOne,
            times: 10,
          }, {
            spy: spyTwo,
            times: 7,
          }],
        }];
      },
    };
  };

}
