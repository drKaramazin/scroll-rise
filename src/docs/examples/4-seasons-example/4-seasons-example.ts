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

class SVGLinearGradientMotion extends Motion {

  name = 'SVGLinearGradientMotion';

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

  defineElement(gradient: LinearGradient, container: HTMLElement) {
    container.setAttribute('gradientTransform', `rotate(${gradient.angle})`);
    container.innerHTML = '';
    for (let stop of gradient.stopList) {
      const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stopElement.setAttribute('offset', `${stop.lengthPercentage}%`);
      stopElement.setAttribute('stop-color', `rgba(${stop.color.r}, ${stop.color.g}, ${stop.color.b}, ${stop.color.a})`);
      container.append(stopElement);
    }
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
        this.defineElement(this.start, element);
        return;
      }
      if (d > 1) {
        this.defineElement(this.end, element);
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

      this.defineElement({
        stopList,
        angle: calcValue(this.start.angle, this.end.angle),
      }, element);
    }
  }

}

class FillMotion extends Motion {

  name = 'FillMotion';

  start: RGBA;
  end: RGBA;

  constructor(data: { start: RGBA, end: RGBA }) {
    super();

    this.start = data.start;
    this.end = data.end;
  }

  calcRGBA(start: RGBA, end: RGBA, delta: number): RGBA {
    const calcValue = (start: number, end: number) => Util.castToInt(start + (end - start) * delta);

    const r = calcValue(start.r, end.r);
    const g = calcValue(start.g, end.g);
    const b = calcValue(start.b, end.b);
    const a = calcValue(start.a, end.a);

    return { r, g, b, a };
  }

  makeRGBA(color: RGBA): string {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
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
        element.style.fill = this.makeRGBA(this.start);
        return;
      }
      if (d > 1) {
        element.style.fill = this.makeRGBA(this.end);
        return;
      }

      element.style.fill = this.makeRGBA(this.calcRGBA(this.start, this.end, d));
    }
  }

}

const sceneFn: { height: Value } = {
  height: (w, h) => h,
};

const scene = new StickyPlatformScene(
  document.getElementById('scene')!,
  (w, h) => 4 * h,
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

const mountainGradient1 = new RefActor(document.getElementById('mountain-gradient-1')!);
mountainGradient1.addFrame(new TimeFrame(new SVGLinearGradientMotion({
  start: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 249,
        g: 208,
        b: 194,
        a: 1,
      },
    }, {
      lengthPercentage: 27,
      color: {
        r: 252,
        g: 230,
        b: 218,
        a: 1,
      }
    }, {
      lengthPercentage: 68,
      color: {
        r: 252,
        g: 230,
        b: 218,
        a: 1,
      }
    }]
  },
  end: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 244,
        g: 250,
        b: 253,
        a: 1,
      },
    }, {
      lengthPercentage: 27,
      color: {
        r: 195,
        g: 219,
        b: 255,
        a: 1,
      }
    }, {
      lengthPercentage: 68,
      color: {
        r: 195,
        g: 219,
        b: 255,
        a: 1,
      }
    }]
  },
}), () => 0, (w, h) => 2 * h));

const mountainGradient2 = new RefActor(document.getElementById('mountain-gradient-2')!);
mountainGradient2.addFrame(new TimeFrame(new SVGLinearGradientMotion({
  start: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 245,
        g: 181,
        b: 146,
        a: 1,
      },
    }, {
      lengthPercentage: 20,
      color: {
        r: 252,
        g: 223,
        b: 146,
        a: 1,
      }
    }, {
      lengthPercentage: 75,
      color: {
        r: 252,
        g: 223,
        b: 146,
        a: 1,
      }
    }]
  },
  end: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 205,
        g: 227,
        b: 255,
        a: 1,
      },
    }, {
      lengthPercentage: 20,
      color: {
        r: 196,
        g: 220,
        b: 254,
        a: 1,
      }
    }, {
      lengthPercentage: 75,
      color: {
        r: 196,
        g: 220,
        b: 254,
        a: 1,
      }
    }]
  },
}), () => 0, (w, h) => 2 * h));

