const ONE_MILLIMETER_IN_FEET = 0.003280839895;

/** Assume data is in millimeters */

export enum UnitsEnum {
  METERS = 1,
  FEET = 2,
}

const roundTo5digits = (n: number) => Math.round(n * 100000) / 100000;

export const unitsConverters: IMetersAndFeetConverter = {
  [UnitsEnum.METERS]: {
    fromDataToDisplay: (n) => n / 1000,
    fromDisplayToData: (n) => Math.round(n * 1000),
  },
  [UnitsEnum.FEET]: {
    fromDataToDisplay: (n) => roundTo5digits(n * ONE_MILLIMETER_IN_FEET),
    fromDisplayToData: (n) => Math.round(n / ONE_MILLIMETER_IN_FEET),
  },
};

export interface IConverter {
  fromDataToDisplay: (n: number) => number;
  fromDisplayToData: (n: number) => number;
}

type IMetersAndFeetConverter = Record<UnitsEnum, IConverter>;
