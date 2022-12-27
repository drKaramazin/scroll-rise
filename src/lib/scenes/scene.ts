import { Actor } from '../actors/actor.model';
import { Util } from '../util';
import { TimeFrame } from '../time-frame';
import { Color } from "../models/color.model";

export interface SceneOptions {
  offset?: (deviceWidth: number, deviceHeight: number, sceneHeight: number) => number;
  measuringGrid?: {
    height: (deviceWidth: number, deviceHeight: number, sceneHeight: number) => number;
    color: Color;
    subgrid?: {
      height: (gridHeight: number) => number;
      color: Color;
      borderStyle: string;
    },
    measuring?: {
      startWith?: number;
      top: number;
      left: number;
      fontSize: string;
    }
  },
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

  private addMeasuring(measure: number, top: number, color: Color): HTMLElement | undefined {
    if (this.options?.measuringGrid?.measuring) {
      const measuring = document.createElement('span');
      measuring.style.position = 'absolute';
      measuring.style.top = `${top + this.options.measuringGrid.measuring.top}px`;
      measuring.style.left = `${this.options.measuringGrid.measuring.left}px`;
      measuring.style.color = color;
      measuring.style.fontSize = this.options.measuringGrid.measuring.fontSize;
      measuring.innerText = measure.toString();

      return measuring;
    }
  }

  public redrawMeasuringGrid() {
    if (this.options?.measuringGrid) {
      this.measuringGrid.forEach(element => element.remove());
      this.measuringGrid = [];

      const gridHeight = this.options.measuringGrid.height(Util.clientWidth(), Util.clientHeight(), this.elementHeight());
      const gridCount = this.elementHeight() / gridHeight;

      let m = this.options.measuringGrid.measuring?.startWith || 0;
      for (let i = 0; i <= gridCount; i++) {
        const gridElement = document.createElement('hr');
        const top = i * gridHeight;

        gridElement.style.position = 'absolute';
        gridElement.style.width = '100%';
        gridElement.style.top = `${top}px`;
        gridElement.style.margin = '0';
        gridElement.style.border = 'none';
        gridElement.style.borderBottom = `1px solid ${this.options.measuringGrid.color}`;

        this.measuringGrid.push(gridElement);
        this.el.append(gridElement);

        if (this.options.measuringGrid.measuring) {
          const measuring = this.addMeasuring(m, top, this.options.measuringGrid.color);

          if (measuring) {
            this.measuringGrid.push(measuring);
            this.el.append(measuring);
            m += 1;
          }
        }

        if (this.options.measuringGrid.subgrid && i + 1 <= gridCount) {
          const subgridHeight = this.options.measuringGrid.subgrid.height(gridHeight);

          let subgridTop = top + subgridHeight;
          while (subgridTop < top + gridHeight) {
            const subgridElement = document.createElement('hr');

            subgridElement.style.position = 'absolute';
            subgridElement.style.width = '100%';
            subgridElement.style.top = `${subgridTop}px`;
            subgridElement.style.margin = '0';
            subgridElement.style.border = 'none';
            subgridElement.style.borderBottom = `1px ${this.options.measuringGrid.subgrid.borderStyle} ${this.options.measuringGrid.subgrid.color}`;

            this.measuringGrid.push(subgridElement);
            this.el.append(subgridElement);

            if (this.options.measuringGrid.measuring) {
              const measuring = this.addMeasuring(m, subgridTop, this.options.measuringGrid.color);

              if (measuring) {
                this.measuringGrid.push(measuring);
                this.el.append(measuring);
                m += 1;
              }
            }

            subgridTop += subgridHeight;
          }
        }
      }
    }
  }

}
