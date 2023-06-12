import { ScrollRise, TimeFrame } from '../lib';
import { DummyMotion } from './dummy.motion';
import { MotionFixture, TestStage } from './motion.fixture';

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

  static stages: () => TestStage[] = MotionFixture.stages;

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
          sr.afterRender = () => resolve();
          window.scrollTo(stage.x, stage.y);
        });
      });
    }

    return promise;
  }

}
