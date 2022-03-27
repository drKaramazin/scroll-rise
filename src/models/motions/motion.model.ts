import { TimeFrame } from '../time-frame.model';
import { SceneModel } from '../scenes/scene.model';

export abstract class Motion {

  abstract name: string;

  abstract make(
      scrollPosForFrame: number,
      frame: TimeFrame,
      element: HTMLElement,
      scene: SceneModel<any>,
  ): void;

}
