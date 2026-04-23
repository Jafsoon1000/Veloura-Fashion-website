import Coupon from "../models/Coupon.js";

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
export async function createCoupon(req, res) {
  const { code, discountType, discountValue, expiryDate, usageLimit } = req.body;

  try {
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({ error: "Coupon code already exists" });
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      expiryDate,
      usageLimit: usageLimit || null,
    });

    const createdCoupon = await coupon.save();
    return res.status(201).json(createdCoupon);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create coupon" });
  }
}

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
export async function getCoupons(req, res) {
  try {
    const coupons = await Coupon.find({});
    return res.json(coupons);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch coupons" });
  }
}

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
export async function deleteCoupon(req, res) {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (coupon) {
      await Coupon.deleteOne({ _id: coupon._id });
      return res.json({ message: "Coupon removed" });
    } else {
      return res.status(404).json({ error: "Coupon not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete coupon" });
  }
}

// @desc    Validate and apply a coupon
// @route   POST /api/coupons/validate
// @access  Public
export async function validateCoupon(req, res) {
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ error: "Invalid coupon code" });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ error: "Coupon is no longer active" });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ error: "Coupon has expired" });
    }

    if (coupon.usageLimit !== null && coupon.timesUsed >= coupon.usageLimit) {
      return res.status(400).json({ error: "Coupon usage limit reached" });
    }

    return res.json({
      _id: coupon._id,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to validate coupon" });
  }
}
