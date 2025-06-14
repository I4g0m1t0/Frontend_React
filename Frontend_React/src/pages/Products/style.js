import styled from "styled-components";
export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
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
      &:last-child {
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
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    input,
    textarea {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      button:last-child {
        background-color: #6c757d;
        &:hover {
          background-color: #5a6268;
        }
      }
    }
  }
`;
