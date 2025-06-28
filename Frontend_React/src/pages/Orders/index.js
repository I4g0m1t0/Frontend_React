import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import api from "../../services/api";
import { Container, ModalContent, ModalOverlay, Title } from "./style";

const statusMap = {
  "1": "em_preparo",
  "2": "pronto",
  "3": "entregue"
};

const statusText = {
  ativo: "Ativo",
  em_preparo: "Em Preparo",
  pronto: "Pronto",
  entregue: "Entregue",
  cancelado: "Cancelado"
};

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
        productId: product.productId || product.produtos_idproduto,
        quantity: product.quantity,
      }));

      await api.post("/orders", { items });

      setShowProductSelection(false);
      await loadOrders();
    } catch (err) {
      setError("Erro ao criar pedido com produtos selecionados.");
      console.error("Erro ao criar pedido com produtos:", err);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido?")) {
      try {
        setError("");
        await api.delete(`/orders/${id}`);
        setOrders((prev) => prev.filter((order) => order.id !== id));
      } catch (err) {
        setError("Erro ao excluir pedido");
        console.error("Erro ao excluir pedido:", err);
      }
    }
  };

  const handleUpdateStatus = async (id, statusCode) => {
    try {
      setError("");
      const status = statusMap[statusCode];
      if (!status) {
        setError("Status inválido");
        return;
      }

      const response = await api.patch(`/orders/${id}/status`, { status });

      const updatedOrder = response.data;
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? updatedOrder : order
        )
      );
    } catch (err) {
      setError("Erro ao atualizar status do pedido");
      console.error("Erro ao atualizar status do pedido:", err);
    }
  };

const handleViewOrder = async (order) => {
  try {
    const response = await api.get(`/orders/${order.id}`);
    console.log("Detalhes do pedido:", response.data);
    setCurrentOrder(response.data);
    setIsModalOpen(true);
  } catch (error) {
    alert("Erro ao buscar detalhes do pedido!");
    console.error(error);
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
              <td>{statusText[order.status] || order.status || "Pendente"}</td>
              <td>
                <button onClick={() => handleViewOrder(order)}>Visualizar</button>
                {Object.entries(statusMap).map(([code, statusStr]) => (
                  <button
                    key={code}
                    onClick={() => handleUpdateStatus(order.id, code)}
                    disabled={order.status === statusStr}
                    style={{
                      backgroundColor:
                        order.status === statusStr ? "#4CAF50" : "initial",
                      color: order.status === statusStr ? "white" : "initial",
                      cursor: order.status === statusStr ? "default" : "pointer",
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    {statusText[statusStr]}
                  </button>
                ))}
                <button onClick={() => handleDeleteOrder(order.id)}>Excluir</button>
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
    setOrderProducts(
      order.products.map((p) => ({
        productId: p.id,
        nome: p.name,
        valor: p.price, // Corrigido de value para price
        quantity: p.order_products?.quantity || 1, // Corrigido o nome do campo
        observacao: p.order_products?.observation || "",
      }))
    );
  } else if (isOpen && order && !order.products) {
    console.warn(
      "Objeto de pedido não contém a propriedade 'products'. Verifique o backend."
    );
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
            <strong>Status:</strong> {statusText[order.status] || order.status || "N/A"}
          </p>
        </div>
        <div className="products-section">
          <h3>Produtos do Pedido</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {orderProducts.length === 0 && !error && (
            <p>Nenhum produto associado a este pedido.</p>
          )}
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
  const [products, setProducts] = React.useState([]);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
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
        selectedProducts.filter((p) => p.productId !== product.id)
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

  const handleQuantityChange = (productId, quantity) => {
  setSelectedProducts(
    selectedProducts.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: Number(quantity) };
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
              {selectedProducts.some((p) => p.productId === product.id) && (
                <>
                <textarea
                  placeholder="Observações"
                  value={
                    selectedProducts.find((p) => p.productId === product.id)
                      ?.observacao || ""
                  }
                  onChange={(e) =>
                    handleObservationChange(product.id, e.target.value)
                  }
                />
                <input 
                  type="number" 
                  min={1}
                  placeholder="quantidade" 
                  value={selectedProducts.find(
                    (p) => p.productId === product.id)?.quantity || 1} 
                  onChange={e => handleQuantityChange(product.id, e.target.value)}
                />
                </>
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
