import React, { useEffect, useState } from "react";
import { Container, Card, Grid } from "./style";
import api from "../../services/api";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dashboard");
        setData(response.data);
      } catch (err) {
        setErro("Erro ao carregar o dashboard");
      }
    };

    fetchData();
  }, []);

  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  if (!data) return <p>Carregando dados...</p>;

  return (
    <Container>
      <h1>Dashboard</h1>
      <Grid>
        <Card>
          <h2>📦 Produtos</h2>
          <p>{data.totalProducts}</p>
        </Card>
        <Card>
          <h2>📂 Categorias</h2>
          <p>{data.totalCategories}</p>
        </Card>
        <Card>
          <h2>🧾 Pedidos</h2>
          <p>{data.totalOrders}</p>
        </Card>
        <Card>
          <h2>👤 Usuários</h2>
          <p>{data.totalUsers}</p>
        </Card>
      </Grid>
    </Container>
  );
};

export default Dashboard;
