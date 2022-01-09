import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu } from "antd";

const Badge = styled(Button)`
  float: right;
  width: 120px;
  height: 55px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  margin-top: 4px;
  user-select: none;
  align-items: center;
  display: flex;
  border: 0;
  &:hover {
    color: #555;
  }
`;

const UserIcon = styled(Avatar)`
  align-self: center;
`;

const menu = (
  <Menu>
    <Menu.Item>
        Setting
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
        Log out
    </Menu.Item>
  </Menu>
);

export const UserBadge = (props) => (
  <Dropdown overlay={menu}>
  <Badge>
    <div style={{display: "flex", width: "70px", marginRight: "7px", flexDirection: "column", alignItems: "flex-end", marginRight: "10px"}}>
        <label style={{padding: 0, width: "30px", display: "inline-flex"}}>{props.user}</label>
        <label style={{padding: 0, width: "30px", display: "inline-flex"}}>{props.user}</label>
    </div>
    <div style={{display: "flex"}}>
      <UserIcon size="large" icon={<UserOutlined />} />
    </div>
  </Badge>
  </Dropdown>
);
