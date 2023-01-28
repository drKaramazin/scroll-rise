import {
  Motion,
  RefActor,
  ScrollRise,
  SizeMotion,
  StaticActor,
  StickyPlatformScene,
  TimeFrame, Util,
  Value
} from "../../../lib/index";
import { Scene } from "../../../lib/scenes/scene";

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface LinearColorStop {
  lengthPercentage: number;
  color: RGBA;
}

interface LinearGradient {
  angle: number;
  stopList: LinearColorStop[];
}

class BackgroundLinearGradientMotion extends Motion {

  name = 'BackgroundLinearGradientMotion';

  start: LinearGradient;
  end: LinearGradient;

  constructor(data: { start: LinearGradient, end: LinearGradient }) {
    super();

    this.start = data.start;
    this.end = data.end;

    if (this.start.stopList.length !== this.end.stopList.length) {
      throw new Error('Stop-list lengths of linear gradients are not equal in ' + this.name);
    }
  }

  makeRGBA(color: RGBA): string {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  }

  makeStopList(stopList: LinearColorStop[]): string {
    return stopList.map(stop => `${this.makeRGBA(stop.color)} ${stop.lengthPercentage}%`).join(', ');
  }

  makeBackgroundStyle(gradient: LinearGradient): string {
    return `linear-gradient(${gradient.angle}deg, ${this.makeStopList(gradient.stopList)})`;
  }

  make(
    scrollPos: number,
    frame: TimeFrame,
    element: HTMLElement,
    scene: Scene<any>,
  ) {
    if (element) {
      const d = scrollPos / frame.length();

      if (d < 0) {
        element.style.background = this.makeBackgroundStyle(this.start);
        return;
      }
      if (d > 1) {
        element.style.background = this.makeBackgroundStyle(this.end);
        return;
      }

      const calcValue = (start: number, end: number) => Util.castToInt(start + (end - start) * d);

      const stopList = this.start.stopList.map((item , index): LinearColorStop => {
        const r = calcValue(item.color.r, this.end.stopList[index].color.r);
        const g = calcValue(item.color.g, this.end.stopList[index].color.g);
        const b = calcValue(item.color.b, this.end.stopList[index].color.b);
        const a = calcValue(item.color.a, this.end.stopList[index].color.a);
        const lengthPercentage: number = calcValue(item.lengthPercentage, this.end.stopList[index].lengthPercentage);

        return {
          lengthPercentage,
          color: {
            r,
            g,
            b,
            a,
          }
        };
      });

      element.style.background = this.makeBackgroundStyle({
        stopList,
        angle: calcValue(this.start.angle, this.end.angle),
      });
    }
  }

}

const sceneFn: { height: Value } = {
  height: (w, h) => h,
};

const scene = new StickyPlatformScene(
  document.getElementById('scene')!,
  (w, h) => 3 * h,
  {
    stickyPlatformHeight: sceneFn.height,
  }
);

const picture = new RefActor(document.getElementById('svg320')!);


const pictureBack = new StaticActor(document.getElementById('picture-back')!, {
  initOpacity: false,
  initPosition: false,
});

pictureBack.addFrame(new TimeFrame(new SizeMotion({
  startWidth: (w) => w,
  endWidth: (w) => w,
  startHeight: (w, h) => h,
  endHeight: (w, h) => h
}), () => 0, (w, h) => h));

pictureBack.addFrame(new TimeFrame(new BackgroundLinearGradientMotion({
  start: {
    angle: 0,
    stopList: [{
      lengthPercentage: 35,
      color: {
        r: 222,
        g: 243,
        b: 212,
        a: 1,
      },
    }, {
      lengthPercentage: 100,
      color: {
        r: 238,
        g: 237,
        b: 176,
        a: 1,
      }
    }]
  },
  end: {
    angle: 0,
    stopList: [{
      lengthPercentage: 35,
      color: {
        r: 154,
        g: 189,
        b: 250,
        a: 1,
      },
    }, {
      lengthPercentage: 100,
      color: {
        r: 185,
        g: 216,
        b: 252,
        a: 1,
      }
    }]
  },
}), () => 0, (w, h) => 2 * h));

scene.add(pictureBack);
scene.add(picture);

const sr = new ScrollRise(scene);