import { Actor } from '../actors/actor';
import { Util } from '../util';
import { TimeFrame } from '../time-frame';
import { MeasuringGrid } from '../measuring-grid';
import { MeasuringGridModel } from '../models/measuring-grid.model';

export interface SceneOptions {
  offset?: (deviceWidth: number, deviceHeight: number, sceneHeight: number) => number;
  measuringGrid?: MeasuringGridModel;
}

export abstract class Scene<Options extends SceneOptions> {

  protected _actors: Actor[] = [];
  public abstract name: string;

  protected abstract init(): void;
  public abstract resizeHeight(): void;

  protected grid: MeasuringGrid;

  constructor(
    protected element: HTMLElement,
    protected height: (deviceWidth: number, deviceHeight: number) => number,
    protected options?: Options,
  ) {
    this.setDefaults();
    this.init();
    this.resizeHeight();
    this.initMeasuringGrid();
    this.redrawMeasuringGrid();
  }

  protected setDefaults(): void {
    this.options = {
      ...this.defaults(),
      ...this.options,
    } as Options;
  }

  defaults(): SceneOptions {
    return {
      offset: () => 0,
    };
  }

  offset(): number {
    return this.options!.offset!(
      Util.clientWidth(),
      Util.clientHeight(),
      this.elementHeight(),
    );
  }

  initMeasuringGrid(): void {
    if (this.options?.measuringGrid) {
      this.grid = new MeasuringGrid(this.element, this.options.measuringGrid);
    }
  }

  elementY(): number {
    return this.element.getBoundingClientRect().y;
  }

  elementHeight(): number {
    return this.height(Util.clientWidth(), Util.clientHeight());
  }

  add(actor: Actor): void {
    this._actors.push(actor);
  }

  get actors(): Actor[] {
    return this._actors;
  }

  public interceptY(scrollPos: number, frame: TimeFrame, startY: () => number, endY: () => number): number | undefined {
    return undefined;
  }

  public redrawMeasuringGrid(): void {
    if (this.grid) {
      this.grid.redrawMeasuringGrid();
    }
  }

  pos(scrollPos: number): number {
    return -(scrollPos + this.offset());
  }

  render(scrollPos: number): void {
    for (const actor of this.actors) {
      actor.render(this.pos(scrollPos), this);
    }
  }

}
