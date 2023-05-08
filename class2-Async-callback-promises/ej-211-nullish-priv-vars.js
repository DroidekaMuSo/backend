let user1;
console.log(user1 ?? "Anonymous");

let user2 = "John";
console.log(
  "🚀 ~ file: ej-211-nullish-priv-vars.js:5 ~ user2:",
  user2 ?? "Anonymous"
);

let testPort = 0;
let PORT = testPort || 5000;
console.log("🚀 ~ file: ej-211-nullish-priv-vars.js:13 ~ PORT:", PORT);

testPort = 2000;
PORT = testPort || 5000;
console.log("🚀 ~ file: ej-211-nullish-priv-vars.js:19 ~ PORT:", PORT);

class Sport {
  #name;

  constructor(name, players, type) {
    this.players = players;
    this.type = type;
    this.#name = name;
    this.#DisplaySport();
  }

  getSportName = () => {
    return this.#name;
  };

  #DisplaySport = () => {
    console.log(`Sport created was ${this.type}`);
  };
}

const king = new Sport("futball", "11", "Physic and contact");
const name = king.getSportName();
console.log("🚀 ~ file: ej-211-nullish-priv-vars.js:40 ~ name:", name);


const metPrivate = king.DisplaySport();
console.log("🚀 ~ file: ej-211-nullish-priv-vars.js:43 ~ metPrivate:", metPrivate)
