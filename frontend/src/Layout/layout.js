import { Layout, Button } from "antd";
import { useState } from "react";
import MainPage from "../Containers/MainPage/mainPage";
import UserBadge from "../Components/UserBadge";
import LeftSider from "../Containers/Sider/leftsider";
import Profile from "../Containers/Profile/profile";
import Modal from "antd/lib/modal/Modal";

const { Header, Footer, Sider, Content } = Layout;

const CustomLayout = (props) => {
  const [showSider, setShowSider] = useState(false);
  const [page, setPage] = useState("main");
  const [profileVisible, setProfileVisible] = useState(false);
  const onCancel = () => {
    setProfileVisible(false);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Modal
        visible={profileVisible}
				onCancel={onCancel}
        footer={null}
      >
        <Profile />
      </Modal>
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
        <UserBadge user={props.user} setProfileVisible={setProfileVisible} setUser={props.setUser} setSignedIn={props.setSignedIn}/>
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
          <LeftSider collapsed={showSider} />
        </Sider>
        <Content style={{ padding: "40px" }}>
          <div
            style={{ minHeight: "280px", padding: "24px", background: "#fff" }}
          >
            {<MainPage setPage={setPage} user={props.user}/>}
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
