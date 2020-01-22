import { Layout } from "antd";
const { Content } = Layout;
import "./index.css";
import MyHeader from "../components/MyHeader/index";

function App({ children, location: { pathname } }) {
  return (
    <Layout style={{ background: "#f9f9f9" }}>
      <MyHeader pathname={pathname} />
      <Content>{children}</Content>
    </Layout>
  );
}
export default App;
