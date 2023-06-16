import { Motion, Scene, TimeFrame } from '../../lib';

export class DummyMotion extends Motion {

  override name = 'DummyMotion';

  constructor(public id: string) {
    super();
  }

  override make(scrollPosForFrame: number, frame: TimeFrame, element: HTMLElement, scene: Scene<any>): void {}

}
