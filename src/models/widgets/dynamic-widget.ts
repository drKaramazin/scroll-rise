import { InitiableWidget } from './initiable-widget';

export abstract class DynamicWidget extends InitiableWidget {

  abstract createElement(): HTMLElement;

  override initStartPosition() {
    this.setStartCoord(this.calcStartPosition());
  }

  override bindElement(): HTMLElement {
    return document.body.appendChild(this.createElement())
  }

}
