const path = require("path");
const ArmyManager = require("./army/armyManager");
console.log("Iniciando mi app");

const mainArmy = async () => {
  try {
    const dbPath = path.join(`${__dirname}/db_army.json`);
    const armyInstance = new ArmyManager(dbPath);
    const listArmyBases = await armyInstance.getMilitaryBases(dbPath)
  } catch (error) {}
};
mainArmy();
