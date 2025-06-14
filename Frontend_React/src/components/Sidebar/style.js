import styled from "styled-components";
export const SidebarContainer = styled.div`
  height: 100vh;
  background-color: #333;
  transition: width 0.3s;
  width: ${(props) => (props.isOpen ? "200px" : "60px")};
  position: fixed;
  left: 0;
  top: 0;
`;
export const ToggleButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: #444;
  color: white;
  position: absolute;
  right: -15px;
  top: 20px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
export const NavMenu = styled.nav`
  padding: 20px 0;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    margin: 5px 0;
    &.active a {
      background-color: #444;
    }
  }
  a {
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background-color 0.3s;
    &:hover {
      background-color: #444;
    }
    span {
      white-space: nowrap;
      opacity: ${(props) => (props.isOpen ? 1 : 0)};
      transition: opacity 0.3s;
    }
  }
`;
