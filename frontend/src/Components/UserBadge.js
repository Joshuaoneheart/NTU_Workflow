import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
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

const TextLayout = styled.div`
  margin-right: 10px;
  flex-direction: column;
  display: flex;
`;



export const UserBadge = (props) => (
  <Badge>
    <TextLayout>
      <p style={{display: "flex", marginBottom: "5px", height: "20px"}}>{props.user}</p>
      <p style={{display: "flex", marginBottom: "1px", height: "20px"}}>{props.user}</p>
    </TextLayout>
    <UserIcon size="large" icon={<UserOutlined />} />
  </Badge>
);
