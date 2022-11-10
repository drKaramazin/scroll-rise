import { ScrollRise } from '../../../scroll-rise';
import { StickyPlatformScene } from '../../scenes/sticky-platform.scene';
import { StaticActor } from '../../actors/static.actor';
import { SpsMoveFixture } from './sps-move.fixture';
import { TestTools } from './test-tools';
import { Util } from '../../../util';

describe("Sticky Platforms Scene's move motion test", function() {
  let sceneElement: HTMLElement;
  let scene: StickyPlatformScene;
  let blockElement: HTMLElement;
  let block: StaticActor;
  let sr: ScrollRise;

  beforeEach(function() {
    document.body.insertAdjacentHTML('afterbegin', SpsMoveFixture.htmlTemplate());

    sceneElement = document.getElementById('scene')!;

    scene = new StickyPlatformScene(
      sceneElement,
      (w: number, h: number) => h,
    );

    sr = new ScrollRise(scene);

    blockElement = document.getElementById('block')!;

    block = new StaticActor(blockElement, {
      initSize: false,
      initOpacity: false,
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

  it('should have a correct X, Y coords in changing X', function() {
    block.addFrames([
      SpsMoveFixture.changeX.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      SpsMoveFixture.changeX.stages(),
    );
  });

  it('should have a correct X, Y coords in changing Y', function() {
    block.addFrames([
      SpsMoveFixture.changeY.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      SpsMoveFixture.changeY.stages(),
    );
  });

  it('should have a correct X, Y coords in changing both X and Y', function() {
    block.addFrames([
      SpsMoveFixture.changeXY.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      SpsMoveFixture.changeXY.stages(),
    );
  });
});
