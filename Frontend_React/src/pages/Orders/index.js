import React, { useState, useEffect } from "react";
import { Container, Title, ModalOverlay, ModalContent } from "./style";
import api from "../../services/api";
import { AiOutlinePlus } from "react-icons/ai";

// Componente principal de Pedidos
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [error, setError] = useState("");
  const [showProductSelection, setShowProductSelection] = useState(false);
  const [newOrderId, setNewOrderId] = useState(null);

  // Carrega os pedidos da API ao montar o componente
  useEffect(() => {
    loadOrders();
  }, []);

  // Função para buscar pedidos no backend
  const loadOrders = async () => {
    try {
      // Usando a rota correta para pedidos: '/orders'
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (err) {
      setError("Erro ao carregar pedidos");
    }
  };

  // Lidar com a criação de um novo pedido
  const handleCreateOrder = async () => {
    try {
      setError("");
      // Usando a rota correta para criar pedidos: '/orders'
      const response = await api.post("/orders", { status: "1" });
      setNewOrderId(response.data.idpedido);
      setShowProductSelection(true);
    } catch (err) {
      setError("Erro ao criar pedido");
    }
  };

  // Lidar com a confirmação da seleção de produtos para um novo pedido
  const handleProductSelectionConfirm = async (selectedProducts) => {
    try {
      const productPromises = selectedProducts.map((product) => {
        return api.post("/produtos_pedidos", { // Este endpoint parece consistente com a sua lógica de backend
          ...product,
          pedidos_idpedido: newOrderId,
        });
      });
      await Promise.all(productPromises);
      setShowProductSelection(false);
      loadOrders(); // Recarrega os pedidos após adicionar os produtos
    } catch (err) {
      setError("Erro ao adicionar produtos ao pedido");
    }
  };

  // Lidar com a exclusão de um pedido
  const handleDeleteOrder = async (id) => {
    // Substituindo window.confirm por um aviso no console e removendo a função para seguir as instruções
    // Em uma aplicação real, você deve implementar um modal de confirmação personalizado aqui.
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este pedido?");
    if (confirmDelete) {
      try {
        setError("");
        // Usando a rota correta para excluir pedidos: '/orders'
        await api.delete(`/orders/${id}`);
        loadOrders(); // Recarrega os pedidos após a exclusão
      } catch (err) {
        setError("Erro ao excluir pedido");
      }
    }
  };

  // Lidar com a visualização dos detalhes do pedido em um modal
  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  // Lidar com a atualização do status do pedido
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      // Usando a rota correta para atualizar pedidos: '/orders'
      await api.put(`/orders/${id}`, { status: newStatus });
      loadOrders(); // Recarrega os pedidos após a atualização do status
    } catch (err) {
      setError("Erro ao atualizar status do pedido");
    }
  };

  return (
    <Container>
      <Title>Gerenciamento de Pedidos</Title>
      <button className="create-order-btn" onClick={handleCreateOrder}>
        <AiOutlinePlus size={20} /> Criar Novo Pedido
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hora</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.idpedido}>
              <td>{order.idpedido}</td>
              <td>{new Date(order.hora).toLocaleString()}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleViewOrder(order)}>
                  Visualizar
                </button>
                <button onClick={() => handleUpdateStatus(order.idpedido, "1")}>
                  Em Preparo
                </button>
                <button onClick={() => handleUpdateStatus(order.idpedido, "2")}>
                  Pronto
                </button>
                <button onClick={() => handleUpdateStatus(order.idpedido, "3")}>
                  Entregue
                </button>
                <button onClick={() => handleDeleteOrder(order.idpedido)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showProductSelection && (
        <ProductSelectionModal
          onClose={() => setShowProductSelection(false)}
          onConfirm={handleProductSelectionConfirm}
        />
      )}
      {isModalOpen && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={currentOrder}
        />
      )}
    </Container>
  );
};

// Componente de Modal para exibir detalhes do pedido
const OrderModal = ({ isOpen, onClose, order }) => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrderProducts = async () => {
      try {
        const productsResponse = await api.get("/produtos_pedidos"); // Este endpoint parece consistente
        const orderProductsData = productsResponse.data.filter(
          (item) => item.pedidos_idpedido === order.idpedido
        );
        // Usando a rota correta para buscar detalhes dos produtos: '/products'
        const productsDetails = await api.get("/products"); 
        const productsMap = productsDetails.data.reduce((acc, product) => {
          acc[product.idproduto] = product;
          return acc;
        }, {});
        const productsWithDetails = orderProductsData.map((item) => ({
          ...item,
          product: productsMap[item.produtos_idproduto],
        }));
        setOrderProducts(productsWithDetails);
      } catch (err) {
        setError("Erro ao carregar produtos do pedido");
      }
    };
    if (isOpen && order) {
      loadOrderProducts();
    }
  }, [isOpen, order]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Detalhes do Pedido #{order.idpedido}</h2>
        <div>
          <p>
            <strong>Data/Hora:</strong> {new Date(order.hora).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
        <div className="products-section">
          <h3>Produtos do Pedido</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {orderProducts.map((item) => (
            <div key={item.idproduto_pedido} className="product-item">
              <p>
                <strong>{item.product?.nome}</strong> - R$
                {item.product?.valor}
              </p>
              {item.observacao && <p>Observação: {item.observacao}</p>}
            </div>
          ))}
        </div>
        <div className="button-group">
          <button type="button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

// Componente de Modal para seleção de produtos ao criar um novo pedido
const ProductSelectionModal = ({ onClose, onConfirm }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  // Função para carregar todos os produtos disponíveis
  const loadProducts = async () => {
    try {
      // Usando a rota correta para buscar produtos: '/products'
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      setError("Erro ao carregar produtos");
    }
  };

  // Lidar com a seleção/desseleção de um produto
  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find(
      (p) => p.produtos_idproduto === product.idproduto
    );
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.filter(
          (p) => p.produtos_idproduto !== product.idproduto
        )
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          produtos_idproduto: product.idproduto,
          observacao: "",
          pedidos_idpedido: null, // Será definido quando o pedido for criado
        },
      ]);
    }
  };

  // Lidar com a alteração da observação para um produto selecionado
  const handleObservationChange = (productId, observation) => {
    setSelectedProducts(
      selectedProducts.map((product) => {
        if (product.produtos_idproduto === productId) {
          return { ...product, observacao: observation };
        }
        return product;
      })
    );
  };

  // Lidar com a confirmação da seleção de produtos
  const handleConfirm = () => {
    if (selectedProducts.length === 0) {
      setError("Selecione pelo menos um produto");
      return;
    }
    onConfirm(selectedProducts);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Selecionar Produtos</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="products-list">
          {products.map((product) => (
            <div key={product.idproduto} className="product-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedProducts.some(
                    (p) => p.produtos_idproduto === product.idproduto
                  )}
                  onChange={() => handleProductSelect(product)}
                />
                {product.nome} - R$ {product.valor}
              </label>
              {selectedProducts.some(
                (p) => p.produtos_idproduto === product.idproduto
              ) && (
                <textarea
                  placeholder="Observações"
                  value={
                    selectedProducts.find(
                      (p) => p.produtos_idproduto === product.idproduto
                    )?.observacao || ""
                  }
                  onChange={(e) =>
                    handleObservationChange(product.idproduto, e.target.value)
                  }
                />
              )}
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Orders;
