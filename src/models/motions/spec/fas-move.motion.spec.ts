import { StaticActor } from '../../actors/static.actor';
import { ScrollRise } from '../../../scroll-rise';
import { FixedActorsScene } from '../../scenes/fixed-actors.scene';
import { MotionFixture } from './motion.fixture';
import { TestTools } from './test-tools';
import { MoveFixture } from './move.fixture';

describe("Fixed Actors Scene's move motion test", function() {
  let sceneElement: HTMLElement;
  let scene: FixedActorsScene;
  let blockElement: HTMLElement;
  let block: StaticActor;
  let sr: ScrollRise;

  beforeEach(function() {
    document.body.insertAdjacentHTML('afterbegin', MotionFixture.htmlTemplate());

    sceneElement = document.getElementById('scene')!;

    scene = new FixedActorsScene(
      sceneElement!,
      (w: number, h: number) => h,
    );

    sr = new ScrollRise(scene);

    blockElement = document.getElementById('block')!;

    block = new StaticActor(blockElement!, {
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
      MoveFixture.changeX.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      MoveFixture.changeX.stages(),
    );
  });

  it('should have a correct X, Y coords in changing Y', function() {
    block.addFrames([
      MoveFixture.changeY.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      MoveFixture.changeY.stages(),
    );
  });

  it('should have a correct X, Y coords in changing both X and Y', function() {
    block.addFrames([
      MoveFixture.changeXY.timeFrame(),
    ]);

    scene.add(block);

    return TestTools.testGoingStages(
      block,
      blockElement,
      MoveFixture.changeXY.stages(),
    );
  });
});
