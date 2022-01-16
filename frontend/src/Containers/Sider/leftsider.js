import { Avatar, Badge, Space, Typography } from "antd";
import {
  FileOutlined,
  InfoCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Messages from "./messages";
import Notifications from "./notifications";
import Archives from "./archives";
import styled from "styled-components";
import { useState } from "react";

const { Title } = Typography;

const Icon = styled.div`
  border-radius: 20px;
`;

const focusedOutlined = {
  border: "#001528",
  borderWidth: "1px",
  borderStyle: "solid",
};

const InfoCircleIcon = styled(InfoCircleOutlined)`
  color: #001528;
  &:hover {
    color: #ffffff;
  }
`;

const MessageIcon = styled(MessageOutlined)`
  color: #001528;
  &:hover {
    color: #ffffff;
  }
`;

const FileIcon = styled(FileOutlined)`
  color: #001528;
  &:hover {
    color: #ffffff;
  }
`;

const Container = styled.div`
  padding: 10px;
  padding-top: 2vh;
  padding-bottom: 1vh;
  display: flex;
  position: absolute;
`;

const IconColumn = styled.div`
  width: 80px;
  position: absolute;
  user-select: none;
`;

const ContentColumn = styled.div`
  margin-left: 80px;
  width: 300px;
  position: absolute;
`;

const Header = styled.h1`
  font-size: 3em;
  text-align: center;
  padding: 10px;
`;

const LeftSider = ({ collapsed, setPage, user, notifs, loading }) => {
  const [FocusedIcon, setFocused] = useState(<Notifications notifs={notifs} loading={loading} setPage={setPage}/>);
  const [activeBadge, setActiveBadge] = useState(0);
  const [title, setTitle] = useState("Notifications");
  const FocusNotifications = () => {
    setFocused(<Notifications notifs={notifs} loading={loading} setPage={setPage}/>);
    setActiveBadge(0);
    setTitle("Notifications");
  };
  const FocusMessages = () => {
    setFocused(<Messages setPage={setPage} user={user} />);
    setActiveBadge(1);
    setTitle("Messages");
  };
  const FocusArchives = () => {
    setFocused(<Archives setPage={setPage} user={user} />);
    setActiveBadge(2);
    setTitle("Archives");
  };
  return (
    <>
      <Container>
        <IconColumn>
          <Space direction="vertical" size="large">
            <Icon onClick={FocusNotifications}>
              <Badge count={(loading)? null: notifs.notification.length} overflowCount={10}>
                <Avatar
                  shape="circle"
                  size="large"
                  icon={<InfoCircleIcon />}
                  style={activeBadge === 0 ? focusedOutlined : {}}
                />
              </Badge>
            </Icon>
            <Icon onClick={FocusMessages}>
              <Badge overflowCount={10}>
                <Avatar
                  shape="circle"
                  size="large"
                  icon={<MessageIcon />}
                  style={activeBadge === 1 ? focusedOutlined : {}}
                />
              </Badge>
            </Icon>
            {user.role === "student" && (
              <Icon onClick={FocusArchives}>
                <Badge overflowCount={10}>
                  <Avatar
                    shape="circle"
                    size="large"
                    icon={<FileIcon />}
                    style={activeBadge === 2 ? focusedOutlined : {}}
                  />
                </Badge>
              </Icon>
            )}
          </Space>
        </IconColumn>
        <ContentColumn
          style={collapsed === true ? { visibility: "hidden" } : {}}
        >
          <Header>
            <Title>{title}</Title>
          </Header>
          {FocusedIcon}
        </ContentColumn>
      </Container>
    </>
  );
};

export default LeftSider;