const mountainGradient3 = new RefActor(document.getElementById('mountain-gradient-3')!);
mountainGradient3.addFrame(new TimeFrame(new SVGLinearGradientMotion({
  start: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 245,
        g: 181,
        b: 146,
        a: 1,
      },
    }, {
      lengthPercentage: 17,
      color: {
        r: 252,
        g: 223,
        b: 146,
        a: 1,
      }
    }, {
      lengthPercentage: 78,
      color: {
        r: 252,
        g: 223,
        b: 146,
        a: 1,
      }
    }]
  },
  end: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 218,
        g: 237,
        b: 253,
        a: 1,
      },
    }, {
      lengthPercentage: 17,
      color: {
        r: 192,
        g: 218,
        b: 254,
        a: 1,
      }
    }, {
      lengthPercentage: 78,
      color: {
        r: 192,
        g: 218,
        b: 254,
        a: 1,
      }
    }]
  },
}), () => 0, (w, h) => 2 * h));

const waterGradient1 = new RefActor(document.getElementById('water-gradient-1')!);
waterGradient1.addFrame(new TimeFrame(new SVGLinearGradientMotion({
  start: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 255,
        g: 219,
        b: 67,
        a: 1,
      },
    }, {
      lengthPercentage: 25,
      color: {
        r: 137,
        g: 190,
        b: 255,
        a: 1,
      }
    }, {
      lengthPercentage: 55,
      color: {
        r: 137,
        g: 190,
        b: 255,
        a: 1,
      }
    }, {
      lengthPercentage: 70,
      color: {
        r: 231,
        g: 195,
        b: 118,
        a: 1,
      }
    }]
  },
  end: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 205,
        g: 224,
        b: 254,
        a: 1,
      },
    }, {
      lengthPercentage: 25,
      color: {
        r: 217,
        g: 235,
        b: 255,
        a: 1,
      }
    }, {
      lengthPercentage: 55,
      color: {
        r: 243,
        g: 251,
        b: 254,
        a: 1,
      }
    }, {
      lengthPercentage: 70,
      color: {
        r: 129,
        g: 183,
        b: 250,
        a: 1,
      }
    }]
  },
}), () => 0, (w, h) => 2 * h));

const landGradient1 = new RefActor(document.getElementById('land-gradient-1')!);
landGradient1.addFrame(new TimeFrame(new SVGLinearGradientMotion({
  start: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 237,
        g: 85,
        b: 61,
        a: 1,
      },
    }, {
      lengthPercentage: 95,
      color: {
        r: 236,
        g: 86,
        b: 61,
        a: 1,
      }
    }]
  },
  end: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 100,
        g: 167,
        b: 248,
        a: 1,
      },
    }, {
      lengthPercentage: 95,
      color: {
        r: 100,
        g: 168,
        b: 249,
        a: 1,
      }
    }]
  },
}), () => 0, (w, h) => 2 * h));

const landGradient2 = new RefActor(document.getElementById('land-gradient-2')!);
landGradient2.addFrame(new TimeFrame(new SVGLinearGradientMotion({
  start: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 255,
        g: 127,
        b: 14,
        a: 1,
      },
    }, {
      lengthPercentage: 95,
      color: {
        r: 250,
        g: 129,
        b: 20,
        a: 1,
      }
    }]
  },
  end: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 183,
        g: 211,
        b: 254,
        a: 1,
      },
    }, {
      lengthPercentage: 95,
      color: {
        r: 184,
        g: 213,
        b: 255,
        a: 1,
      }
    }]
  },
}), () => 0, (w, h) => 2 * h));

const landGradient3 = new RefActor(document.getElementById('land-gradient-3')!);
landGradient3.addFrame(new TimeFrame(new SVGLinearGradientMotion({
  start: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 254,
        g: 189,
        b: 29,
        a: 1,
      },
    }, {
      lengthPercentage: 95,
      color: {
        r: 253,
        g: 189,
        b: 29,
        a: 1,
      }
    }]
  },
  end: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 184,
        g: 213,
        b: 255,
        a: 1,
      },
    }, {
      lengthPercentage: 95,
      color: {
        r: 184,
        g: 213,
        b: 255,
        a: 1,
      }
    }]
  },
}), () => 0, (w, h) => 2 * h));

