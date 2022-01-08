import { Card, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components"
import { hash } from "bcryptjs";
import "../../App.css";

const Container = styled(Card)`
  position: absolute;
  width: 50vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  height: 65vh;
  top: 17.5vh;
  left: 25vw;
  box-shadow: 0px 0px 1px black;
`

const signIn = ({
  user,
  password,
  setUser,
  setPassword,
  setSignedIn,
  displayStatus,
}) => {
  return (
    <Container>
      <div className="SignIn-title">
        <h1> Please sign in </h1>
      </div>
      <Input.Group compact style={{width: "30vw"}}>
        <Input.Search
          value={user}
	      prefix={<UserOutlined size="large" />}
          onChange={(e) => setUser(e.target.value)}
					onSearch={(name) => {
						if (!name) displayStatus({
								type: "error",
								msg: "UserName empty"
						})
						else {
              let salt = 0;
              const hashed_p = hash(password, salt);
              setSignedIn(true);
            }
					}}
          placeholder="Enter username here"
          size="large"
          style={{ marginTop: "20px" }}
        />
          <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onSearch={(pass) => {
          if (!pass || !user)
          displayStatus({
          type: "error",
          msg: "Username or Password empty.",
          });
          else setSignedIn(true);
          }}
          placeholder="Enter password here"
          size="large"
          style={{ marginTop: "20px" }}
          />
	  </Input.Group>
    </Container>
  );
};

export default signIn;
