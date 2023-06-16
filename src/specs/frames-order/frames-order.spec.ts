import { FramesOrderFixture } from './frames-order.fixture';
import { ScrollRise, StaticActor, StickyPlatformScene } from '../../lib';
import { TestMeasuringGrid } from '../test-measuring-grid';
import { DummyMotion } from './dummy.motion';
import { TestTools } from '../test-tools';

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

  it('should have a correct order with only one frame', function() {
    const motion = new DummyMotion('Single motion');

    const spy = spyOn(motion, 'make').and.callThrough();

    const changes = FramesOrderFixture.firstChanges(spy);

    const timeframe = changes.timeFrames[0](motion);

    block.addFrames([timeframe]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      changes.stages(),
    );
  });

  it('should have a correct order with two frames apart', function() {
    const motionOne = new DummyMotion('motion One');
    const motionTwo = new DummyMotion('motion Two');

    const spyOne = spyOn(motionOne, 'make').and.callThrough();
    const spyTwo = spyOn(motionTwo, 'make').and.callThrough();

    const changes = FramesOrderFixture.secondChanges(spyOne, spyTwo);

    const timeframeOne = changes.timeFrames[0](motionOne);
    const timeframeTwo = changes.timeFrames[1](motionTwo);

    block.addFrames([timeframeOne, timeframeTwo]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      changes.stages(),
    );
  });
});
