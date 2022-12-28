import { Color } from "./color.model";

export interface MeasuringGrid {
  width?: (deviceWidth: number, deviceHeight: number) => number;
  height?: (deviceWidth: number, deviceHeight: number, sceneHeight: number) => number;
  color: Color;
  subgrid?: {
    height: (gridHeight: number) => number;
    color: Color;
    borderStyle: string;
  },
  label?: {
    startWith?: number;
    top: number;
    left: number;
    fontSize: string;
  }
}

export type HorizontalMeasuringGrid = Required<Omit<MeasuringGrid, 'width'>>;
export type VerticalMeasuringGrid = Required<Omit<MeasuringGrid, 'height'>>;