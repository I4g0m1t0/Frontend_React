import styled from "styled-components";
import { IonIcon } from "@ionic/react";
import backgroundImage from './imagem.jpg';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: url(${backgroundImage}) no-repeat center center/cover;
  font-family: "Poppins", sans-serif;
`;

export const FormBox = styled.div`
  position: relative;
  width: 400px;
  height: 450px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormValue = styled.div`
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 2em;
  color: #fff;
  text-align: center;
`;

export const InputBox = styled.div`
  position: relative;
  margin: 30px auto;
  width: 310px;
  border-bottom: 2px solid #fff;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0 35px 0 5px;
  color: #fff;
`;

export const StyledLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  color: #fff;
  font-size: 1em;
  pointer-events: none;
  transition: 0.5s;

  ${StyledInput}:focus ~ &,
  ${StyledInput}:valid ~ & {
    top: -5px;
  }
`;

export const Icon = styled(IonIcon)`
  position: absolute;
  right: 8px;
  color: #fff;
  font-size: 1.2em;
  top: 20px;
`;

export const Forget = styled.div`
  margin: -15px 0 15px;
  font-size: 0.9em;
  color: #fff;
  display: flex;
  justify-content: space-between;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  label input {
    margin-right: 3px;
  }
`;

export const Button = styled.button`
  width: 80%;
  height: 40px;
  border-radius: 40px;
  background: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
`;

export const Register = styled.div`
  font-size: 0.9em;
  color: #fff;
  text-align: center;
  margin: 25px 0 10px;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`;
