import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const UserIcon = styled(UserOutlined)`
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
`;

const ContentColumn = styled.div`
  margin-left: 80px;
  position: absolute;
`;

const Header = styled.h1`
  font-size: 3em;
  text-align: center;
  padding: 10px;
`;

const LeftSider = () => {
  return (
    <>
      <Container>
        <IconColumn>
          <br />
          <Badge count={11} overflowCount={10}>
            <Avatar shape="circle" size="large" icon={<UserIcon />} />
          </Badge>
          <br />
          <br />
          <Badge count={11} overflowCount={10}>
            <Avatar shape="circle" size="large" icon={<UserIcon />} />
          </Badge>
        </IconColumn>
        <ContentColumn>
          <Header>Notifications</Header>
        </ContentColumn>
      </Container>
    </>
  );
};

export default LeftSider;
