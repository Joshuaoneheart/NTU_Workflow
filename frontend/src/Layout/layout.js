import { Layout } from "antd";
import { useEffect, useState } from "react";
import MainPage from "../Containers/MainPage/mainPage";
import UserBadge from "../Components/UserBadge/UserBadge";
import LeftSider from "../Containers/Sider/leftsider";
import Profile from "../Containers/Profile/profile";
import Modal from "antd/lib/modal/Modal";
import { ALL_NOTIFY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { NOTIFS_SUBSCRIPTION } from "../graphql/subscription";

const { Header, Footer, Sider, Content } = Layout;
const CustomLayout = (props) => {
  const [showSider, setShowSider] = useState(false);
  const [page, setPage] = useState({ key: "welcome" });
  const [jump, setJump] = useState(false);
  const {
    data: notifs,
    loading,
    subscribeToMore,
  } = useQuery(ALL_NOTIFY, { variables: { id: props.user.id } });
  const [profileVisible, setProfileVisible] = useState(false);
  const onCancel = () => {
    setProfileVisible(false);
  };
  useEffect(() => {
    try {
      subscribeToMore({
        document: NOTIFS_SUBSCRIPTION,
        variables: { id: props.user.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newNotif = subscriptionData.data.Notification;
          return {
            notification: [...prev.notification, newNotif],
          };
        },
      });
    } catch (e) {
      console.log(e);
    }
  }, [subscribeToMore]);
  return (
    <Layout
      style={{
        maxHeight: "100vh",
        userSelect: "none",
        webkitUserSelect: "none",
      }}
    >
      <Modal visible={profileVisible} onCancel={onCancel} footer={null}>
        <Profile data={props.user} />
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
          onClick={() => {
            setPage({ key: "welcome" });
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
          <LeftSider
            setPage={setPage}
            collapsed={showSider}
            notifs={notifs}
            setJump={setJump}
            jump={jump}
            loading={loading}
            user={props.user}
          />
        </Sider>
        <Layout>
          <Content style={{ padding: "40px" }}>
            <div
              style={{
                minHeight: "280px",
                padding: "24px",
                background: "#fff",
                height: "82vh",
                overflow: "auto",
              }}
            >
              {
                <MainPage
                  page={page}
                  setPage={setPage}
                  user={props.user}
                  setJump={setJump}
                  displayStatus={props.displayStatus}
                />
              }
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
