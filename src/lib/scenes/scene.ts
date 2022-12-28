import { Actor } from '../actors/actor.model';
import { Util } from '../util';
import { TimeFrame } from '../time-frame';
import { Color } from "../models/color.model";
import { HorizontalMeasuringGrid, MeasuringGrid, VerticalMeasuringGrid } from "../models/measuring-grid.model";

export interface SceneOptions {
  offset?: (deviceWidth: number, deviceHeight: number, sceneHeight: number) => number;
  measuringGrid?: MeasuringGrid,
}

export abstract class Scene<Options extends SceneOptions> {

  protected _actors: Actor[] = [];
  public abstract name: string;

  protected abstract init(): void;
  public abstract resizeHeight(): void;

  measuringGrid: HTMLElement[] = [];

  constructor(
    protected el: HTMLElement,
    protected height: (deviceWidth: number, deviceHeight: number) => number,
    protected options?: Options,
  ) {
    this.setDefaults();
    this.init();
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

  elementY(): number {
    return this.el.getBoundingClientRect().y;
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

  private createLabel(measure: number, top: number, color: Color): HTMLElement | undefined {
    if (this.options?.measuringGrid?.label) {
      const measuring = document.createElement('span');
      measuring.style.position = 'absolute';
      measuring.style.top = `${top + this.options.measuringGrid.label.top}px`;
      measuring.style.left = `${this.options.measuringGrid.label.left}px`;
      measuring.style.color = color;
      measuring.style.fontSize = this.options.measuringGrid.label.fontSize;
      measuring.innerText = measure.toString();

      return measuring;
    }
  }

  private appendToMeasuringGrid(element: HTMLElement) {
    this.measuringGrid.push(element);
    this.el.append(element);
  }

  createHorizontalLine(top: number, borderStyle: string, color: Color): HTMLElement {
    const line = document.createElement('hr');

    line.style.position = 'absolute';
    line.style.width = '100%';
    line.style.top = `${top}px`;
    line.style.margin = '0';
    line.style.border = 'none';
    line.style.borderBottom = `1px ${borderStyle} ${color}`;

    return line;
  }

  private appendHorizontalGridLines(measuringGrid: HorizontalMeasuringGrid) {
    const gridHeight = measuringGrid.height(Util.clientWidth(), Util.clientHeight(), this.elementHeight());
    const gridCount = this.elementHeight() / gridHeight;

    let m = measuringGrid.label?.startWith || 0;
    for (let i = 0; i <= gridCount; i++) {
      const top = i * gridHeight;

      this.appendToMeasuringGrid(this.createHorizontalLine(top, 'solid', measuringGrid.color));

      if (measuringGrid.label) {
        const label = this.createLabel(m, top, measuringGrid.color);

        if (label) {
          this.appendToMeasuringGrid(label);
          m += 1;
        }
      }

      if (measuringGrid.subgrid && i + 1 <= gridCount) {
        const subgridHeight = measuringGrid.subgrid.height(gridHeight);
        let subgridTop = top + subgridHeight;

        while (subgridTop < top + gridHeight) {
          this.appendToMeasuringGrid(this.createHorizontalLine(subgridTop, measuringGrid.subgrid.borderStyle, measuringGrid.subgrid.color));

          if (measuringGrid.label) {
            const label = this.createLabel(m, subgridTop, measuringGrid.color);

            if (label) {
              this.appendToMeasuringGrid(label);
              m += 1;
            }
          }

          subgridTop += subgridHeight;
        }
      }
    }
  }

  private appendVerticalGridLines(measuringGrid: VerticalMeasuringGrid) {
    const width = measuringGrid.width(Util.clientWidth(), Util.clientHeight());

    let left = width;
    while (left < this.el.getBoundingClientRect().width) {
      const line = document.createElement('div');

      line.style.position = 'absolute';
      line.style.left = `${left}px`;
      line.style.width = '0px';
      line.style.height = '100%';
      line.style.borderLeft = `1px solid ${measuringGrid.color}`;

      this.appendToMeasuringGrid(line);

      left += left;
    }
  }

  private clearMeasuringGrid() {
    this.measuringGrid.forEach(element => element.remove());
    this.measuringGrid = [];
  }

  public redrawMeasuringGrid() {
    if (this.options?.measuringGrid) {
      this.clearMeasuringGrid();

      if (this.options?.measuringGrid.height) {
        this.appendHorizontalGridLines(this.options.measuringGrid as HorizontalMeasuringGrid);
      }
      if (this.options?.measuringGrid.width) {
        this.appendVerticalGridLines(this.options.measuringGrid as VerticalMeasuringGrid);
      }
    }
  }

}
