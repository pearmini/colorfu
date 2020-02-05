import styled from "styled-components";
import router from "umi/router";
import { connect } from "dva";

import { useState } from "react";
import { useMedia } from "react-use";

import { Menu, Icon, Button } from "antd";
const { Item } = Menu;

const ToggleButton = styled(Button).attrs(({ theme }) => ({
  type: theme === "light" ? "normal" : "primary",
  ghost: theme === "light" && true
}))`
  transform: ${props => props.rotate && "rotate(-90deg)"};
`;

const CollpaseMenu = styled(Menu).attrs(({ iswide }) => ({
  mode: !iswide ? "vertical" : "horizontal"
}))`
  background: transparent;
  position: ${props => !props.iswide && 'absolute' }
`;

const MenuItem = styled(Item)`
  color: ${props => props.theme === "light" && "white"};
`;


function MyMenu({selectedNav, transparent, setSelectedNav }) {
  const [show, setShow] = useState(false);
  const isWide = useMedia("(min-width: 750px)");
  const styles = {
    menu: {
      // backgroundColor: isTransparent ? "transparent" : "black"
      // marginTop: show ? 0 : -192
    }
    // item: { color: "white", visibility: !show && "hidden" }
  };

  function onClick(path, key) {
    if (path) {
      setSelectedNav(key);
      router.push(path);
    } else {
      window.open("https://github.com/pearmini/words-in-color");
    }
    isPhone && toggleMenu();
  }

  function toggleMenu() {
    setShow(!show);
  }

  const items = [
    { key: "home", path: "./", name: "home", iconType: "home" },
    { key: "create", path: "./create", name: "create", iconType: "highlight" },
    { key: "gallery", path: "./gallery", name: "gallery", iconType: "picture" },
    { key: "github", name: "github", iconType: "github" }
  ];

  return (
    <>
      {!isWide && (
        <ToggleButton
          icon="menu-fold"
          theme={transparent ? "light" : "dark"}
          onClick={toggleMenu}
          rotate={show}
        />
      )}
      <CollpaseMenu
        selectedKeys={transparent ? [] : [selectedNav]}
        theme="light"
        iswide={isWide}
      >
        {items.map(item => (
          <MenuItem
            onClick={() => onClick(item.path, item.key)}
            key={item.key}
            theme={transparent ? "light" : "dark"}
          >
            <Icon type={item.iconType} />
            {item.name}
          </MenuItem>
        ))}
      </CollpaseMenu>
    </>
  );
}
export default connect(
  ({ control }) => ({ selectedNav: control.selectedNav }),
  {
    setSelectedNav: key => ({
      type: "control/setSelectedNav",
      payload: { key }
    })
  }
)(MyMenu);
