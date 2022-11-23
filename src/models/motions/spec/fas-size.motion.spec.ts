import { FixedActorsScene } from '../../scenes/fixed-actors.scene';
import { StaticActor } from '../../actors/static.actor';
import { ScrollRise } from '../../../scroll-rise';
import { MotionFixture } from './motion.fixture';
import { SizeFixture } from './size.fixture';
import { TestTools } from './test-tools';
import { customMatchers } from './custom-matchers';

describe("Fixed Actors Scene's size motion test", function() {
  let sceneElement: HTMLElement;
  let scene: FixedActorsScene;
  let blockElement: HTMLElement;
  let block: StaticActor;
  let sr: ScrollRise;

  beforeEach(function() {
    jasmine.addMatchers(customMatchers);

    document.body.insertAdjacentHTML('afterbegin', MotionFixture.htmlTemplate());

    sceneElement = document.getElementById('scene')!;

    scene = new FixedActorsScene(
      sceneElement!,
      (w: number, h: number) => 3 * h,
    );

    sr = new ScrollRise(scene);

    blockElement = document.getElementById('block')!;

    block = new StaticActor(blockElement!, {
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
      SizeFixture.changeWidth.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      SizeFixture.changeWidth.stages(),
    );
  });

  it('should have a correct size in changing height', function() {
    block.addFrames([
      SizeFixture.changeHeight.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      SizeFixture.changeHeight.stages(),
    );
  });

  it('should have a correct size in changing width and height', function() {
    block.addFrames([
      SizeFixture.changeWidthHeight.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      SizeFixture.changeWidthHeight.stages(),
    );
  });
});
