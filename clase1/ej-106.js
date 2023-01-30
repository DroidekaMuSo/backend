//clases using static methods and attribute with extend examples
//Father Class
class Figure {
  static customName = "Figure";
  static description = `I'm a geometric figure`;
  area;

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

//Child class
class Square extends Figure {
  static type = "square";
  static description = `I'm a square and a figure`;

  constructor() {
    super();
    this.sides = 4;
  }

  static calculate(n) {
    return super.calculate(n) * super.calculate(n);
  }

  getSides() {
    return this.sides;
  }
}
//Checking class behavior
console.log(
  `${Figure.description}, ${Figure.calculate()}, ${Figure.calculate(6)}`
);

//Setting and Getting perimeter
const pentagonPerimeter = (n) => n + n + n + n + n;
const fig = new Figure(5, pentagonPerimeter(2));
console.log(fig.getPerimeter());

console.log(`I have ${fig.sides} sides`);
console.log(`I have ${fig.getSides()} sides`);

//
console.log(
  Square.calculate(3),
  Square.description,
  Square.type,
  Square.customName
);

//First intance
const sq = new Square();
console.log(`I have ${sq.sides} sides`);
console.log(
  `Calling method calculate calculate from Square ${Square.calculate()}`
);
console.log(`I have ${sq.getSides()} sides`);
console.log(`I have ${fig.getSides()} sides`);
