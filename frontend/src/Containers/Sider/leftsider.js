import { Avatar, Badge } from "antd";
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

const Icon = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const focusedOutlined = {
  border: "black",
  borderWidth: "1px",
  borderStyle: "solid",
};

const InfoCircleIcon = styled(InfoCircleOutlined)`
  color: black;
`;

const MessageIcon = styled(MessageOutlined)`
  color: black;
`;

const FileIcon = styled(FileOutlined)`
  color: black;
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
  width: 200px;
  position: absolute;
  ${({ collapsed }) => collapsed && `visibility: hidden;`}
`;

const Header = styled.h1`
  font-size: 3em;
  text-align: center;
  padding: 10px;
`;

const LeftSider = (collapsed) => {
  const [FocusedIcon, setFocused] = useState(<Notifications />);
  const [activeBadge, setActiveBadge] = useState(0);
  const [title, setTitle] = useState("Notifications");
  const FocusNotifications = () => {
    setFocused(<Notifications />);
    setActiveBadge(0);
    setTitle("Notifications");
  };
  const FocusMessages = () => {
    setFocused(<Messages />);
    setActiveBadge(1);
    setTitle("Messages");
  };
  const FocusArchives = () => {
    setFocused(<Archives />);
    setActiveBadge(2);
    setTitle("Archives");
  };
  return (
    <>
      <Container>
        <IconColumn>
          <Icon onClick={FocusNotifications}>
            <Badge count={3} overflowCount={10}>
              <Avatar
                shape="circle"
                size="large"
                icon={<InfoCircleIcon />}
                style={activeBadge === 0 ? focusedOutlined : {}}
              />
            </Badge>
          </Icon>
          <Icon onClick={FocusMessages}>
            <Badge count={2} overflowCount={10}>
              <Avatar
                shape="circle"
                size="large"
                icon={<MessageIcon />}
                style={activeBadge === 1 ? focusedOutlined : {}}
              />
            </Badge>
          </Icon>
          <Icon onClick={FocusArchives}>
            <Badge count={1} overflowCount={10}>
              <Avatar
                shape="circle"
                size="large"
                icon={<FileIcon />}
                style={activeBadge === 2 ? focusedOutlined : {}}
              />
            </Badge>
          </Icon>
        </IconColumn>
        {collapsed.collapsed === false ? (
          <>
            <ContentColumn>
              <Header>{title}</Header>
              {FocusedIcon}
            </ContentColumn>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default LeftSider;
