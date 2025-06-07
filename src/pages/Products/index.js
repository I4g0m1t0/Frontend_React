import React, { useState, useEffect } from "react";
import { Container, Title, ModalOverlay, ModalContent } from "./style";
import api from "../../services/api";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
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
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      try {
        await api.delete(`/produtos/${id}`);
        loadProducts();
      } catch (err) {
        setError("Erro ao excluir produto");
      }
    }
  };
  return (
    <Container>
      <Title>Gerenciamento de Produtos</Title>
      <button onClick={handleAddProduct}>Adicionar Produto</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.idproduto}>
              <td>{product.nome}</td>
              <td>R$ {product.valor}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>
                  Editar
                </button>
                <button onClick={() => handleDeleteProduct(product.idproduto)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={currentProduct}
          onProductSaved={loadProducts}
        />
      )}
    </Container>
  );
};
const ProductModal = ({ isOpen, onClose, product, onProductSaved }) => {
  const [formData, setFormData] = useState({
    nome: "",
    valor: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    if (product) {
      setFormData({
        nome: product.nome,
        valor: product.valor,
      });
    } else {
      setFormData({
        nome: "",
        valor: "",
      });
    }
  }, [product]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.nome || !formData.valor) {
      setError("Todos os campos são obrigatórios");
      return;
    }
    const productData = {
      ...formData,
      valor: parseFloat(formData.valor),
    };
    try {
      if (product) {
        await api.put(`/produtos/${product.idproduto}`, productData);
      } else {
        await api.post("/produtos", productData);
      }
      onProductSaved();
      onClose();
    } catch (err) {
      setError("Erro ao salvar produto");
    }
  };
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{product ? "Editar Produto" : "Novo Produto"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome do produto"
            value={formData.nome}
            onChange={handleChange}
          />
          <input
            type="number"
            name="valor"
            placeholder="Preço"
            step="0.01"
            value={formData.valor}
            onChange={handleChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="button-group">
            <button type="submit">{product ? "Atualizar" : "Criar"}</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};
export default Products;
