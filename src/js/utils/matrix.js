export default class Matrix {
  #innerArray;
  #size;
  constructor(size, initialValue) {
    if (size < 1) {
      throw new RangeError("Size must be a positive value");
    }
    this.#size = size;
    this.#innerArray = new Array(size * size).fill(initialValue);
  }

  #isWithinBounds(x, y) {
    return [x, y].every((coord) => coord > 0 && coord <= this.#size);
  }

  #checkBounds(x, y) {
    if (!this.#isWithinBounds(x, y)) {
      throw new RangeError("Trying to access cell beyond bounds");
    }
  }

  getCell(x, y) {
    this.#checkBounds(x, y);
    return this.#innerArray[x - 1 + (y - 1) * this.#size];
  }

  setCell(x, y, value) {
    this.#checkBounds(x, y);
    return (this.#innerArray[x - 1 + (y - 1) * this.#size] = value);
  }

  forEach(callback) {
    this.#innerArray.forEach((element, index) => {
      const x = (index % this.#size) + 1;
      const y = Math.floor(index / this.#size) + 1;
      callback(element, x, y);
    });
  }
}