const firGradient1 = new RefActor(document.getElementById('fir-gradient-1')!);
firGradient1.addFrame(new TimeFrame(new SVGLinearGradientMotion({
  start: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 27,
        g: 159,
        b: 108,
        a: 1,
      },
    }, {
      lengthPercentage: 95,
      color: {
        r: 27,
        g: 160,
        b: 110,
        a: 1,
      }
    }]
  },
  end: {
    angle: 90,
    stopList: [{
      lengthPercentage: 5,
      color: {
        r: 103,
        g: 166,
        b: 244,
        a: 1,
      },
    }, {
      lengthPercentage: 95,
      color: {
        r: 104,
        g: 167,
        b: 244,
        a: 1,
      }
    }]
  },
}), () => 0, (w, h) => 2 * h));

const tree1a = new RefActor(document.getElementById('path56742')!);
tree1a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 254,
    g: 189,
    b: 30,
    a: 1,
  },
  end: {
    r: 138,
    g: 183,
    b: 250,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree1b = new RefActor(document.getElementById('path61836')!);
tree1b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 253,
    g: 236,
    b: 156,
    a: 1,
  },
  end: {
    r: 243,
    g: 250,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree1c = new RefActor(document.getElementById('path33166')!);
tree1c.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 88,
    g: 105,
    b: 121,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree1d = new RefActor(document.getElementById('path33168')!);
tree1d.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 88,
    g: 105,
    b: 121,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree1e = new RefActor(document.getElementById('path33168')!);
tree1e.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 88,
    g: 105,
    b: 121,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree1f = new RefActor(document.getElementById('path33164')!);
tree1f.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 88,
    g: 105,
    b: 121,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree2a = new RefActor(document.getElementById('path79222')!);
tree2a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 253,
    g: 236,
    b: 156,
    a: 1,
  },
  end: {
    r: 246,
    g: 253,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree2b = new RefActor(document.getElementById('path72458')!);
tree2b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 254,
    g: 189,
    b: 30,
    a: 1,
  },
  end: {
    r: 104,
    g: 167,
    b: 244,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree2c = new RefActor(document.getElementById('path67208')!);
tree2c.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 76,
    g: 93,
    b: 110,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree2d = new RefActor(document.getElementById('path72454')!);
tree2d.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 76,
    g: 93,
    b: 110,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree2e = new RefActor(document.getElementById('path72456')!);
tree2e.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 76,
    g: 93,
    b: 110,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree3a = new RefActor(document.getElementById('path87309')!);
tree3a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 253,
    g: 236,
    b: 156,
    a: 1,
  },
  end: {
    r: 240,
    g: 249,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree3b = new RefActor(document.getElementById('path85306')!);
tree3b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 254,
    g: 189,
    b: 30,
    a: 1,
  },
  end: {
    r: 170,
    g: 208,
    b: 255,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree3c = new RefActor(document.getElementById('path80474')!);
tree3c.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 84,
    g: 101,
    b: 117,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree4a = new RefActor(document.getElementById('path98561')!);
tree4a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 253,
    g: 236,
    b: 156,
    a: 1,
  },
  end: {
    r: 243,
    g: 251,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree4b = new RefActor(document.getElementById('path94419')!);
tree4b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 254,
    g: 189,
    b: 30,
    a: 1,
  },
  end: {
    r: 169,
    g: 208,
    b: 255,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree4c = new RefActor(document.getElementById('path90135')!);
tree4c.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 85,
    g: 102,
    b: 119,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree4d = new RefActor(document.getElementById('path94415')!);
tree4d.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 85,
    g: 102,
    b: 119,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree4e = new RefActor(document.getElementById('path94417')!);
tree4e.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 207,
    g: 128,
    b: 116,
    a: 1,
  },
  end: {
    r: 85,
    g: 102,
    b: 119,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone1a = new RefActor(document.getElementById('path47318')!);
stone1a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 191,
    g: 123,
    b: 124,
    a: 1,
  },
  end: {
    r: 233,
    g: 246,
    b: 255,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone1b = new RefActor(document.getElementById('path15165')!);
stone1b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 203,
    g: 135,
    b: 139,
    a: 1,
  },
  end: {
    r: 242,
    g: 248,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone2a = new RefActor(document.getElementById('path54757')!);
stone2a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 156,
    g: 114,
    b: 124,
    a: 1,
  },
  end: {
    r: 221,
    g: 238,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone2b = new RefActor(document.getElementById('path15167')!);
stone2b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 203,
    g: 134,
    b: 139,
    a: 1,
  },
  end: {
    r: 233,
    g: 246,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone3a = new RefActor(document.getElementById('path57437')!);
stone3a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 137,
    g: 95,
    b: 107,
    a: 1,
  },
  end: {
    r: 233,
    g: 246,
    b: 255,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone3b = new RefActor(document.getElementById('path15169')!);
stone3b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 158,
    g: 115,
    b: 125,
    a: 1,
  },
  end: {
    r: 232,
    g: 245,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone4a = new RefActor(document.getElementById('path61150')!);
stone4a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 192,
    g: 124,
    b: 125,
    a: 1,
  },
  end: {
    r: 232,
    g: 245,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone4b = new RefActor(document.getElementById('path15171')!);
stone4b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 204,
    g: 135,
    b: 140,
    a: 1,
  },
  end: {
    r: 232,
    g: 245,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone5a = new RefActor(document.getElementById('path66588')!);
stone5a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 158,
    g: 115,
    b: 126,
    a: 1,
  },
  end: {
    r: 220,
    g: 238,
    b: 253,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone5b = new RefActor(document.getElementById('path15173')!);
stone5b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 204,
    g: 134,
    b: 138,
    a: 1,
  },
  end: {
    r: 232,
    g: 246,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone6a = new RefActor(document.getElementById('path69251')!);
stone6a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 192,
    g: 123,
    b: 125,
    a: 1,
  },
  end: {
    r: 221,
    g: 238,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone6b = new RefActor(document.getElementById('path15175')!);
stone6b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 226,
    g: 181,
    b: 167,
    a: 1,
  },
  end: {
    r: 231,
    g: 245,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone7a = new RefActor(document.getElementById('path73792')!);
stone7a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 190,
    g: 124,
    b: 125,
    a: 1,
  },
  end: {
    r: 220,
    g: 237,
    b: 253,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone7b = new RefActor(document.getElementById('path15177')!);
stone7b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 203,
    g: 134,
    b: 141,
    a: 1,
  },
  end: {
    r: 232,
    g: 245,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone8a = new RefActor(document.getElementById('path117232')!);
stone8a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 191,
    g: 124,
    b: 125,
    a: 1,
  },
  end: {
    r: 220,
    g: 237,
    b: 253,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone8b = new RefActor(document.getElementById('path76568')!);
stone8b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 226,
    g: 180,
    b: 171,
    a: 1,
  },
  end: {
    r: 233,
    g: 246,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone9a = new RefActor(document.getElementById('path114263')!);
stone9a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 192,
    g: 123,
    b: 125,
    a: 1,
  },
  end: {
    r: 221,
    g: 238,
    b: 253,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone9b = new RefActor(document.getElementById('path76512')!);
stone9b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 203,
    g: 134,
    b: 140,
    a: 1,
  },
  end: {
    r: 241,
    g: 250,
    b: 253,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone10a = new RefActor(document.getElementById('path112689')!);
stone10a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 157,
    g: 116,
    b: 126,
    a: 1,
  },
  end: {
    r: 220,
    g: 238,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone10b = new RefActor(document.getElementById('path76510')!);
stone10b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 227,
    g: 180,
    b: 167,
    a: 1,
  },
  end: {
    r: 233,
    g: 246,
    b: 255,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone11a = new RefActor(document.getElementById('path109513')!);
stone11a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 192,
    g: 124,
    b: 125,
    a: 1,
  },
  end: {
    r: 221,
    g: 238,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone11b = new RefActor(document.getElementById('path76508')!);
stone11b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 203,
    g: 134,
    b: 140,
    a: 1,
  },
  end: {
    r: 243,
    g: 250,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone12a = new RefActor(document.getElementById('path107111')!);
stone12a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 137,
    g: 95,
    b: 105,
    a: 1,
  },
  end: {
    r: 232,
    g: 245,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone12b = new RefActor(document.getElementById('path76452')!);
stone12b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 157,
    g: 115,
    b: 126,
    a: 1,
  },
  end: {
    r: 233,
    g: 245,
    b: 253,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone13a = new RefActor(document.getElementById('path97738')!);
stone13a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 158,
    g: 116,
    b: 125,
    a: 1,
  },
  end: {
    r: 221,
    g: 238,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone13b = new RefActor(document.getElementById('path76450')!);
stone13b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 204,
    g: 135,
    b: 140,
    a: 1,
  },
  end: {
    r: 233,
    g: 245,
    b: 255,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone14a = new RefActor(document.getElementById('path100293')!);
stone14a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 192,
    g: 123,
    b: 125,
    a: 1,
  },
  end: {
    r: 221,
    g: 238,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const stone14b = new RefActor(document.getElementById('path76393')!);
stone14b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 204,
    g: 135,
    b: 139,
    a: 1,
  },
  end: {
    r: 243,
    g: 251,
    b: 253,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const bush1a = new RefActor(document.getElementById('path202')!);
bush1a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 237,
    g: 87,
    b: 62,
    a: 1,
  },
  end: {
    r: 143,
    g: 201,
    b: 255,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const bush1b = new RefActor(document.getElementById('path1857')!);
bush1b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 254,
    g: 126,
    b: 113,
    a: 1,
  },
  end: {
    r: 172,
    g: 217,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const bush2a = new RefActor(document.getElementById('path6177')!);
bush2a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 237,
    g: 87,
    b: 62,
    a: 1,
  },
  end: {
    r: 143,
    g: 201,
    b: 255,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const bush2b = new RefActor(document.getElementById('path11132')!);
bush2b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 254,
    g: 126,
    b: 113,
    a: 1,
  },
  end: {
    r: 172,
    g: 217,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir1 = new RefActor(document.getElementById('path70779')!);
fir1.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 66,
    g: 52,
    b: 73,
    a: 1,
  },
  end: {
    r: 30,
    g: 63,
    b: 96,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir2 = new RefActor(document.getElementById('path79958-1')!);
fir2.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 21,
    g: 178,
    b: 113,
    a: 1,
  },
  end: {
    r: 77,
    g: 140,
    b: 234,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir3 = new RefActor(document.getElementById('path73149-6')!);
fir3.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 28,
    g: 160,
    b: 110,
    a: 1,
  },
  end: {
    r: 41,
    g: 121,
    b: 213,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir4 = new RefActor(document.getElementById('path79958')!);
fir4.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 21,
    g: 178,
    b: 113,
    a: 1,
  },
  end: {
    r: 78,
    g: 140,
    b: 234,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir5 = new RefActor(document.getElementById('path73149')!);
fir5.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 28,
    g: 160,
    b: 110,
    a: 1,
  },
  end: {
    r: 41,
    g: 119,
    b: 214,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir6 = new RefActor(document.getElementById('path79958-7')!);
fir6.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 21,
    g: 178,
    b: 113,
    a: 1,
  },
  end: {
    r: 78,
    g: 140,
    b: 234,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir7 = new RefActor(document.getElementById('path73149-67')!);
fir7.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 28,
    g: 160,
    b: 110,
    a: 1,
  },
  end: {
    r: 40,
    g: 120,
    b: 212,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir8 = new RefActor(document.getElementById('path79958-18')!);
fir8.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 21,
    g: 178,
    b: 113,
    a: 1,
  },
  end: {
    r: 78,
    g: 140,
    b: 234,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir9 = new RefActor(document.getElementById('path73149-67-8')!);
fir9.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 28,
    g: 160,
    b: 110,
    a: 1,
  },
  end: {
    r: 41,
    g: 121,
    b: 213,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir10 = new RefActor(document.getElementById('path79958-18-7')!);
fir10.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 21,
    g: 178,
    b: 113,
    a: 1,
  },
  end: {
    r: 78,
    g: 140,
    b: 234,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const fir11 = new RefActor(document.getElementById('path73149-67-8-4')!);
fir11.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 28,
    g: 160,
    b: 110,
    a: 1,
  },
  end: {
    r: 41,
    g: 121,
    b: 213,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree5a = new RefActor(document.getElementById('path38774')!);
tree5a.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 180,
    g: 100,
    b: 75,
    a: 1,
  },
  end: {
    r: 30,
    g: 63,
    b: 96,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree5b = new RefActor(document.getElementById('path38830')!);
tree5b.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 180,
    g: 100,
    b: 75,
    a: 1,
  },
  end: {
    r: 30,
    g: 63,
    b: 96,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree5c = new RefActor(document.getElementById('path38832')!);
tree5c.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 180,
    g: 100,
    b: 75,
    a: 1,
  },
  end: {
    r: 30,
    g: 63,
    b: 96,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree5d = new RefActor(document.getElementById('path38834')!);
tree5d.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 180,
    g: 100,
    b: 75,
    a: 1,
  },
  end: {
    r: 30,
    g: 63,
    b: 96,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree5e = new RefActor(document.getElementById('path63048')!);
tree5e.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 255,
    g: 130,
    b: 19,
    a: 1,
  },
  end: {
    r: 104,
    g: 167,
    b: 243,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

const tree5f = new RefActor(document.getElementById('path50404')!);
tree5f.addFrame(new TimeFrame(new FillMotion({
  start: {
    r: 254,
    g: 188,
    b: 29,
    a: 1,
  },
  end: {
    r: 241,
    g: 249,
    b: 254,
    a: 1,
  },
}), () => 0, (w, h) => 2 * h));

scene.add(picture);
scene.add(pictureBack);
scene.add(mountainGradient1);
scene.add(mountainGradient2);
scene.add(mountainGradient3);
scene.add(waterGradient1);
scene.add(landGradient1);
scene.add(landGradient2);
scene.add(landGradient3);
scene.add(firGradient1);
scene.add(tree1a);
scene.add(tree1b);
scene.add(tree1c);
scene.add(tree1d);
scene.add(tree1e);
scene.add(tree1f);
scene.add(tree2a);
scene.add(tree2b);
scene.add(tree2c);
scene.add(tree2d);
scene.add(tree2e);
scene.add(tree3a);
scene.add(tree3b);
scene.add(tree3c);
scene.add(tree4a);
scene.add(tree4b);
scene.add(tree4c);
scene.add(tree4d);
scene.add(tree4e);
scene.add(stone1a);
scene.add(stone1b);
scene.add(stone2a);
scene.add(stone2b);
scene.add(stone3a);
scene.add(stone3b);
scene.add(stone4a);
scene.add(stone4b);
scene.add(stone5a);
scene.add(stone5b);
scene.add(stone6a);
scene.add(stone6b);
scene.add(stone7a);
scene.add(stone7b);
scene.add(stone8a);
scene.add(stone8b);
scene.add(stone9a);
scene.add(stone9b);
scene.add(stone10a);
scene.add(stone10b);
scene.add(stone11a);
scene.add(stone11b);
scene.add(stone12a);
scene.add(stone12b);
scene.add(stone13a);
scene.add(stone13b);
scene.add(stone14a);
scene.add(stone14b);
scene.add(bush1a);
scene.add(bush1b);
scene.add(bush2a);
scene.add(bush2b);
scene.add(fir1);
scene.add(fir2);
scene.add(fir3);
scene.add(fir4);
scene.add(fir5);
scene.add(fir6);
scene.add(fir7);
scene.add(fir8);
scene.add(fir9);
scene.add(fir10);
scene.add(fir11);
scene.add(tree5a);
scene.add(tree5b);
scene.add(tree5c);
scene.add(tree5d);
scene.add(tree5e);
scene.add(tree5f);

const sr = new ScrollRise(scene);