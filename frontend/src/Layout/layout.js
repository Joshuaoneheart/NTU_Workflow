import { Layout, Menu } from "antd";
import { useState } from "react";
import MainPage from "../Containers/MainPage/mainPage";

const { Header, Footer, Sider, Content } = Layout;

const CustomLayout = (props) => {
  const [showSider, setShowSider] = useState(false);
  const [page, setPage] = useState("main");
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>Header</Header>
      <Layout>
        <Sider style={{background: "#fff"}} collapsible collapsed={showSider} onCollapse={(collapsed) => {setShowSider(collapsed)}}>Left Sider</Sider>
        <Content style={{ padding: "0 50px" }}>
          <div
            style={{ minHeight: "280px", padding: "24px", background: "#fff" }}
          >
            {<MainPage setPage={setPage} />}
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        NTU Workflow System @2021 Created by Yi-Hsin, Yu, Matthieu Desir and Eileen Wang
      </Footer>
    </Layout>
  );
};

export default CustomLayout;
