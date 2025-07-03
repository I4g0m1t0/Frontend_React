const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operações com produtos
 */

router.use(auth);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de produtos
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retorna produto por ID
 *     tags: [Products]
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
 *         description: Produto encontrado
 *       '404':
 *         description: Produto não encontrado
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria novo produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, categoryId]
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Produto criado
 */
router.post('/', productController.create);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Produto atualizado
 *       '404':
 *         description: Produto não encontrado
 */
router.put('/:id', productController.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deleta produto se não estiver em pedidos ativos
 *     tags: [Products]
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
 *         description: Produto deletado
 *       '409':
 *         description: Produto em pedidos ativos
 */
router.delete('/:id', productController.delete);

module.exports = router;
