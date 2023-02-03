const Joi = require("joi");

const validateBase = async (armyBase) => {
  const armyBaseSchema = Joi.object({
    baseName: Joi.string().required(),
    soldiersAmount: Joi.number().required(),
    tanksAmount: Joi.number().required(),
    battleLevel: Joi.number().required(),
    address: Joi.string().required(),
    general: Joi.string().required(),
  });
  return await armyBaseSchema.validateAsync(armyBase);
};
module.exports = validateBase;
