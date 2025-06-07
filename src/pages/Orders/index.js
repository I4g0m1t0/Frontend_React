import React, { useState, useEffect } from "react";
import { Container, Title, ModalOverlay, ModalContent } from "./style";
import api from "../../services/api";
import { AiOutlinePlus } from "react-icons/ai";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [error, setError] = useState("");
  const [showProductSelection, setShowProductSelection] = useState(false);
  const [newOrderId, setNewOrderId] = useState(null);
  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = async () => {
    try {
      const response = await api.get("/pedidos");
      setOrders(response.data);
    } catch (err) {
      setError("Erro ao carregar pedidos");
    }
  };
  const handleCreateOrder = async () => {
    try {
      setError("");
      const response = await api.post("/pedidos", { status: "1" });
      setNewOrderId(response.data.idpedido);
      setShowProductSelection(true);
    } catch (err) {
      setError("Erro ao criar pedido");
    }
  };
  const handleProductSelectionConfirm = async (selectedProducts) => {
    try {
      const productPromises = selectedProducts.map((product) => {
        return api.post("/produtos_pedidos", {
          ...product,
          pedidos_idpedido: newOrderId,
        });
      });
      await Promise.all(productPromises);
      setShowProductSelection(false);
      loadOrders();
    } catch (err) {
      setError("Erro ao adicionar produtos ao pedido");
    }
  };
  const handleDeleteOrder = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido?")) {
      try {
        setError("");
        await api.delete(`/pedidos/${id}`);
        loadOrders();
      } catch (err) {
        setError("Erro ao excluir pedido");
      }
    }
  };
  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/pedidos/${id}`, { status: newStatus });
      loadOrders();
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
const OrderModal = ({ isOpen, onClose, order }) => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadOrderProducts = async () => {
      try {
        const productsResponse = await api.get("/produtos_pedidos");
        const orderProductsData = productsResponse.data.filter(
          (item) => item.pedidos_idpedido === order.idpedido
        );
        const productsDetails = await api.get("/produtos");
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
const ProductSelectionModal = ({ onClose, onConfirm }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    try {
      const response = await api.get("/produtos");
      setProducts(response.data);
    } catch (err) {
      setError("Erro ao carregar produtos");
    }
  };
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
          pedidos_idpedido: null,
        },
      ]);
    }
  };
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
