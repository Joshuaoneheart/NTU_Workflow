import { Button, Card, Input, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { hash } from "bcryptjs";
import "../../App.css";
import SignUp from "./signUp";
import { SALT_QUERY, SIGN_IN } from "../../graphql/queries";
import { useQuery, useLazyQuery } from "@apollo/client";
const LOCALSTORAGE_KEY_EM = "save-me";
const LOCALSTORAGE_KEY_PA = "save-pa";

const Container = styled(Card)`
  position: absolute;
  width: 50vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3vh;
  height: 70vh;
  top: 17.5vh;
  left: 25vw;
  box-shadow: 0px 0px 1px black;
`;

const SignIn = ({
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
  const { data: salt, error, loading } = useQuery(SALT_QUERY);
  const [signIn] = useLazyQuery(SIGN_IN);
  const handleSignUp = async () => {
    setPassword("");
    setConfirmPass("");
    setIsNew(true);
  };
  const handleSignIn = async () => {
    if (!user || !password) {
      displayStatus({
        type: "error",
        msg: "Username or Password empty",
      });
    } else {
      localStorage.setItem(LOCALSTORAGE_KEY_EM, user["email"]);
      localStorage.setItem(LOCALSTORAGE_KEY_PA, password);
      const hashed_p = await hash(password, salt.salt);
      try {
        const {data: signIn_res, error: signIn_error} = await signIn({
          variables: { email: user["email"], password: hashed_p },
        });
        if(signIn_error){
          for(const error of signIn_error.graphQLErrors){
            displayStatus({
              type: "error",
              msg: error.message,
            });
          }
          return;
        }
        setUser(signIn_res.signIn);
        setSignedIn(true);
      } catch (e) {
        displayStatus({
          type: "error",
          msg: e.message,
        });
      }
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
              value={user["email"]}
              prefix={<MailOutlined size="large" />}
              onChange={(e) => {
                let tmp = Object.assign({}, user);
                tmp.email = e.target.value;
                setUser(tmp);
              }}
              placeholder="Enter email here"
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
          salt={salt ? salt.salt : ""}
          password={password}
          confirmPass={confirmPass}
          isNew={isNew}
          setUser={setUser}
          setPassword={setPassword}
          setConfirmPass={setConfirmPass}
          setIsNew={setIsNew}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      )}
    </>
  );
};

export default SignIn;
