import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title } from "./style";
import { logout } from "../../services/auth"; // ajuste o caminho conforme sua estrutura;

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    logout(); // limpa o token
    navigate("/login"); // redireciona para login
  }, [navigate]);
  return (
    <Container>
      <Title>Saindo...</Title>
    </Container>
  );
};
export default Logout;
