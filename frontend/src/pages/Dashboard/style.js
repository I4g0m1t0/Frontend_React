import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 60px auto;
  padding: 20px;

  h1 {
    margin-bottom: 30px;
    font-size: 28px;
    text-align: center;
    color: #333;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);

  h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 32px;
    font-weight: bold;
    color: #007bff;
  }
`;
