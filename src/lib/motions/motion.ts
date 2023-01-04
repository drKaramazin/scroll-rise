import { TimeFrame } from '../time-frame';
import { Scene } from '../scenes/scene';

export abstract class Motion {

  abstract name: string;

  abstract make(
    scrollPosForFrame: number,
    frame: TimeFrame,
    element: HTMLElement,
    scene: Scene<any>,
  ): void;

}
