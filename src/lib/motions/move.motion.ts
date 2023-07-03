import { Value } from '../models/value.model';
import { Motion } from './motion';
import { Util } from '../util';
import { MotionParams } from '../models/motion-params.model';

export interface IMoveMotion {
  startX: Value;
  endX: Value;
  startY: Value;
  endY: Value;
}

export class MoveMotion extends Motion {

  override name = 'MoveMotion';

  startX: Value;
  endX: Value;
  startY: Value;
  endY: Value;

  constructor(data: IMoveMotion) {
    super();

    this.startX = data.startX;
    this.endX = data.endX;
    this.startY = data.startY;
    this.endY = data.endY;
  }

  protected setLeft(element: HTMLElement, left: number): void {
    element.style.left = `${left}px`;
  }

  protected setTop(params: MotionParams, top: number): void {
    const startY = (): number => this.startY(Util.clientWidth(), Util.clientHeight());
    const endY = (): number => this.endY(Util.clientWidth(), Util.clientHeight());

    const sceneInterceptor = params.scene.interceptY(params, top, startY, endY);
    if (sceneInterceptor !== undefined) {
      top = sceneInterceptor;
    }

    params.element.style.top = `${top}px`;
  }

  protected makeStartStep(params: MotionParams): void {
    const x = this.startX(Util.clientWidth(), Util.clientHeight());
    this.setLeft(params.element, x);

    const y = this.startY(Util.clientWidth(), Util.clientHeight());
    this.setTop(params, y);
  }

  protected makeEndStep(params: MotionParams): void {
    const x = this.endX(Util.clientWidth(), Util.clientHeight());
    this.setLeft(params.element, x);

    const y = this.endY(Util.clientWidth(), Util.clientHeight());
    this.setTop(params, y);
  }

  protected makeUsualStep(params: MotionParams): void {
    const xLength = this.endX(Util.clientWidth(), Util.clientHeight()) - this.startX(Util.clientWidth(), Util.clientHeight());

    const x = Util.castToInt(this.startX(Util.clientWidth(), Util.clientHeight()) + xLength * params.delta);
    this.setLeft(params.element, x);

    const yLength = this.endY(Util.clientWidth(), Util.clientHeight()) - this.startY(Util.clientWidth(), Util.clientHeight());
    const y = Util.castToInt(this.startY(Util.clientWidth(), Util.clientHeight()) + yLength * params.delta);
    this.setTop(params, y);
  }

  make(params: MotionParams): void {
    if (params.element) {
      if (params.delta < 0) {
        this.makeStartStep(params);
        return;
      }
      if (params.delta > 1) {
        this.makeEndStep(params);
        return;
      }

      this.makeUsualStep(params);
    } else {
      throw new Error('There is no an element');
    }
  }

}
