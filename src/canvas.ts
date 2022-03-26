import { Widget } from './models/widgets/widget.model';
import { Util } from './util';
import defaults from 'defaults';

export interface CanvasOptions {
  offset?: (deviceWidth: number, deviceHeight: number, canvasHeight: number) => number;
  method?: 'fixed-actors' | 'sticky-platform';
  stickyPlatformHeight?: (deviceWidth: number, deviceHeight: number) => number;
}

export class SRCanvas {

  private _list: Widget[] = [];

  public platform: HTMLElement;

  constructor(
    protected el: HTMLElement,
    protected height: (deviceWidth: number, deviceHeight: number) => number,
    protected options?: CanvasOptions,
  ) {
    this.options = defaults(this.options, {
      offset: () => 0,
      method: 'sticky-platform',
      stickyPlatformHeight: (deviceWidth: number, deviceHeight: number) => deviceHeight,
    });

    this.init();
  }

  resizeHeight() {
    this.el.style.height = `${this.height(Util.displayWidth(), Util.displayHeight())}px`;
  }

  resizePlatform() {
    if (this.options.method === 'sticky-platform') {
      this.platform.style.height = `${this.options.stickyPlatformHeight(Util.displayWidth(), Util.displayHeight())}px`;
    }
  }

  init() {
    this.resizeHeight();
    this.el.style.position = 'relative';
    this.el.style.overflow = 'visible';

    this.platform = document.createElement('div');
    this.platform.style.position = 'sticky';
    this.platform.style.top = `0`;
    this.platform.style.left = '0';
    this.platform.style.width = `${Util.displayWidth()}px`;
    this.resizePlatform();
    this.scroll(this.elementY());

    this.el.appendChild(this.platform);
  }

  scroll(pos: number) {
    if (this.elementY() > 0) {
      this.platform.style.top = `${pos}px`;
    } else {
      this.platform.style.top = `0px`;
    }
  }

  elementY(): number {
    return this.el.getBoundingClientRect().y;
  }

  offset(): number {
    return this.options.offset(
      Util.displayWidth(),
      Util.displayHeight(),
      this.height(Util.displayWidth(), Util.displayHeight()),
    );
  }

  add(widget: Widget) {
    this._list.push(widget);
    if (this.el === widget.element.parentElement) {
      this.platform.appendChild(widget.element);
    }
    widget.initElement();
  }

  get list(): Widget[] {
    return this._list;
  }

}
