import { InitiableWidget } from './initiable-widget';

export class RefWidget extends InitiableWidget {

  constructor(
    public override element: HTMLElement | undefined,
  ) {
    super();
  }

  override bindElement(): HTMLElement | undefined {
    return this.element;
  }

}
