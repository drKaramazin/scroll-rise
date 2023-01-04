import {
  ScrollRise,
  FixedActorsScene,
  StaticActor,
  TimeFrame,
  MoveMotion,
  SizeMotion,
  OpacityMotion,
  Value,
} from "../../../lib/index";

const firstBlock = new StaticActor(document.getElementById('first-block')!);
const secondBlock = new StaticActor(document.getElementById('second-block')!);
const thirdBlock = new StaticActor(document.getElementById('third-block')!);
const fourthBlock = new StaticActor(document.getElementById('fourth-block')!);
const agenda = new StaticActor(document.getElementById('agenda')!);

const sceneHeight: Value = (w, h) => h * 2;

const blockWidth: Value = (w, h) => w/4;
const blockHeight: Value = (w, h) => h/8;

const firstHalfBlockX: Value = (w, h) => w/4 - blockWidth(w, h)/2;
const secondHalfStartBlockX: Value = (w, h) => w/4 * 3 - blockWidth(w, h)/2;
const secondHalfEndBlockX: Value = (w, h) => w/2;
const firstHalfBlockY: Value = (w, h) => h/4 - blockHeight(w, h)/2;
const secondHalfBlockY: Value = (w, h) => h/4 * 3 - blockHeight(w, h)/2;

const endBlockWidth: Value = (w, h) => w/2 - firstHalfBlockX(w, h);

const hideBlockFrame = new TimeFrame(new OpacityMotion({
  start: () => 1,
  end: () => 0,
}), (w, h) => 0, (w, h) => h);

firstBlock.addFrames([
  new TimeFrame(new MoveMotion({
    startX: firstHalfBlockX,
    endX: firstHalfBlockX,
    startY: firstHalfBlockY,
    endY: firstHalfBlockY,
  }), (w, h) => 0, (w, h) => h),
  new TimeFrame(new SizeMotion({
    startWidth: blockWidth,
    startHeight: blockHeight,
    endWidth: endBlockWidth,
    endHeight: blockHeight,
  }), (w, h) => 0, (w, h) => h),
  hideBlockFrame,
]);

secondBlock.addFrames([
  new TimeFrame(new MoveMotion({
    startX: secondHalfStartBlockX,
    endX: secondHalfEndBlockX,
    startY: firstHalfBlockY,
    endY: firstHalfBlockY,
  }), (w, h) => 0, (w, h) => h),
  new TimeFrame(new SizeMotion({
    startWidth: blockWidth,
    startHeight: blockHeight,
    endWidth: endBlockWidth,
    endHeight: blockHeight,
  }), (w, h) => 0, (w, h) => h),
  hideBlockFrame,
]);

thirdBlock.addFrames([
  new TimeFrame(new MoveMotion({
    startX: firstHalfBlockX,
    endX: firstHalfBlockX,
    startY: secondHalfBlockY,
    endY: secondHalfBlockY,
  }), (w, h) => 0, (w, h) => h),
  new TimeFrame(new SizeMotion({
    startWidth: blockWidth,
    startHeight: blockHeight,
    endWidth: endBlockWidth,
    endHeight: blockHeight,
  }), (w, h) => 0, (w, h) => h),
  hideBlockFrame,
]);

fourthBlock.addFrames([
  new TimeFrame(new MoveMotion({
    startX: secondHalfStartBlockX,
    endX: secondHalfEndBlockX,
    startY: secondHalfBlockY,
    endY: secondHalfBlockY,
  }), (w, h) => 0, (w, h) => h),
  new TimeFrame(new SizeMotion({
    startWidth: blockWidth,
    startHeight: blockHeight,
    endWidth: endBlockWidth,
    endHeight: blockHeight,
  }), (w, h) => 0, (w, h) => h),
  hideBlockFrame,
]);

const agendaStartWidth: Value = (w, h) => w/4;
const agendaStartHeight: Value = (w, h) => h/4;
const agendaEndWidth: Value = (w, h) => w/2;
const agendaEndHeight: Value = (w, h) => h/2;

agenda.addFrames([
  new TimeFrame(new MoveMotion({
    startX: (w, h) => w/2 - agendaStartWidth(w, h)/2,
    endX: (w, h) => w/2 - agendaEndWidth(w, h)/2,
    startY: (w, h) => h/2 - agendaStartHeight(w, h)/2,
    endY: (w, h) => h/2 - agendaEndHeight(w, h)/2,
  }), (w, h) => 0, (w, h) => h),
  new TimeFrame(new SizeMotion({
    startWidth: agendaStartWidth,
    startHeight: agendaStartHeight,
    endWidth: agendaEndWidth,
    endHeight: agendaEndHeight,
  }), (w, h) => 0, (w, h) => h),
  new TimeFrame(new OpacityMotion({
    start: () => 0,
    end: () => 1,
  }), (w, h) => 0, (w, h) => h),
]);

const scene = new FixedActorsScene(
  document.getElementById('scene')!,
  sceneHeight,
);

scene.add(firstBlock);
scene.add(secondBlock);
scene.add(thirdBlock);
scene.add(fourthBlock);
scene.add(agenda);

const sr = new ScrollRise(scene);