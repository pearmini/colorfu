import { Menu, Icon, Layout } from "antd";
import router from "umi/router";
import useWindowSize from "../../hooks/useWindowSize";
import useScrollHeight from "../../hooks/useScrollHeight";
import { useState } from "react";
const { Item } = Menu;
const { Header } = Layout;

export default function({ pathname }) {
  const [width] = useWindowSize();
  const [selectedKey, setSelectedKey] = useState("home");
  const scrollHeight = useScrollHeight();

  const color = scrollHeight < 56 && pathname === "/" && "#f9f9f9";

  function goto(path, key) {
    router.push(path);
    setSelectedKey(key);
  }

  return (
    <Header
      style={{
        display: "flex",
        height: 48,
        justifyContent: "space-between",
        alignItems: "center",
        width,
        zIndex: 2,
        backgroundColor: "transparent",
        position: "fixed"
      }}
    >
      <div
        style={{
          color: color || "black",
          fontFamily: "Fascinate Inline",
          fontSize: 30,
          cursor: "pointer"
        }}
        onClick={() => goto("./", "home")}
      >
        WordsPaper
      </div>
      <Menu
        mode="horizontal"
        style={{
          backgroundColor: "transparent"
        }}
        selectedKeys={[selectedKey]}
      >
        <Item onClick={() => goto("./", "hmoe")} style={{ color }} key="home">
          <Icon type="home"></Icon>
          home
        </Item>
        <Item
          onClick={() => goto("./create", "create")}
          style={{ color }}
          key="create"
        >
          <Icon type="highlight" />
          create
        </Item>
        <Item
          onClick={() => goto("./gallery", "picture")}
          style={{ color }}
          key="picture"
        >
          <Icon type="picture" />
          gallery
        </Item>
        <Item style={{ color }}>
          <Icon type="github" />
          github
        </Item>
      </Menu>
    </Header>
  );
}
