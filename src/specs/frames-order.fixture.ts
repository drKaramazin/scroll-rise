import { ScrollRise, TimeFrame, Util } from '../lib';
import { DummyMotion } from './dummy.motion';
import { TestStage } from './motion.fixture';

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

  static timeFrames: Array<(motion: DummyMotion) => TimeFrame> = [
    (motion: DummyMotion) => new TimeFrame(
      motion,
      (w, h) => h,
      (w, h) => 3 * h,
    ),

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
  ];

  static goingStages(sr: ScrollRise, stages: TestStage[]): Promise<void> {
    let promise: Promise<void> = Promise.resolve();

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      promise = promise.then(() => {
        return new Promise(resolve => {
          sr.afterRender = () => {
            console.log(i);
            resolve();
          };
          window.scrollTo(stage.x, stage.y);
        });
      });
    }

    return promise;
  }

}
