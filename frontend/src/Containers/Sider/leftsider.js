import { Avatar, Badge } from "antd";
import UserOutlined from "@ant-design/icons";
import styled from "styled-components";

const UserIcon = styled(UserOutlined)`
	background-color: black;
`;

const LeftSider = () => {
  return (
    <>
			<br />
      <Badge count={11} overflowCount={10}>
        <Avatar size="large" icon={<UserIcon />} />
      </Badge>
    </>
  );
};

export default LeftSider;
