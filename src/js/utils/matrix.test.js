import Matrix from "./matrix";
// gets value from 0 to max including
const randomIntTo = (max) => Math.floor(Math.random() * (max + 1));

describe("Matrix", () => {
  test("Size constructor parameter can only be positive", () => {
    expect(() => new Matrix(10)).not.toThrow();
    expect(() => new Matrix(0)).toThrow(RangeError);
    expect(() => new Matrix(-2)).toThrow(RangeError);
  });

  test("getCell method gets correct value", () => {
    const mx = new Matrix(2);
    expect(mx.getCell(1, 1)).toBe(undefined);
    mx.setCell(1, 1, "value");
    expect(mx.getCell(1, 2)).toBe(undefined);
  });

  test("Can't set cell beyond the matrix", () => {
    const mx = new Matrix(10);
    expect(() => mx.setCell(0, 1, null)).toThrow(RangeError);
    expect(() => mx.setCell(1, 0, null)).toThrow(RangeError);
    expect(() => mx.setCell(0, 11, null)).toThrow(RangeError);
    expect(() => mx.setCell(11, 0, null)).toThrow(RangeError);
  });

  test("Can't get cell beyond the matrix", () => {
    const mx = new Matrix(10);
    expect(() => mx.getCell(0, 1)).toThrow(RangeError);
    expect(() => mx.getCell(1, 0)).toThrow(RangeError);
    expect(() => mx.getCell(0, 11)).toThrow(RangeError);
    expect(() => mx.getCell(11, 0)).toThrow(RangeError);
  });

  test("forEach method iterates correct number of times", () => {
    const mx = new Matrix(10);

    let count = 0;
    mx.forEach(() => count++);

    expect(count).toBe(100);
  });

  test("forEach method iterates through all the values", () => {
    const mx = new Matrix(2);
    mx.setCell(2, 1, 2);
    mx.setCell(1, 2, 3);
    mx.setCell(2, 2, 4);

    const values = [undefined, 2, 3, 4];

    let count = 0;
    mx.forEach((value) => {
      expect(value).toBe(values[count++]);
    });
  });

  test("forEach method passes correct x and y positions", () => {
    const mx = new Matrix(2);

    const values = [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2],
    ];

    let count = 0;
    mx.forEach((_, x, y) => {
      expect([x, y]).toEqual(values[count++]);
    });
  });

  test("initialValue value parameter fills whole matrix", () => {
    const mx = new Matrix(2, "hello");
    mx.forEach((value) => {
      expect(value).toBe("hello");
    });
  });
});
