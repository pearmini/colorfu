import styled from "styled-components";
import { Menu, Icon, Button } from "antd";
import { useMedia } from "react-use";
import { useState } from "react";
import { connect } from "dva";
import router from "umi/router";
const { Item } = Menu;

const Container = styled.header`
  color: black;
  height: 56px;
  line-height: 56px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #f9f9f9;
`;

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: Fascinate inline;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Nav = styled(Menu)`
  background: #f9f9f9;

  @media (max-width: 700px) {
    position: absolute;
    top: 100%;
    right: ${props => (props.open ? 0 : "-100%")};
    width: 100%;
    box-shadow: none;
  }
`;

const NavItem = styled(Item)`
  @media (max-width: 700px) {
    padding: 1rem;
  }
`;

const ToggleButton = styled(Button)`
  display: none;

  @media (max-width: 700px) {
    display: block;
    transform: ${props => props.open && "rotate(-90deg)"};
  }
`;

function Header({ selectedNav, setSelectedNav }) {
  const isWide = useMedia("(min-width: 700px)");
  const [open, setOpen] = useState(false);
  const items = [
    { key: "home", path: "./", name: "home", iconType: "home" },
    { key: "create", path: "./create", name: "create", iconType: "highlight" },
    { key: "gallery", path: "./gallery", name: "gallery", iconType: "picture" },
    { key: "github", name: "github", iconType: "github" }
  ];

  const navProps = {
    mode: isWide && "horizontal",
    open: open && "open"
  };

  function onClickNavItem(path, key) {
    if (path) {
      setSelectedNav(key);
      router.push(path);
    } else {
      const githubURL = "https://github.com/pearmini/words-in-color";
      window.open(githubURL);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Logo onClick={() => onClickNavItem("./", "home")}>WordsInColor</Logo>
        <Nav {...navProps} selectedKeys={[selectedNav]}>
          {items.map(item => (
            <NavItem
              onClick={() => onClickNavItem(item.path, item.key)}
              key={item.key}
            >
              <Icon type={item.iconType} />
              {item.name}
            </NavItem>
          ))}
        </Nav>
        <ToggleButton
          icon="menu-fold"
          type="primary"
          {...{ open: open && "open" }}
          onClick={() => setOpen(!open)}
        />
      </Wrapper>
    </Container>
  );
}

export default connect(({ global }) => ({ selectedNav: global.selectedNav }), {
  setSelectedNav: key => ({
    type: "control/setSelectedNav",
    payload: { key }
  })
})(Header);
