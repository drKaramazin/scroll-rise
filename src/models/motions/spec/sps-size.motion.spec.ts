import { SpsSizeFixture } from './sps-size.fixture';
import { StickyPlatformScene } from '../../scenes/sticky-platform.scene';
import { ScrollRise } from '../../../scroll-rise';
import { StaticActor } from '../../actors/static.actor';
import { TestTools } from './test-tools';

describe("Sticky Platforms Scene's size motion test", function() {
  let sceneElement: HTMLElement;
  let scene: StickyPlatformScene;
  let blockElement: HTMLElement;
  let block: StaticActor;
  let sr: ScrollRise;

  beforeEach(function() {
    document.body.insertAdjacentHTML('afterbegin', SpsSizeFixture.htmlTemplate());

    sceneElement = document.getElementById('scene')!;

    scene = new StickyPlatformScene(
      sceneElement,
      (w: number, h: number) => h,
    );

    sr = new ScrollRise(scene);

    blockElement = document.getElementById('block')!;

    block = new StaticActor(blockElement, {
      initOpacity: false,
      initPosition: false,
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

  it('should have a correct size in changing width', function() {
    block.addFrames([
      SpsSizeFixture.changeWidth.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      SpsSizeFixture.changeWidth.stages(),
    );
  });

  it('should have a correct size in changing height', function() {
    block.addFrames([
      SpsSizeFixture.changeHeight.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      SpsSizeFixture.changeHeight.stages(),
    );
  });

  it('should have a correct size in changing width and height', function() {
    block.addFrames([
      SpsSizeFixture.changeWidthHeight.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      SpsSizeFixture.changeWidthHeight.stages(),
    );
  });
});
