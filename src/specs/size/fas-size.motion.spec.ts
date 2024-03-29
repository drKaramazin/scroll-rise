import { FixedActorsScene, StaticActor, ScrollRise, TimeFrame, MoveMotion } from '../../lib';
import { MotionFixture } from '../motion.fixture';
import { SizeFixture } from './size.fixture';
import { TestTools } from '../test-tools';
import { customMatchers } from '../custom-matchers';
import { generateExamples } from '../generate-examples';
import { TestMeasuringGrid } from '../test-measuring-grid';

describe('Fixed Actors Scene: size motion test', function() {
  let sceneElement: HTMLElement;
  let scene: FixedActorsScene;
  let blockElement: HTMLElement;
  let block: StaticActor;
  let sr: ScrollRise;

  generateExamples([
    'should have a correct size in changing width',
    'should have a correct size in changing height',
    'should have a correct size in changing width and height',
  ]);

  beforeEach(function() {
    jasmine.addMatchers(customMatchers);

    document.body.insertAdjacentHTML('afterbegin', MotionFixture.htmlTemplate());

    sceneElement = document.getElementById('scene')!;

    scene = new FixedActorsScene(
      sceneElement!,
      (w: number, h: number) => 5 * h,
      {
        measuringGrid: TestMeasuringGrid,
      },
    );

    sr = new ScrollRise(scene);

    blockElement = document.getElementById('block')!;

    block = new StaticActor(blockElement!, {
      initOpacity: false,
    });

    // To show an actor in docs
    block.addFrames([
      new TimeFrame(new MoveMotion({
        startX: () => 0,
        endX: () => 0,
        startY: () => 0,
        endY: () => 0,
      }), () => 0, () => 0),
    ]);
  });

  afterEach(function() {
    sr.stop();
    document.body.removeChild(document.getElementById('test-body')!);
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
