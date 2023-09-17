import BussinessServices from "../services/business.service.js";

const bussinessServices = new BussinessServices();

export const getBussines = async (req, res) => {
  try {
    const bussiness = await bussinessServices.getBussiness();

    return res
      .status(200)
      .json({ message: "All bussiness", bussiness: bussiness });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error", error: error.message });
  }
};

export const getBussinessById = async (req, res) => {
  try {
    const { bussinessId } = req.params;

    const bussiness = await bussinessServices.getBussinesById(bussinessId);

    if (!bussiness) {
      return res
        .status(500)
        .json({ message: "Id not found", bussinessId: bussinessId });
    }

    return res.status(500).json({
      message: "Bussiness found",
      bussiness: bussiness,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error", error: error.message });
  }
};

export const createBussiness = async (req, res) => {
  try {
    const bussiness = req.body;

    const createIt = await bussinessServices.createBussines(bussiness);

    if (!createIt) {
      return res.status(500).json({
        message: "Bussiness not created",
      });
    }

    return res.status(200).json({
      message: "Bussiness created",
      bussiness: createIt,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error", error: error.message });
  }
};

export const updateBussinesById = async (req, res) => {
  try {
    const { bussinessId } = req.params;
    const information = req.body;

    const updateBussiness = await bussinessServices.updateBussinesById(
      bussinessId,
      information
    );

    if (!updateBussinesById) {
      return res
        .status(500)
        .json({ message: "Something goes wrong in services" });
    }

    return res
      .status(500)
      .json({ message: "Bussiness updated", bussiness: updateBussiness });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error", error: error.message });
  }
};

export const deleteBussinessById = async (req, res) => {
  try {
    const { bussinessId } = req.params;

    const deleteBussiness = await bussinessServices.deleteBussinessById(
      bussinessId
    );

    if (!deleteBussiness) {
      return res
        .status(500)
        .json({ message: "Something goes wrong with services" });
    }

    return res
      .status(200)
      .json({ message: "Bussiness deleted", bussiness: deleteBussiness });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error", error: error.message });
  }
};
