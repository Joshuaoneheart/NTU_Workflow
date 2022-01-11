import { Layout } from "antd";
import { useState } from "react";
import MainPage from "../Containers/MainPage/mainPage";
import UserBadge from "../Components/UserBadge/UserBadge";
import LeftSider from "../Containers/Sider/leftsider";
import Profile from "../Containers/Profile/profile";
import Modal from "antd/lib/modal/Modal";

const { Header, Footer, Sider, Content } = Layout;

const CustomLayout = (props) => {
  const [showSider, setShowSider] = useState(false);
  const [page, setPage] = useState({ key: "createDocument" });
  const [profileVisible, setProfileVisible] = useState(false);
  const onCancel = () => {
    setProfileVisible(false);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
        userSelect: "none",
        webkitUserSelect: "none",
      }}
    >
      <Modal visible={profileVisible} onCancel={onCancel} footer={null}>
        <Profile />
      </Modal>
      <Header>
        <div
          style={{
            float: "left",
            height: "31px",
            color: "rgb(220, 230, 220)",
            fontFamily: "Bebas Neue, cursive",
            fontSize: "37px",
            textAlign: "center",
          }}
        >
          NTU WORKFLOW
        </div>
        <UserBadge
          user={props.user}
          setProfileVisible={setProfileVisible}
          setUser={props.setUser}
          setSignedIn={props.setSignedIn}
        />
      </Header>
      <Layout>
        <Sider
          width={400}
          style={{ background: "#fff" }}
          collapsible
          collapsed={showSider}
          onCollapse={(collapsed) => {
            setShowSider(collapsed);
          }}
        >
          <LeftSider setPage={setPage} collapsed={showSider} />
        </Sider>
        <Layout>
          <Content style={{ padding: "40px" }}>
            <div
              style={{
                minHeight: "280px",
                padding: "24px",
                background: "#fff",
              }}
            >
              {<MainPage page={page} setPage={setPage} user={props.user} />}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            NTU Workflow System @2021 Created by Yi-Hsin, Yu, Matthieu Desir and
            Eileen Wang
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
