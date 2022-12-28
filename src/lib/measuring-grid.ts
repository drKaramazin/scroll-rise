import { Color } from "./models/color.model";
import { HorizontalMeasuringGrid, MeasuringGridModel, VerticalMeasuringGrid } from "./models/measuring-grid.model";
import { Util } from "./util";

export class MeasuringGrid {

  private elements: HTMLElement[] = [];

  constructor(
    protected element: HTMLElement,
    protected grid: MeasuringGridModel,
  ) {}

  protected createLabel(measure: number, top: number, color: Color): HTMLElement | undefined {
    if (this.grid.label) {
      const measuring = document.createElement('span');
      measuring.style.position = 'absolute';
      measuring.style.top = `${top + this.grid.label.top}px`;
      measuring.style.left = `${this.grid.label.left}px`;
      measuring.style.color = color;
      measuring.style.fontSize = this.grid.label.fontSize;
      measuring.innerText = measure.toString();

      return measuring;
    }
  }

  protected appendToMeasuringGrid(element: HTMLElement) {
    this.elements.push(element);
    this.element.append(element);
  }

  protected createHorizontalLine(top: number, borderStyle: string, color: Color): HTMLElement {
    const line = document.createElement('hr');

    line.style.position = 'absolute';
    line.style.width = '100%';
    line.style.top = `${top}px`;
    line.style.margin = '0';
    line.style.border = 'none';
    line.style.borderBottom = `1px ${borderStyle} ${color}`;

    return line;
  }

  protected appendHorizontalGridLines(measuringGrid: HorizontalMeasuringGrid) {
    const gridHeight = measuringGrid.height(Util.clientWidth(), Util.clientHeight(), this.element.getBoundingClientRect().height);
    const gridCount = this.element.getBoundingClientRect().height / gridHeight;

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

  protected appendVerticalGridLines(measuringGrid: VerticalMeasuringGrid) {
    const width = measuringGrid.width(Util.clientWidth(), Util.clientHeight());

    let left = width;
    while (left < this.element.getBoundingClientRect().width) {
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

  protected clearMeasuringGrid() {
    this.elements.forEach(element => element.remove());
    this.elements = [];
  }

  public redrawMeasuringGrid() {
    this.clearMeasuringGrid();

    if (this.grid.height) {
      this.appendHorizontalGridLines(this.grid as HorizontalMeasuringGrid);
    }
    if (this.grid.width) {
      this.appendVerticalGridLines(this.grid as VerticalMeasuringGrid);
    }
  }

}
