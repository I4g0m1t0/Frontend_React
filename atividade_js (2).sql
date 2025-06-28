-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/06/2025 às 22:37
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Criação do banco de dados: `atividade_js`
--
CREATE DATABASE IF NOT EXISTS `atividade_js` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `atividade_js`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(3, 'Doces', '2025-06-19 22:22:36', '2025-06-19 22:22:36'),
(4, 'Salgados', '2025-06-19 22:22:42', '2025-06-19 22:22:42');

-- --------------------------------------------------------

--
-- Estrutura para tabela `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), -- Corrigido: Adicionado ON UPDATE current_timestamp()
  `status` varchar(20) NOT NULL DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `orders`
--

INSERT INTO `orders` (`id`, `userId`, `createdAt`, `updatedAt`, `status`) VALUES
(1, 5, '2025-06-20 18:24:13', '2025-06-20 20:22:18', 'cancelado'),
(4, 7, '2025-06-20 01:10:04', '2025-06-20 01:10:04', 'ativo'),
(5, 5, '2025-06-20 18:33:27', '2025-06-20 20:22:33', 'cancelado'),
(6, 5, '2025-06-20 18:35:27', '2025-06-20 18:35:27', 'ativo'),
(7, 5, '2025-06-20 18:37:23', '2025-06-20 18:37:23', 'ativo'),
(8, 5, '2025-06-20 18:38:41', '2025-06-20 18:38:41', 'ativo'),
(9, 5, '2025-06-20 18:38:41', '2025-06-20 18:38:41', 'ativo'),
(10, 5, '2025-06-20 18:38:42', '2025-06-20 18:38:42', 'ativo'),
(11, 5, '2025-06-20 18:38:42', '2025-06-20 18:38:42', 'ativo'),
(12, 5, '2025-06-20 18:38:42', '2025-06-20 18:38:42', 'ativo'),
(13, 5, '2025-06-20 18:43:19', '2025-06-20 18:43:19', 'ativo'),
(14, 5, '2025-06-20 18:46:11', '2025-06-20 18:46:11', 'ativo'),
(15, 5, '2025-06-20 18:47:06', '2025-06-20 18:47:06', 'ativo'),
(16, 5, '2025-06-20 18:50:04', '2025-06-20 18:50:04', 'ativo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `order_products`
--

CREATE TABLE `order_products` (
  `orderId` int(10) UNSIGNED NOT NULL,
  `productId` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `order_products`
--

INSERT INTO `order_products` (`orderId`, `productId`, `quantity`, `createdAt`, `updatedAt`) VALUES
(16, 1, 10, '2025-06-20 18:50:04', '2025-06-20 18:50:04');

-- --------------------------------------------------------

--
-- Estrutura para tabela `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `categoryId` int(10) UNSIGNED NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(1, 'pão sevenboys', 10.00, 4, '2025-06-20 18:16:18', '2025-06-20 18:16:18'),
(2, 'brigadeiro', 2.25, 3, '2025-06-20 18:16:27', '2025-06-20 18:26:19');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(), -- Adicionado
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() -- Adicionado
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'João Silva', 'joao@exemplo.com', '$2b$10$/Be7qb7YXDfgNchU98AeAOE72TGSc79wFF84FIu54dpS8Mul7MIz6', '2025-06-20 00:00:00', '2025-06-20 00:00:00'),
(2, 'Iago', 'iago@exemplo.com', '$2b$10$mXKdVRuIIBGU1Qyp1URXjuRgHfI4n5chXeB/WLapa.cOxsQVdnXs.', '2025-06-20 00:00:00', '2025-06-20 00:00:00'),
(3, 'Lucas Silva', 'lucas@exemplo.com', '$2b$10$wEmAN555OO8UBuzIysDWZeA9sFMYHQYpLNcaFa1lw4Yscf6d/.baO', '2025-06-20 00:00:00', '2025-06-20 00:00:00'),
(4, 'joao', 'joao@teste.com', '$2b$10$b5jnGm4rXtW.LBQEZcMf3uZb9SJtsPSXcbaUo.e0kmUFIyir4rdUm', '2025-06-20 00:00:00', '2025-06-20 00:00:00'),
(5, 'Iago', '1@gmail.com', '$2b$10$UlAYek7kldrPMOMNUEZ.OuhPx1BnEyCbZ4HumhDThp65vq9003FFO', '2025-06-20 00:00:00', '2025-06-20 00:00:00'),
(6, 'aaa', 'aa@d', '$2b$10$CjZrc41CnjvM6h.UGytfOu51p.gvHXNm9fB9HxsERnSttj9t9mDZK', '2025-06-20 00:00:00', '2025-06-20 00:00:00'),
(7, 'Eduardo Jhonathan Passos Neumann', 'eduardoneumannpb@gmail.com', '$2b$10$PWqlEWx.fYI/DVZS90UCRecZ0OWcMsFh6XxzjyV6.jixEHy', '2025-06-20 00:00:00', '2025-06-20 00:00:00');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Índices de tabela `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`orderId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Índices de tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `fk_op_order` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_op_product` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
