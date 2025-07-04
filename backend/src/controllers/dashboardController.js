const db = require("../config/database.js");

const getDashboardData = async (req, res) => {
  try {
    const [categories] = await db.query("SELECT COUNT(*) AS total FROM categories");
    const [products] = await db.query("SELECT COUNT(*) AS total FROM products");
    const [orders] = await db.query("SELECT COUNT(*) AS total FROM orders");
    const [users] = await db.query("SELECT COUNT(*) AS total FROM users");

    res.json({
      totalCategories: categories[0].total,
      totalProducts: products[0].total,
      totalOrders: orders[0].total,
      totalUsers: users[0].total,
    });
  } catch (err) {
    console.error("Erro ao carregar dashboard:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { getDashboardData };
