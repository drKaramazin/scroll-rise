import { InitiableWidget } from './initiable-widget';

export class StaticWidget extends InitiableWidget {

  constructor(
    protected override element: HTMLElement | undefined,
    public override startStyle?: string,
  ) {
    super(startStyle);
  }

  override initStartPosition() {
    this.setStartCoord(this.calcStartPosition());
  }

  override bindElement(): HTMLElement | undefined {
    if (this.element) {
      this.element.style.display = 'fixed';
    }
    return this.element;
  }

}
