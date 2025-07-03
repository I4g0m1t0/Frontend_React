import React from "react";
import { Container, Title } from "./style";
import { Link } from "react-router-dom";

const App = () => {
    return (
        <Container>
            <Title>Tela de Aplicação</Title>
            {/* conteúdo da página de aplicação */}
            <Link to="/logout">Logout</Link>
        </Container>
    );
};
export default App;