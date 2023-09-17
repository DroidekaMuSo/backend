import orderModel from "../model/order.model.js";

export default class OrderServices {
  getOrders = async () => {
    try {
      const orders = await orderModel.find({}).lean();

      return orders;
    } catch (error) {
      console.log(
        "🚀 ~ file: order.service.js:8 ~ OrderServices ~ getOrders=async ~ error:",
        error
      );
      return null;
    }
  };

  getOrderById = async (orderId) => {
    try {
      const order = await orderModel.findById({ _id: orderId });

      return order;
    } catch (error) {
      console.log(
        "🚀 ~ file: order.service.js:22 ~ OrderServices ~ getOrderById= ~ error:",
        error
      );
      return null;
    }
  };

  createOrder = async (order) => {
    try {
      const creteOrder = await orderModel.create(order);

      return creteOrder;
    } catch (error) {
      console.log(
        "🚀 ~ file: order.service.js:36 ~ OrderServices ~ createOrder=async ~ error:",
        error
      );
      return null;
    }
  };

  updateOrderById = async (orderId, information) => {
    try {
      const updateOrder = await orderModel.updateOrderById(
        { _id: orderId },
        information
      );

      return updateOrder;
    } catch (error) {
      console.log(
        "🚀 ~ file: order.service.js:47 ~ OrderServices ~ updateOrderById=async ~ error:",
        error
      );
      return null;
    }
  };

  deleteOrderById = async (orderId) => {
    try {
      const deleteOrder = await orderModel.deleteOrderById({ _id: orderId });

      return deleteOrder;
    } catch (error) {
      console.log(
        "🚀 ~ file: order.service.js:67 ~ OrderServices ~ deleteOrder ~ error:",
        error
      );
      return null;
    }
  };
}
