import { Widget } from './models/widgets/widget.model';
import { Util } from './util';
import defaults from 'defaults';

export interface CanvasOptions {
  offset?: (deviceWidth: number, deviceHeight: number, canvasHeight: number) => number,
}

export class SRCanvas {

  private _list: Widget[] = [];

  constructor(
    protected el: HTMLElement,
    protected height: (deviceWidth: number, deviceHeight: number) => number,
    protected options?: CanvasOptions,
  ) {
    this.options = defaults(this.options, {
      offset: undefined,
    });

    this.init();
  }

  init() {
    this.el.style.height = `${this.height(Util.displayWidth(), Util.displayHeight())}px`;
    this.el.style.position = 'relative';
  }

  elementY(): number {
    return this.el.getBoundingClientRect().y;
  }

  offset(): number | undefined {
    return this.options.offset ? (
      this.options.offset(
        Util.displayWidth(),
        Util.displayHeight(),
        this.height(Util.displayWidth(), Util.displayHeight()),
      )
    ) : undefined;
  }

  add(widget: Widget) {
    this._list.push(widget);
    widget.initElement();
  }

  get list(): Widget[] {
    return this._list;
  }

}
