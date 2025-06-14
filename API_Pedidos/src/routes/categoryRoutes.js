const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operações com categorias
 */

router.use(auth);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de categorias
 */
router.get('/', categoryController.getAll);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retorna categoria por ID
 *     tags: [Categories]
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
 *         description: Categoria encontrada
 *       '404':
 *         description: Categoria não encontrada
 */
router.get('/:id', categoryController.getById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria nova categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Categoria criada
 */
router.post('/', categoryController.create);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualiza categoria
 *     tags: [Categories]
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
 *     responses:
 *       '200':
 *         description: Categoria atualizada
 *       '404':
 *         description: Categoria não encontrada
 */
router.put('/:id', categoryController.update);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deleta categoria se não houver produtos vinculados
 *     tags: [Categories]
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
 *         description: Categoria deletada
 *       '409':
 *         description: Categoria vinculada a produtos
 */
router.delete('/:id', categoryController.delete);

module.exports = router;
