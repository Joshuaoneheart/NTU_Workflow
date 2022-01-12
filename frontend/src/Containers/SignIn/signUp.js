import { Space, Button, Card, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { hash } from "bcryptjs";
import "../../App.css";

const Container = styled(Card)`
  position: absolute;
  width: 50vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10vh;
  height: 65vh;
  top: 17.5vh;
  left: 25vw;
  box-shadow: 0px 0px 1px black;
`;

const signUp = ({
  user,
  password,
  confirmPass,
  isNew,
  setIsNew,
  setUser,
  setPassword,
  setConfirmPass,
  setSignedIn,
  displayStatus,
}) => {
  const handleSignUp = () => {
    if (!password || !confirmPass || !user)
      displayStatus({
        type: "error",
        msg: "UserName or Password empty",
      });
    else if (password !== confirmPass) {
      displayStatus({
        type: "error",
        msg: "Passwords are different",
      });
    } else {
      let salt = 0;
      const hashed_p = hash(password, salt);
      setSignedIn(true);
    }
  };

  const handleCancel = () => {
    setPassword("");
    setConfirmPass("");
    setIsNew(false);
  };

  return (
    <Container>
      <div className="SignIn-title">
        <h1> Please sign up </h1>
      </div>
      <br />
      <br />
      <Input.Group compact style={{ width: "30vw" }}>
        <Input
          value={user}
          prefix={<UserOutlined size="large" />}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter username here"
          size="large"
          style={{ marginTop: "20px" }}
        />
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password here"
          size="large"
          style={{ marginTop: "20px" }}
        />
        <Input.Password
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Re-enter password here"
          size="large"
          style={{ marginTop: "20px" }}
        />
      </Input.Group>
      <br />
        <br />
      <Space>
        <Button type="primary" onClick={handleSignUp}>
          Sign up
        </Button>
        <Button type="primary" onClick={handleCancel} danger>
          Cancel
        </Button>
      </Space>
    </Container>
  );
};

export default signUp;
