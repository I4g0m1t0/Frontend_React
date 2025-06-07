import styled from "styled-components";
export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  .create-order-btn {
    padding: 12px 24px;
    margin-bottom: 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #28a745;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    &:hover {
      background-color: #218838;
    }
  }
  button {
    padding: 8px 16px;
    margin: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    &:hover {
      background-color: #0056b3;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f8f9fa;
      font-weight: bold;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
    button {
      &:nth-child(2) {
        background-color: #ffc107;
        color: #000;
        &:hover {
          background-color: #e0a800;
        }
      }
      &:nth-child(3) {
        background-color: #28a745;
        &:hover {
          background-color: #218838;
        }
      }
      &:nth-child(4) {
        background-color: #17a2b8;
        &:hover {
          background-color: #138496;
        }
      }
      &:nth-child(5) {
        background-color: #dc3545;
        &:hover {
          background-color: #c82333;
        }
      }
    }
  }
`;
export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  h2 {
    margin-bottom: 20px;
    color: #333;
  }
  div {
    margin-bottom: 15px;
    p {
      margin: 8px 0;
      line-height: 1.5;
    }
  }
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    button {
      background-color: #6c757d;
      &:hover {
        background-color: #5a6268;
      }
    }
  }
`;
