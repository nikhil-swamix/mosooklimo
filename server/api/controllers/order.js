import asyncHandler from "express-async-handler";
import Order from "../models/order.js";
import Chauffeur from "../models/chauffeur.js";
import publishSMS from "./api-sms.js";
import publishEmailCustomer from "./api-email-customer.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const order = new Order(req.body);
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getOrderByPhone = asyncHandler(async (req, res) => {
  const orders = await Order.find({ phone: req.params.phone })
    .sort({ _id: -1 })
    .limit(3);
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  // console.log(order);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToCash = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paymentMethod = "cash";

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});


const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { status } = req.body;
  if (order) {
    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});


// ROUTE: PUT /assign/:id
const updateOrderAssign = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { driverId } = req.body;
  const driver = await Chauffeur.findById(driverId);
  // console.log(driver)
  if (order) {
    order.assignTo = driverId;
    const updatedOrder = await order.save();
    publishEmailCustomer( {ORDER:order,CHAUFFEUR:driver})
    publishSMS({
      priority:["Transactional","Promotional"][0],
      targets:[order.phone],
      timestamp: new Date().toISOString(),
      message:`Mosooklimo: Dear VIP, we assigned "${driver.name}" with car [${driver.brand}-${driver.model} (${driver.color})] to pick you. he will call soon.`,
    })
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});


const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ assignTo: req.user._id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No order found");
  }
});


const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("assignTo");
  res.json(orders);
});


const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.remove();
    res.json({ message: "Order deleted" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  updateOrderAssign,
  getOrderByPhone,
  deleteOrder,
  updateOrderToCash,
};
