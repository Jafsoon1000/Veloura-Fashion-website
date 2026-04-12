import Product from "../models/Product.js";

export async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch product details" });
  }
}
