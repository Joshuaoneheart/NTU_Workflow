import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space,Typography } from "antd";

const { Text } = Typography;
const Badge = styled.div`
  float: right;
  width: 130px;
  height: 55px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 4px;
  margin-top: 4px;
  display: flex;
  justify-content: flex-end;
  user-select: none;
`;

const UserIcon = styled(Avatar)`
  align-self: center;
  margin-right: 5px;
`;

export const UserBadge = (props) => (
  <Badge>
    <Space size="small" direction="vertical">
        <Text>{props.user}</Text>
        <Text>{props.user}</Text>
    </Space>
    <UserIcon size="large" icon={<UserOutlined />} />
  </Badge>
);
