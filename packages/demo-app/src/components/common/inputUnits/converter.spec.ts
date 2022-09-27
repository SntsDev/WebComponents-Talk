import { UnitsEnum, unitsConverters } from "./converter";

describe("ceonverter should", () => {
  it("be exact in METERS", () => {
    expect(unitsConverters[UnitsEnum.METERS].fromDataToDisplay(1000)).toBe(1);
    expect(unitsConverters[UnitsEnum.METERS].fromDataToDisplay(11100)).toBe(11.1);
    expect(unitsConverters[UnitsEnum.METERS].fromDataToDisplay(210)).toBe(0.21);

    expect(unitsConverters[UnitsEnum.METERS].fromDisplayToData(1)).toBe(1000);
    expect(unitsConverters[UnitsEnum.METERS].fromDisplayToData(11.1)).toBe(11100);
    expect(unitsConverters[UnitsEnum.METERS].fromDisplayToData(0.21)).toBe(210);
  });

  it("be exact in FEET", () => {
    expect(unitsConverters[UnitsEnum.FEET].fromDataToDisplay(1000)).toBe(3.28084);
    expect(unitsConverters[UnitsEnum.FEET].fromDataToDisplay(11100)).toBe(36.41732);
    expect(unitsConverters[UnitsEnum.FEET].fromDataToDisplay(210)).toBe(0.68898);

    expect(unitsConverters[UnitsEnum.FEET].fromDisplayToData(3.28084)).toBe(1000);
    expect(unitsConverters[UnitsEnum.FEET].fromDisplayToData(36.417323)).toBe(11100);
    expect(unitsConverters[UnitsEnum.FEET].fromDisplayToData(0.688976)).toBe(210);
  });
});
