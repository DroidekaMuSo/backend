import bussinessModel from "../model/bussiness.model.js";

export default class BussinessServices {
  getBussiness = async () => {
    try {
      const bussiness = await bussinessModel.find({}).lean();

      return bussiness;
    } catch (error) {
      console.log(
        "🚀 ~ file: business.service.js:7 ~ BussinessServices ~ getBussiness=async ~ error:",
        error
      );
      return null;
    }
  };

  getBussinesById = async (bussinesId) => {
    try {
      const getBussines = await bussinessModel.findById({ _id: bussinesId });

      return getBussines;
    } catch (error) {
      console.log(
        "🚀 ~ file: business.service.js:22 ~ BussinessServices ~ getBussinesById=async ~ error:",
        error
      );
      return null;
    }
  };

  createBussines = async (bussinesData) => {
    try {
      const create = bussinessModel.create(bussinesData);

      return create;
    } catch (error) {
      console.log(
        "🚀 ~ file: business.service.js:36 ~ BussinessServices ~ createBussines=async ~ error:",
        error
      );
      return null;
    }
  };

  updateBussinesById = async (bussinessId, information) => {
    try {
      const updateBussiness = await bussinessModel.updateOne(
        { _id: bussinessId },
        information
      );

      return updateBussiness;
    } catch (error) {
      console.log(
        "🚀 ~ file: business.service.js:50 ~ BussinessServices ~ updateBussinesById=async ~ error:",
        error
      );
      return null;
    }
  };

  deleteBussinessById = async (bussinessId) => {
    try {
      const deleteBussiness = await bussinessModel.deleteOne({
        _id: bussinessId,
      });

      return deleteBussiness;
    } catch (error) {
      console.log(
        "🚀 ~ file: business.service.js:66 ~ BussinessServices ~ deleteBussinessById ~ error:",
        error
      );
      return null;
    }
  };
}
