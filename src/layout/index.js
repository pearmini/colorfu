import styled from "styled-components";
import Header from "../components/Header.js";

const Layout = styled.div`
  background: #f9f9f9;
`;

function App({ children, location: { pathname } }) {
  return (
    <Layout>
      <Header></Header>
      {
        children
      }
    </Layout>
  );
}
export default App;
