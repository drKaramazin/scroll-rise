import { StickyPlatformScene } from '../scenes/sticky-platform.scene';
import { StaticActor } from '../actors/static.actor';
import { ScrollRise } from '../scroll-rise';
import { TestMeasuringGrid } from './test-measuring-grid';
import { OpacityFixture } from './opacity.fixture';
import { TestTools } from './test-tools';

describe('Sticky Platforms Scene: opacity motion test', function() {
  let sceneElement: HTMLElement;
  let scene: StickyPlatformScene;
  let blockElement: HTMLElement;
  let block: StaticActor;
  let sr: ScrollRise;

  beforeEach(function() {
    document.body.insertAdjacentHTML('afterbegin', OpacityFixture.htmlTemplate());

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
      initPosition: false,
      initSize: false,
    });
  });

  afterEach(function() {
    sr.stop();
    document.body.removeChild(document.getElementById('test-body')!);
  });

  it('should be inited', function() {
    expect(blockElement).toBeTruthy();
    expect(block).toBeTruthy();
    expect(sceneElement).toBeTruthy();
    expect(scene).toBeTruthy();
    expect(sr).toBeTruthy();
  });

  it('should have a correct opacity', function() {
    block.addFrames([
      OpacityFixture.changeOpacity.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      OpacityFixture.changeOpacity.stages(),
    );
  });
});
