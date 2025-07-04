-- 1. Dropar database se existir e criar novamente
DROP DATABASE IF EXISTS atividade_js;
CREATE DATABASE atividade_js CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE atividade_js;

-- 2. Tabela users
CREATE TABLE users (
id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
name VARCHAR(100)      NOT NULL,
email VARCHAR(150)     NOT NULL UNIQUE,
password VARCHAR(255)  NOT NULL,
createdAt DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabela categories
CREATE TABLE categories (
id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
name VARCHAR(100)      NOT NULL,
createdAt DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabela products
CREATE TABLE products (
id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
name VARCHAR(150)      NOT NULL,
price DECIMAL(10,2)    NOT NULL DEFAULT 0.00,
categoryId INT(10) UNSIGNED NOT NULL,
createdAt DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id),
KEY idx_products_category (categoryId),
CONSTRAINT fk_products_category FOREIGN KEY (categoryId) REFERENCES categories (id) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tabela orders
CREATE TABLE orders (
id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
userId INT(10) UNSIGNED NOT NULL,
status ENUM('ativo','cancelado','pago','enviado','em_preparo','pronto','entregue') NOT NULL DEFAULT 'ativo',
createdAt DATETIME                                           NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME                                           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id),
KEY idx_orders_user (userId),
CONSTRAINT fk_orders_user FOREIGN KEY (userId) REFERENCES users (id) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Tabela intermediária order_products
CREATE TABLE order_products (
orderId INT(10) UNSIGNED NOT NULL,
productId INT(10) UNSIGNED NOT NULL,
quantity INT(10) UNSIGNED    NOT NULL DEFAULT 1,
observation TEXT              NULL,
createdAt DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (orderId,productId),
KEY idx_op_product (productId),
CONSTRAINT fk_op_order FOREIGN KEY (orderId) REFERENCES orders (id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_op_product FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Fim do script. As tabelas estão com todos os relacionamentos e o campo observation incluído.

