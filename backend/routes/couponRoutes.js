import express from "express";
import {
  createCoupon,
  getCoupons,
  deleteCoupon,
  validateCoupon,
} from "../controllers/couponController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, createCoupon).get(protect, admin, getCoupons);
router.route("/:id").delete(protect, admin, deleteCoupon);
router.route("/validate").post(validateCoupon);

export default router;
