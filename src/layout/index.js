import { Layout } from "antd";
const { Content } = Layout;
import "./index.css";
import MyHeader from "../components/MyHeader/index";
import Overlayer from "../components/Overlayer/index";

function App({ children, location: { pathname } }) {
  return (
    <Layout style={{ background: "#f9f9f9" }}>
      <MyHeader pathname={pathname} />
      <Content>{children}</Content>
      <Overlayer />
    </Layout>
  );
}
export default App;
