const path = require("path");
const ArmyManager = require("./army/armyManager");
console.log("Iniciando mi app");

const mainArmy = async () => {
  try {
    const dbPath = path.join(`${__dirname}/db_army.json`);
    const armyInstance = new ArmyManager(dbPath);
    const ArmyBasesList = await armyInstance.getMilitaryBases(dbPath);
    console.log(ArmyBasesList.armyBases);

    const base1 = {
      // baseName: "Test base",
      // soldiersAmount: 32,
      // tanksAmount: 84,
      // battleLevel: 10,
      // address: "Mendoza, Argentinca",
      // general: "Rabin",
    };

    const newUser = await armyInstance.createMilitaryBase(base1);
  } catch (error) {
    console.log(error);
  }
};

mainArmy();
