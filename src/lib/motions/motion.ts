import { TimeFrame } from '../time-frame';
import { Scene } from '../scenes/scene';

export abstract class Motion {

  protected abstract readonly name: string;

  motionName(): string {
    return this.name;
  }

  abstract make(
    scrollPosForFrame: number,
    frame: TimeFrame,
    element: HTMLElement,
    scene: Scene<any>,
  ): void;

}
