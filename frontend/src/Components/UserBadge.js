import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu } from "antd";
import { useState } from "react";

const { SubMenu } = Menu;

const Badge = styled(Button)`
  float: right;
  width: 135px;
  height: 55px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  margin-top: 4px;
  user-select: none;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  border: 0;
  padding-left: 2px;
  &:hover {
    color: #555;
  }
`;

const UserIcon = styled(Avatar)`
  align-self: center;
`;

const UserBadge = ({setProfileVisible, ...props}) => {
  const showProfile = () => {
    setProfileVisible(true);
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={showProfile}>Profile</Menu.Item>
      <Menu.Divider />
      <Menu.Item>Log out</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Badge>
        <div
          style={{
            display: "flex",
            width: "100px",
            marginRight: "7px",
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: "10px",
            overflow: "hidden",
            textAlign: "end",
          }}
        >
          <label
            style={{
              padding: 0,
              width: "70px",
              display: "inline-block",
              textAlign: "right",
            }}
          >
            Joshua
          </label>
          <label
            style={{
              padding: 0,
              width: "70px",
              display: "inline-block",
              textAlign: "right",
            }}
          >
            A genius
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <UserIcon size="large" icon={<UserOutlined />} />
        </div>
      </Badge>
    </Dropdown>
  );
};
export default UserBadge;
