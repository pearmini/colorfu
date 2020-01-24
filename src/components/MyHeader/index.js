import { Menu, Icon, Layout } from "antd";
import router from "umi/router";
import useWindowSize from "../../hooks/useWindowSize";
import useScrollHeight from "../../hooks/useScrollHeight";
import { connect } from "dva";
const { Item } = Menu;
const { Header } = Layout;

function MyHeader({ pathname, selectedNav, setSelectedNav }) {
  const [width] = useWindowSize();
  const scrollHeight = useScrollHeight();

  const color = scrollHeight < 56 && pathname === "/" && "#f9f9f9";

  function goto(path, key) {
    router.push(path);
    setSelectedNav(key);
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
        WordsInColor
      </div>
      <Menu
        mode="horizontal"
        style={{
          backgroundColor: "transparent"
        }}
        selectedKeys={[selectedNav]}
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
          onClick={() => goto("./gallery", "gallery")}
          style={{ color }}
          key="gallery"
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

export default connect(
  ({ control }) => ({ selectedNav: control.selectedNav }),
  {
    setSelectedNav: key => ({
      type: "control/setSelectedNav",
      payload: { key }
    })
  }
)(MyHeader);
