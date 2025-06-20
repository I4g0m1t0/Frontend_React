import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.7); /* preto com transparência */
  border-bottom: 2px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  transition: height 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 0 20px;
`;

export const ToggleButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: #444;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #0000; /* Cor ao passar o mouse */
  }
`;

export const NavMenu = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 20px;
  }

  li {
    &.active a {
      background-color: #444;
      border-radius: 4px;
    }
  }

  a {
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;

    &:hover {
      background-color: #444;
      border-radius: 4px;
    }

    span {
      white-space: nowrap;
    }
  }
`;
