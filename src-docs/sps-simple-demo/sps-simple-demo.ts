import {
  ScrollRise,
  StaticActor,
  TimeFrame,
  MoveMotion,
  SizeMotion,
  OpacityMotion,
  StickyPlatformScene,
} from "../../src/index";

const firstBlock = new StaticActor(document.getElementById('first-block')!);
const secondBlock = new StaticActor(document.getElementById('second-block')!);
const thirdBlock = new StaticActor(document.getElementById('third-block')!);
const fourthBlock = new StaticActor(document.getElementById('fourth-block')!);
const agenda = new StaticActor(document.getElementById('agenda')!);

type Fn = (w: number, h: number) => number;

const offset: Fn = (w, h) => -h/2;
const sceneHeight: Fn = (w, h) => (h * 2) + offset(w, h);

const blockWidth: Fn = (w, h) => w/4;
const blockHeight: Fn = (w, h) => h/8;

const firstHalfBlockX: Fn = (w, h) => w/4 - blockWidth(w, h)/2;
const secondHalfStartBlockX: Fn = (w, h) => w/4 * 3 - blockWidth(w, h)/2;
const secondHalfEndBlockX: Fn = (w, h) => w/2;
const firstHalfBlockY: Fn = (w, h) => h/8 - blockHeight(w, h)/2;
const secondHalfBlockY: Fn = (w, h) => h/8 * 3 - blockHeight(w, h)/2;

const endBlockWidth: Fn = (w, h) => w/2 - firstHalfBlockX(w, h);

const hideBlockFrame = new TimeFrame(new OpacityMotion({
  start: () => 1,
  end: () => 0,
}), (w, h) => 0, (w, h) => h/2);

firstBlock.addFrames([
  new TimeFrame(new MoveMotion({
    startX: firstHalfBlockX,
    endX: firstHalfBlockX,
    startY: firstHalfBlockY,
    endY: firstHalfBlockY,
  }), (w, h) => 0, (w, h) => h/2),
  new TimeFrame(new SizeMotion({
    startWidth: blockWidth,
    startHeight: blockHeight,
    endWidth: endBlockWidth,
    endHeight: blockHeight,
  }), (w, h) => 0, (w, h) => h/2),
  hideBlockFrame,
]);

secondBlock.addFrames([
  new TimeFrame(new MoveMotion({
    startX: secondHalfStartBlockX,
    endX: secondHalfEndBlockX,
    startY: firstHalfBlockY,
    endY: firstHalfBlockY,
  }), (w, h) => 0, (w, h) => h/2),
  new TimeFrame(new SizeMotion({
    startWidth: blockWidth,
    startHeight: blockHeight,
    endWidth: endBlockWidth,
    endHeight: blockHeight,
  }), (w, h) => 0, (w, h) => h/2),
  hideBlockFrame,
]);

thirdBlock.addFrames([
  new TimeFrame(new MoveMotion({
    startX: firstHalfBlockX,
    endX: firstHalfBlockX,
    startY: secondHalfBlockY,
    endY: secondHalfBlockY,
  }), (w, h) => 0, (w, h) => h/2),
  new TimeFrame(new SizeMotion({
    startWidth: blockWidth,
    startHeight: blockHeight,
    endWidth: endBlockWidth,
    endHeight: blockHeight,
  }), (w, h) => 0, (w, h) => h/2),
  hideBlockFrame,
]);

fourthBlock.addFrames([
  new TimeFrame(new MoveMotion({
    startX: secondHalfStartBlockX,
    endX: secondHalfEndBlockX,
    startY: secondHalfBlockY,
    endY: secondHalfBlockY,
  }), (w, h) => 0, (w, h) => h/2),
  new TimeFrame(new SizeMotion({
    startWidth: blockWidth,
    startHeight: blockHeight,
    endWidth: endBlockWidth,
    endHeight: blockHeight,
  }), (w, h) => 0, (w, h) => h/2),
  hideBlockFrame,
]);

const agendaStartWidth: Fn = (w, h) => w/4;
const agendaStartHeight: Fn = (w, h) => h/4;
const agendaEndWidth: Fn = (w, h) => w/2;
const agendaEndHeight: Fn = (w, h) => h/2;

agenda.addFrames([
  new TimeFrame(new MoveMotion({
    startX: (w, h) => w/2 - agendaStartWidth(w, h)/2,
    endX: (w, h) => w/2 - agendaEndWidth(w, h)/2,
    startY: (w, h) => h/4 - agendaStartHeight(w, h)/2,
    endY: (w, h) => h/4 - agendaEndHeight(w, h)/2,
  }), (w, h) => 0, (w, h) => h/2),
  new TimeFrame(new SizeMotion({
    startWidth: agendaStartWidth,
    startHeight: agendaStartHeight,
    endWidth: agendaEndWidth,
    endHeight: agendaEndHeight,
  }), (w, h) => 0, (w, h) => h/2),
  new TimeFrame(new OpacityMotion({
    start: () => 0,
    end: () => 1,
  }), (w, h) => 0, (w, h) => h/2),
]);

const scene = new StickyPlatformScene(
  document.getElementById('scene')!,
  sceneHeight,
  {
    offset,
    stickyPlatformHeight: (w, h) => h/2,
  }
);

scene.add(firstBlock);
scene.add(secondBlock);
scene.add(thirdBlock);
scene.add(fourthBlock);
scene.add(agenda);

const sr = new ScrollRise(scene);
