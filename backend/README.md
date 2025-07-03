# API RESTful com Node.js, Express, Sequelize, JWT e Swagger

Esta é uma API RESTful desenvolvida com Node.js utilizando o framework Express, Sequelize para ORM, autenticação via JWT e documentação com Swagger.

## Tecnologias Utilizadas

- Node.js  
- Express  
- Sequelize  
- MySQL  
- JWT (jsonwebtoken)  
- Swagger (Documentação)  
- dotenv  
- bcrypt  
- cors  

## Estrutura de Pastas

```
src/
├── config/
│   └── database.js
├── controllers/
│   ├── categoryController.js
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Category.js
│   ├── index.js
│   ├── Order.js
│   ├── OrderProduct.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── swagger.js
└── server.js
```

## Autenticação

A autenticação é baseada em tokens JWT. Para acessar rotas protegidas, forneça o token JWT no header:

```
Authorization: Bearer <seu_token>
```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Ed_Newmann123/API_Pedidos.git
```

2. Navegue até a pasta:

```bash
cd API_RestFul_JS
```

3. Instale as dependências:

```bash
npm install
```

Ou, se preferir listar os pacotes:

```bash
npm install express sequelize mysql2 jsonwebtoken bcrypt cors dotenv swagger-jsdoc swagger-ui-express
npm install --save-dev nodemon
```

4. Crie um arquivo `.env` com o seguinte conteúdo:

```
PORT=3000
DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
JWT_SECRET=sua_chave_secreta
```

##  Executar a API

Para rodar em modo de desenvolvimento com `nodemon`:

```bash
npm run dev
```

Ou, para rodar normalmente:

```bash
npm start
```

## Documentação Swagger

Acesse a documentação interativa da API:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Rotas Principais

- `POST /api/users/register` – Cadastro de usuário  
- `POST /api/users/login` – Login e geração de token  
- `GET /api/categories` – Listagem de categorias  
- `POST /api/products` – Cadastro de produto (autenticado)  
- `POST /api/orders` – Realiza pedido (autenticado)  