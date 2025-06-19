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

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.get("/orders/"); 
      setOrders(response.data);
    } catch (err) {
      setError("Erro ao carregar pedidos");
      console.error("Erro ao carregar pedidos:", err);
    }
  };

  const handleCreateOrder = () => {
    setError("");
    setShowProductSelection(true);
  };

  const handleProductSelectionConfirm = async (selectedProducts) => {
    try {
      setError("");
      const items = selectedProducts.map((product) => ({
        productId: product.produtos_idproduto,
        quantity: product.quantity || 1,
      }));

      await api.post("/orders", { items }); 
      
      setShowProductSelection(false);
      loadOrders();
    } catch (err) {
      setError("Erro ao criar pedido com produtos selecionados.");
      console.error("Erro ao criar pedido com produtos:", err);
    }
  };

  const handleDeleteOrder = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este pedido?");
    if (confirmDelete) {
      try {
        setError("");
        await api.delete(`/orders/${id}`); 
        loadOrders();
      } catch (err) {
        setError("Erro ao excluir pedido");
        console.error("Erro ao excluir pedido:", err);
      }
    }
  };

  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setError("");
      await api.put(`/orders/${id}`, { status: newStatus }); 
      loadOrders();
    } catch (err) {
      setError("Erro ao atualizar status do pedido");
      console.error("Erro ao atualizar status do pedido:", err);
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
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.status || 'Pendente'}</td>
              <td>
                <button onClick={() => handleViewOrder(order)}>
                  Visualizar
                </button>
                <button onClick={() => handleUpdateStatus(order.id, "1")}>
                  Em Preparo
                </button>
                <button onClick={() => handleUpdateStatus(order.id, "2")}>
                  Pronto
                </button>
                <button onClick={() => handleUpdateStatus(order.id, "3")}>
                  Entregue
                </button>
                <button onClick={() => handleDeleteOrder(order.id)}>
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
    if (isOpen && order && order.products) {
      setOrderProducts(order.products.map(p => ({
        productId: p.id,
        nome: p.name,
        valor: p.value,
        quantity: p.OrderProduct?.quantity || 1,
        observacao: p.OrderProduct?.observation || '',
      })));
    } else if (isOpen && order && !order.products) {
        console.warn("Objeto de pedido não contém a propriedade 'products'. Verifique o backend.");
        setError("Erro: Produtos do pedido não carregados. Verifique o backend.");
    }
  }, [isOpen, order]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Detalhes do Pedido #{order.id}</h2>
        <div>
          <p>
            <strong>Data/Hora:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {order.status || 'N/A'}
          </p>
        </div>
        <div className="products-section">
          <h3>Produtos do Pedido</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {orderProducts.length === 0 && !error && <p>Nenhum produto associado a este pedido.</p>}
          {orderProducts.map((item) => (
            <div key={item.productId} className="product-item">
              <p>
                <strong>{item.nome}</strong> - Quantidade: {item.quantity} - R$
                {item.valor}
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
      const response = await api.get("/products"); 
      setProducts(response.data);
    } catch (err) {
      setError("Erro ao carregar produtos");
      console.error("Erro ao carregar produtos:", err);
    }
  };

  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find(
      (p) => p.productId === product.id
    );
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.filter(
          (p) => p.productId !== product.id
        )
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          productId: product.id,
          observacao: "",
          quantity: 1,
        },
      ]);
    }
  };

  const handleObservationChange = (productId, observation) => {
    setSelectedProducts(
      selectedProducts.map((item) => {
        if (item.productId === productId) {
          return { ...item, observacao: observation };
        }
        return item;
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
            <div key={product.id} className="product-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedProducts.some(
                    (p) => p.productId === product.id
                  )}
                  onChange={() => handleProductSelect(product)}
                />
                {product.name} - R$ {product.value}
              </label>
              {selectedProducts.some(
                (p) => p.productId === product.id
              ) && (
                <textarea
                  placeholder="Observações"
                  value={
                    selectedProducts.find(
                      (p) => p.productId === product.id
                    )?.observacao || ""
                  }
                  onChange={(e) =>
                    handleObservationChange(product.id, e.target.value)
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