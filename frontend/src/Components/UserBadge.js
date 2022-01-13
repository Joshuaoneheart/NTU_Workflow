import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu } from "antd";

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

export const UserBadge = ({ user, setUser, setSignedIn, ...props }) => {
  console.log(props)
  const menu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="log out"
        onClick={() => {
          setUser({});
          setSignedIn(false);
        }}
      >
        Log out
      </Menu.Item>
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
            {user.department}
          </label>
          <label
            style={{
              padding: 0,
              width: "70px",
              display: "inline-block",
              textAlign: "right",
            }}
          >
            {user.name}
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <UserIcon size="large" icon={<UserOutlined />} />
        </div>
      </Badge>
    </Dropdown>
  );
};
