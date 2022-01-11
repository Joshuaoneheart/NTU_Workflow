import { Avatar, Badge } from "antd";
import {
  InfoCircleOutlined,
  FolderOpenOutlined,
  MailOutlined,
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

const FolderOpenIcon = styled(FolderOpenOutlined)`
  color: black;
`;

const MailIcon = styled(MailOutlined)`
  color: black;
`;

const InfoCircleIcon = styled(InfoCircleOutlined)`
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
  const FocusNotifications = () => {
    setFocused(<Notifications />);
    setActiveBadge(0);
  };
  const FocusMessages = () => {
    setFocused(<Messages />);
    setActiveBadge(1);
  };
  const FocusArchives = () => {
    setFocused(<Archives />);
    setActiveBadge(2);
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
                icon={<FolderOpenIcon />}
                style={activeBadge === 0 ? focusedOutlined : {}}
              />
            </Badge>
          </Icon>
          <Icon onClick={FocusMessages}>
            <Badge count={2} overflowCount={10}>
              <Avatar
                shape="circle"
                size="large"
                icon={<MailIcon />}
                style={activeBadge === 1 ? focusedOutlined : {}}
              />
            </Badge>
          </Icon>
          <Icon onClick={FocusArchives}>
            <Badge count={1} overflowCount={10}>
              <Avatar
                shape="circle"
                size="large"
                icon={<InfoCircleIcon />}
                style={activeBadge === 2 ? focusedOutlined : {}}
              />
            </Badge>
          </Icon>
        </IconColumn>
        {collapsed.collapsed === false ? (
          <>
            <ContentColumn>
              <Header>Notifications</Header>
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
