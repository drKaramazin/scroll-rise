import { Motion, Scene, TimeFrame } from '../lib';
// import { v4 as uuidv4 } from 'uuid';

export class DummyMotion extends Motion {

  override name = 'DummyMotion';
  // private uuid = uuidv4();
  private i = 0;

  override make(scrollPosForFrame: number, frame: TimeFrame, element: HTMLElement, scene: Scene<any>): void {
    console.log('make', this.i);
    this.i++;
  }

}
