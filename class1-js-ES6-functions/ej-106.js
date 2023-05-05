class Figure {
  static customName = "Figure";
  static description = `I'm a geometric figure`;

  constructor(sides, area) {
    this.sides = sides;
    this.area = area;
  }

  static calculate(n = 1) {
    return n * 3;
  }

  getPerimeter() {
    return this.area;
  }

  getSides() {
    return this.sides;
  }
}

class Square extends Figure {
  static type = "Square";
  static description = "I'm a square and a figure";

  constructor() {
    super(); //Brings class father's functions
    this.sides = 4;
  }

  static calculate(n) {
    return super.calculate(n) * super.calculate(n);
  }

  getSides() {
    return this.sides;
  }
}

console.log(
  "🚀 ~ file: ej-106.js:5 ~ Figure ~ description:",
  Figure.description
);
console.log(Figure.calculate()); // 3
console.log(Figure.calculate(6)); // 18

const pentagonPerimeter = (n) => n + n + n + n + n;
const fig1 = new Figure(5, pentagonPerimeter(2));
console.log("🚀 ~ file: ej-106.js:50 ~ fig1:", fig1);
console.log(fig1.getPerimeter());

console.log(`I have ${fig1.sides} sides`);
console.log(`I have ${fig1.getSides()} sides using a method`);

console.log(Square.calculate(3));
console.log(Square.description);
console.log(Square.type);
console.log(Square.customName);

const sq = new Square();
console.log(`I have ${sq.sides} sides`);

console.log(`Calling method calculate from Square`, Square.calculate());
console.log(`I have ${sq.getSides()} sides`);
console.log(`I have ${fig1.getSides()} sides`);
