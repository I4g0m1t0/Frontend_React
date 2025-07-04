require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./config/database');
const { User, Category, Product, Order, OrderProduct } = require('./models');
const { swaggerUi, swaggerSpec } = require('./swagger');

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());          // Habilita CORS para todas as rotas
app.use(express.json());

// Rota de documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use("/dashboard", dashboardRoutes);

db.sync()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`API rodando em http://localhost:${process.env.PORT}/api-docs/`)
    );
  })
  .catch(console.error);