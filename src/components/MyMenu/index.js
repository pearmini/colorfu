import { Menu, Icon } from "antd";
import { connect } from "dva";
const { Item } = Menu;

function MyMenu({
  isVertical,
  selectedNav,
  isTransparent,
  onClickItem
}) {
  const styles = {
    menu: {
      backgroundColor: isTransparent ? "transparent" : "black"
    },
    item: { color: "white" }
  };

  return (
    <Menu
      mode="horizontal"
      style={styles.menu}
      selectedKeys={isTransparent ? [] : [selectedNav]}
      mode={isVertical ? "vertical" : "horizontal"}
      theme="dark"
    >
      <Item
        onClick={() => onClickItem("./", "home")}
        key="home"
        style={styles.item}
      >
        <Icon type="home"></Icon>
        home
      </Item>
      <Item
        onClick={() => onClickItem("./create", "create")}
        key="create"
        style={styles.item}
      >
        <Icon type="highlight" />
        create
      </Item>
      <Item
        onClick={() => onClickItem("./gallery", "gallery")}
        key="gallery"
        style={styles.item}
      >
        <Icon type="picture" />
        gallery
      </Item>
      <Item style={styles.item} onClick={() => onClickItem()}>
        <Icon type="github" />
        github
      </Item>
    </Menu>
  );
}
export default connect(({ control }) => ({ selectedNav: control.selectedNav }))(
  MyMenu
);
