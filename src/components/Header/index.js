import useWindowSize from "../../hooks/useWindowSize";
import useScrollHeight from "../../hooks/useScrollHeight";
import styled from "styled-components";
import router from "umi/router";
import { useState } from "react";

import { Button } from "antd";
import Menu from "../Menu/index";
import { connect } from "dva";

const Container = styled.header`
  position: fixed;
  z-index: 5;
  width: 100%;
  display: flex;
  height: 56px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 20px;
`;

const Logo = styled.div`
  font-family: Fascinate Inline;
  font-size: 30px;
  cursor: pointer;
  color: ${props => (props.theme === "light" ? "white" : "black")};
`;

function Header({ pathname }) {
  const scrollHeight = useScrollHeight();
  const transparent = scrollHeight < 56 && pathname === "/";
  // const styles = {
  //   containter: { position: "fixed", zIndex: 5, width: "100%" },
  //   header: {
  //     display: "flex",
  //     height: 56,
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     width: "100%",
  //     padding: "0px 20px",
  //     zIndex: 3,
  //     backgroundColor: !isTransparent && "black"
  //   },
  //   logo: {
  //     fontFamily: "Fascinate Inline",
  //     fontSize: 30,
  //     cursor: "pointer",
  //     color: "white"
  //   },
  //   toggleButton: {
  //     transform: showMenu && "rotate(-90deg)"
  //   },
  //   overlayer: {
  //     width,
  //     height,
  //     background: "rgba(0,0,0,0.5)",
  //     position: "absolute",
  //     left: 0,
  //     top: 0,
  //     zIndex: -1
  //   }
  // };

  return (
    <Container>
      <Logo theme={transparent ? "light" : "dark"}>WorldsInColor</Logo>
      <Menu transparent={transparent} />
    </Container>
    // <Container>
    //   <div style={styles.header}>
    //     <div style={styles.logo} onClick={() => goto("./", "home")}>
    //       WordsInColor
    //     </div>
    //     {isPhone ? (
    //       <Button
    //         style={styles.toggleButton}
    //         onClick={() => toggleMenu()}
    //         icon="menu-fold"
    //         ghost
    //       />
    //     ) : (
    //       <Menu
    //         isVertical={false}
    //         isTransparent={isTransparent}
    //         onClickItem={(path, key) => goto(path, key)}
    //         show={true}
    //       />
    //     )}
    //   </div>
    //   {isPhone && (
    //     <div>
    //       <Menu
    //         isVertical={true}
    //         isTransparent={isTransparent}
    //         onClickItem={(path, key) => goto(path, key)}
    //         show={showMenu}
    //       />
    //       {showMenu && <div style={styles.overlayer}></div>}
    //     </div>
    //   )}
    // </Container>
  );
}

export default connect(null, {
  
})(Header);
