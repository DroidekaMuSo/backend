const fs = require("fs/promises");
const bcrypt = require("bcryptjs");

class ArmyManager {
  constructor(path) {
    this.path = path;
  }

  async createMilitaryBase() {}

  async getMilitaryBases() {
    try {
      const armyBasesDb = await fs.readFile(this.path,'utf-8');
      return JSON.parse(armyBasesDb)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ArmyManager;
