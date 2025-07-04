const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operações com pedidos
 */

router.use(auth);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     observation:
 *                       type: string
 *     responses:
 *       '201':
 *         description: Pedido criado
 */
router.post('/', orderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lista pedidos do usuário
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de pedidos
 */
router.get('/', orderController.getByUser);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Retorna pedido por ID (do usuário)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Pedido encontrado
 *       '404':
 *         description: Pedido não encontrado
 */
router.get('/:id', orderController.getById);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Cancela um pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Pedido cancelado
 *       '404':
 *         description: Pedido não encontrado
 */

router.delete('/:id', orderController.cancelOrder);

router.patch('/:id/status', orderController.updateStatus);

module.exports = router;
