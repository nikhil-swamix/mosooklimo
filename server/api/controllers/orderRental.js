import asyncHandler from "express-async-handler";
import Order from "../models/orderRental.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    pickupPoint,
    dropPoint,
    bookingDate,
    bookingTime,
    dropDate,
    dropTime,

    vehicleClass,
    price,
    meetGreet,
    noOfBabySeat,
    noOfBoosterSeat,
    noOfSpecialLuggage,
    noOfPets,
    noOfExtraStop,

    isBookingForSomeone,
    passengerName,
    passengerCountryCode,
    passengerPhone,
    passengerEmail,
    email,
    name,
    countryCode,
    phone,
    flightNo,
    countryOfResidence,
    remarks,
  } = req.body;

  const order = new Order({
    pickupPoint,
    dropPoint,
    bookingDate,
    bookingTime,
    dropDate,
    dropTime,

    vehicleClass,
    price,
    meetGreet,
    noOfBabySeat,
    noOfBoosterSeat,
    noOfSpecialLuggage,
    noOfPets,
    noOfExtraStop,

    isBookingForSomeone,
    passengerName,
    passengerCountryCode,
    passengerPhone,
    passengerEmail,
    email,
    name,
    countryCode,
    phone,
    flightNo,
    countryOfResidence,
    remarks,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get order by Phone Number
// @route   GET /api/orders/:phone
// @access  Public
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

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
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
  // console.log(order);

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

// @desc    Update order status , i,e pending, assigned or completed
// @route   PUT /api/orders/:id/status
// @access  Admin
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

// @desc    Update order to assign driver , i,e assignTo field
// @route   PUT /api/orders/assign/:id
// @access  Admin
const updateOrderAssign = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { driverId } = req.body;
  if (order) {
    order.assignTo = driverId;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get loggedin driver's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ assignTo: req.user._id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No order found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin

// const getProducts = asyncHandler(async (req, res) => {
//   const pageSize = 10
//   const page = Number(req.query.pageNumber) || 1

//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: 'i',
//         },
//       }
//     : {}

//   const count = await Product.countDocuments({ ...keyword })
//   const products = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1))

//   res.json({ products, page, pages: Math.ceil(count / pageSize) })
// })
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("assignTo");
  res.json(orders);
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Admin
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
