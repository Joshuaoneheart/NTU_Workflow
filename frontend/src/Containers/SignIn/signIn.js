import { Button, Card, Input, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { hash } from "bcryptjs";
import "../../App.css";
import SignUp from "./signUp";

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

const signIn = ({
  user,
  password,
  confirmPass,
  isNew,
  setUser,
  setIsNew,
  setPassword,
  setConfirmPass,
  setSignedIn,
  displayStatus,
}) => {
  const handleSignUp = () => {
    setPassword("");
    setConfirmPass("");
    setIsNew(true);
  };
  const handleSignIn = () => {
    if (!user || !password) {
      displayStatus({
        type: "error",
        msg: "Username or Password empty",
      });
    } else {
      let salt = 0;
      const hashed_p = hash(password, salt);
      setSignedIn(true);
    }
  };
  return (
    <>
      {isNew === false ? (
        <Container>
          <div className="SignIn-title">
            <h1> Please sign in </h1>
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
          </Input.Group>
          <br />
          <br />
          <Space>
            <Button type="primary" onClick={handleSignIn}>
              Sign in
            </Button>
            <Button type="primary" onClick={handleSignUp}>
              Sign up
            </Button>
          </Space>
        </Container>
      ) : (
        <SignUp
          user={user}
          password={password}
          confirmPass={confirmPass}
          isNew={isNew}
          setUser={setUser}
          setPassword={setPassword}
          setConfirmPass={setConfirmPass}
          setIsNew={setIsNew}
          displayStatus={displayStatus}
        />
      )}
    </>
  );
};

export default signIn;
