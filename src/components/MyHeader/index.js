import useWindowSize from "../../hooks/useWindowSize";
import useScrollHeight from "../../hooks/useScrollHeight";
import router from "umi/router";
import { useState } from "react";

import { Button } from "antd";
import MyMenu from "../MyMenu/index";
import { connect } from "dva";

function MyHeader({ pathname, setOverlayer, setSelectedNav }) {
  const [width] = useWindowSize();
  const scrollHeight = useScrollHeight();
  const [showMenu, setShowMenu] = useState(false);
  const isTransparent = scrollHeight < 56 && pathname === "/";
  const isPhone = width < 700;
  const styles = {
    containter: { position: "fixed", zIndex: 5, width: "100%" },
    header: {
      display: "flex",
      height: 56,
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: "0px 20px",
      backgroundColor: !isTransparent && "black"
    },
    logo: {
      fontFamily: "Fascinate Inline",
      fontSize: 30,
      cursor: "pointer",
      color: "white"
    },
    toggleButton: {
      transform: showMenu && "rotate(-90deg)"
    }
  };

  function toggleMenu() {
    setShowMenu(!showMenu);
    isPhone && setOverlayer(!showMenu);
  }

  function goto(path, key) {
    if (path) {
      setSelectedNav(key);
      router.push(path);
    } else {
      window.open("https://github.com/pearmini/words-in-color");
    }
    isPhone && toggleMenu();
  }

  return (
    <div style={styles.containter}>
      <div style={styles.header}>
        <div style={styles.logo} onClick={() => goto("./", "home")}>
          WordsInColor
        </div>
        {isPhone ? (
          <Button
            style={styles.toggleButton}
            onClick={() => toggleMenu()}
            icon="menu-fold"
            ghost
          />
        ) : (
          <MyMenu
            isVertical={false}
            isTransparent={isTransparent}
            onClickItem={(path, key) => goto(path, key)}
          />
        )}
      </div>
      {isPhone && showMenu && (
        <MyMenu
          isVertical={true}
          isTransparent={isTransparent}
          onClickItem={(path, key) => goto(path, key)}
        />
      )}
    </div>
  );
}

export default connect(null, {
  setOverlayer: value => ({
    type: "control/setOverlayer",
    payload: { value }
  }),
  setSelectedNav: key => ({
    type: "control/setSelectedNav",
    payload: { key }
  })
})(MyHeader);
