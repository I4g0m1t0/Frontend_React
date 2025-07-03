const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações com usuários
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *       '409':
 *         description: Email já cadastrado
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Retorna token JWT
 *       '401':
 *         description: Credenciais inválidas
 */
router.post('/login', userController.login);

// Rotas protegidas
router.use(auth);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Retorna perfil do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil retornado
 *       '401':
 *         description: Token ausente ou inválido
 */
router.get('/me', userController.getProfile);

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Atualiza perfil do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Perfil atualizado
 *       '404':
 *         description: Usuário não encontrado
 */
router.put('/me', userController.updateProfile);

/**
 * @swagger
 * /api/users/me/password:
 *   put:
 *     summary: Altera a senha do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Senha alterada
 *       '401':
 *         description: Senha atual incorreta
 */
router.put('/me/password', userController.changePassword);

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     summary: Deleta conta do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Conta deletada
 */
router.delete('/me', userController.deleteAccount);

module.exports = router;
