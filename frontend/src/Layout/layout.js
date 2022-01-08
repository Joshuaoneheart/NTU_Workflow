import { Layout, Menu } from "antd";
import { useState } from "react";
import MainPage from "../Containers/MainPage/mainPage";
import UserOutlined from '@ant-design/icons';
import styled from "styled-components"

const { Header, Footer, Sider, Content } = Layout;
const UserIcon = styled.div`
    border-radius:50%;
    float: right;
    background-color: #eee;
    width: 50px;
    height: 50px;
    margin-top: 5px;
`

const CustomLayout = (props) => {
  const [showSider, setShowSider] = useState(false);
  const [page, setPage] = useState("main");
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <div
          style={{
            float: "left",
            width: "120px",
            height: "31px",
            margin: "16px 24px 16px 0",
            background: "rgba(255, 255, 255, 0.3)",
          }}
        />
        <UserIcon><UserOutlined/></UserIcon>
      </Header>
      <Layout>
        <Sider
          style={{ background: "#fff" }}
          collapsible
          collapsed={showSider}
          onCollapse={(collapsed) => {
            setShowSider(collapsed);
          }}
        >
          Left Sider
        </Sider>
        <Content style={{ padding: "0 50px" }}>
          <div
            style={{ minHeight: "280px", padding: "24px", background: "#fff" }}
          >
            {<MainPage setPage={setPage} />}
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        NTU Workflow System @2021 Created by Yi-Hsin, Yu, Matthieu Desir and
        Eileen Wang
      </Footer>
    </Layout>
  );
};

export default CustomLayout;
