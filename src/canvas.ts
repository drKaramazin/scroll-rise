import { Widget } from './models/widgets/widget.model';
import { Util } from './util';

export class SRCanvas {

  private _list: Widget[] = [];

  constructor(
    public el: HTMLElement,
    protected width: (deviceWidth: number, deviceHeight: number) => number,
    protected height: (deviceWidth: number, deviceHeight: number) => number,
  ) {
    console.log('Constructor');
    this.init();
  }

  init() {
    console.log('Here man');
    this.el.setAttribute('width', `${this.width(Util.displayWidth(), Util.displayHeight())}px`);
    this.el.setAttribute('height', `${this.height(Util.displayWidth(), Util.displayHeight())}px`);
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
