import BussinessServices from "../services/business.service.js";
import OrderServices from "../services/order.service.js";
import UserServices from "../services/user.service.js";

const orderServices = new OrderServices();
const userServices = new UserServices();
const bussinessServices = new BussinessServices();

export const getOrders = async (req, res) => {
  try {
    const orders = await orderServices.getOrders();

    return res.status(200).json({ message: "Orders", orders: orders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await getOrderById(orderId);

    return res.status(200).json({ message: "Order found", order: order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error", error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, bussinessId, products } = req.body;

    const userData = await userServices.getUserById(userId);
    const bussinessData = await bussinessServices.getBussinesById(bussinessId);

    const currentOrders = bussinessData.products.filter((product) => {
      return products.includes(product.id);
    });

    const sum = currentOrders.reduce((acc, prev) => {
      acc += prev.price;

      return acc;
    }, 0);

    const orderNumber = Date.now() + Math.floor(Math.random() * 10_000 + 1);
    let order = {
      number: orderNumber,
      bussinessId,
      userId,
      status: "pending",
      products: currentOrders.map((product) => product.id),
      totalPrice: sum,
    };

    const newOrder = await orderServices.createOrder(order);

    userData.orders.push(newOrder._id);
    await userServices.updateUserById(userId, userData);

    return req.status(200).json({
      message: "Order created",
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};

export const updateOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { resolve } = req.query;

    const updateOrder = await orderServices.getOrderById(orderId);
    updateOrder.status = resolve;

    const update = await orderServices.updateOrderById(orderId, updateOrder);

    return res.status(500).json({
      message: "Order updated",
      order: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error",
      error: error.message,
    });
  }
};

export const deleteOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deleteOrder = await orderServices.deleteOrderById(orderId);

    return res
      .status(200)
      .json({ message: "Order deleted", order: deleteOrder });
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};
