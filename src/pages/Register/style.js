import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centraliza verticalmente */
  align-items: center; /* Centraliza horizontalmente */
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 2rem;
`;
export const Title = styled.h2`
  color: #333;
  font-size: 2.2rem;
  margin-bottom: 2rem;
`;
export const Form = styled.form`
width: 100%;
max-width: 400px;
background: #fff;
padding: 30px 20px;
border-radius: 8px;
box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
display: flex;
flex-direction: column;
align-items: center;

p {
color: #ff3333;
margin-bottom: 15px;
border: 1px solid #ff3333;
padding: 10px;
width: 100%;
text-align: center;
border-radius: 4px;
background-color: #ffe5e5;
}

input {
height: 46px;
margin-bottom: 15px;
padding: 0 15px;
color: #333;
font-size: 15px;
width: 100%;
border: 1px solid #ccc;
border-radius: 4px;
&::placeholder {
color: #aaa;
}
}

button {
color: #fff;
font-size: 16px;
background: #fc6963;
height: 50px;
border: none;
border-radius: 5px;
width: 100%;
cursor: pointer;
transition: background 0.3s;
&:hover {
background: #e85a55;
}
}

hr {
margin: 20px 0;
border: none;
border-bottom: 1px solid #cdcdcd;
width: 100%;
}

a {
font-size: 14px;
color: #666;
text-decoration: none;
margin-top: 10px;
transition: color 0.2s;
&:hover {
color: #333;
}
`;
