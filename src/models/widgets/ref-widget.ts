import { InitiableWidget } from './initiable-widget';

export class RefWidget extends InitiableWidget {

  constructor(
    protected override element: HTMLElement | undefined,
    public override startStyle?: string,
  ) {
    super(startStyle);
  }

  override bindElement(): HTMLElement | undefined {
    return this.element;
  }

}
