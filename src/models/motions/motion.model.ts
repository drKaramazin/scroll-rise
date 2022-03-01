import { Frame } from '../frame.model';

export abstract class Motion {

  abstract make(scrollPosForFrame: number, frame: Frame, element: HTMLElement): void;

}
