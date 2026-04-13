import Order from "../models/Order.js";

export async function addOrderItems(req, res) {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ error: "No order items" });
  }

  try {
    const order = new Order({
      orderItems,
      user: req.user._id, // Assumes auth middleware provides req.user
      shippingAddress,
      paymentMethod,
      totalPrice
    });

    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
  } catch (error) {
    return res.status(500).json({ error: "Order creation failed" });
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch order" });
  }
}

export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user orders" });
  }
}
