const fs = require("fs/promises");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

class ArmyManager {
  constructor(path) {
    this.path = path;
  }

  async generateIndex(armyBases) {
    try {
      if (armyBases.length === 0) return 1;
      return armyBases[armyBases.length - 1].id + 1;
    } catch (error) {
      console.log(error);
    }
  }

  async validateArmyBase(armyBase) {
    try {
      const armyBaseSchema = Joi.object({
        baseName: Joi.string().required(),
        soldiersAmount: Joi.number().required(),
        tanksAmount: Joi.number().required(),
        battleLevel: Joi.number().required(),
        address: Joi.string().required(),
        general: Joi.string().required(),
      });
      const { error, value } = await armyBaseSchema.validateAsync(armyBase);
      return value;
    } catch (error) {
      console.log(error.message);
    }
  } 

  async createMilitaryBase(base) {
    try {
      const validation = await this.validateArmyBase();

      const {
        baseName,
        soldiersAmount,
        tanksAmount,
        battleLevel,
        address,
        general,
      } = base;

      const dbArmy = await this.getMilitaryBases();
      const { armyBases } = dbArmy;

      const newId = await this.generateIndex(armyBases);
      const salt = await bcrypt.genSalt();
      const addressEncrypted = await bcrypt.hashSync(address, salt);
      console.log(addressEncrypted);

      const newArmyBase = {
        id: newId,
        baseName,
        soldiersAmount,
        tanksAmount,
        battleLevel,
        address: addressEncrypted,
        general,
      };

      dbArmy.armyBases.push(newArmyBase);
      await fs.writeFile(this.path, JSON.stringify(dbArmy));
      return newArmyBase;
    } catch (error) {
      console.log(error);
    }
  }

  async getMilitaryBases() {
    try {
      const armyBasesDb = await fs.readFile(this.path, "utf-8");
      return JSON.parse(armyBasesDb);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ArmyManager;
