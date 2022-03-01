import { Widget } from './models/widgets/widget.model';
import { Util } from './util';

export class SRCanvas {

  private _list: Widget[] = [];

  constructor(
    protected el: HTMLElement,
    protected height: (deviceWidth: number, deviceHeight: number) => number,
  ) {
    this.init();
  }

  init() {
    this.el.style.height = `${this.height(Util.displayWidth(), Util.displayHeight())}px`;
  }

  elementY(): number {
    return this.el.getBoundingClientRect().y;
  }

  add(widget: Widget) {
    this._list.push(widget);
    widget.initElement();
  }

  get list(): Widget[] {
    return this._list;
  }

}
