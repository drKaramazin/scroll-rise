import { FramesOrderFixture } from './frames-order.fixture';
import { ScrollRise, StaticActor, StickyPlatformScene } from '../lib';
import { TestMeasuringGrid } from './test-measuring-grid';
import { DummyMotion } from './dummy.motion';

describe('Frames order test', function() {
  let sceneElement: HTMLElement;
  let scene: StickyPlatformScene;
  let blockElement: HTMLElement;
  let block: StaticActor;
  let sr: ScrollRise;

  beforeEach(function() {
    document.body.insertAdjacentHTML('afterbegin', FramesOrderFixture.htmlTemplate());

    sceneElement = document.getElementById('scene')!;

    scene = new StickyPlatformScene(
      sceneElement,
      (w: number, h: number) => 5 * h,
      {
        measuringGrid: TestMeasuringGrid,
      },
    );

    sr = new ScrollRise(scene);

    blockElement = document.getElementById('block')!;

    block = new StaticActor(blockElement, {
      initOpacity: false,
      initPosition: false,
      initSize: false,
    });
  });

  afterEach(function() {
    sr.stop();
    document.body.removeChild(document.getElementById('test-body')!);
  });

  it('should be inited', function() {
    expect(sceneElement).toBeTruthy();
    expect(scene).toBeTruthy();
    expect(sr).toBeTruthy();
  });

  it('should have a correct order with only one frame', async function() {
    const motion = new DummyMotion('Single motion');

    const timeframe = FramesOrderFixture.timeFrames[0](motion);

    block.addFrames([timeframe]);

    const spy = spyOn(motion, 'make').and.callThrough();

    scene.add(block);

    const stages = FramesOrderFixture.stages();
    await FramesOrderFixture.goingStages(sr, stages);
    expect(spy).toHaveBeenCalledTimes(stages.length);
  });

  fit('should have a correct order with two frames apart', async function() {
    const motionOne = new DummyMotion('motion One');
    const motionTwo = new DummyMotion('motion Two');

    const timeframeOne = FramesOrderFixture.timeFrames[1](motionOne);
    const timeframeTwo = FramesOrderFixture.timeFrames[2](motionTwo);

    block.addFrames([timeframeOne, timeframeTwo]);

    const spyOne = spyOn(motionOne, 'make').and.callThrough();
    const spyTwo = spyOn(motionTwo, 'make').and.callThrough();

    scene.add(block);

    const stages = FramesOrderFixture.stages();
    await FramesOrderFixture.goingStages(sr, stages);
    expect(spyOne).toHaveBeenCalledTimes(10);
    expect(spyTwo).toHaveBeenCalledTimes(7);
  });
});
