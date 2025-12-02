export default class Ship {
  hits = 0;
  length;

  constructor(length) {
    if (length === undefined) {
      throw "Length must be specified";
    }
    this.length = length;
  }

  hit() {
    if (this.hits === this.length) {
      return;
    }
    this.hits++;
  }

  isSunk() {
    return this.hits === this.length;
  }
}