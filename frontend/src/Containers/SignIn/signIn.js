import { Input, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../../App.css";
// import { useRef } from "react";

const signIn = ({
  user,
  password,
  setUser,
  setPassword,
  setSignedIn,
  displayStatus,
}) => {
  return (
    <>
      <div className="App-title">
        <h1> Please sign in </h1>
      </div>
      <UserOutlined size="large" />
      <Space direction="vertical">
        <Input.Search
          value={user}
          onChange={(e) => setUser(e.target.value)}
					onSearch={(name) => {
						if (!name) displayStatus({
								type: "error",
								msg: "UserName empty"
						})
						else setSignedIn(true);
					}}
          placeholder="input username"
          size="large"
          style={{ width: 300, margin: 50 }}
        />
        {
          // <Input.Password
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          // onSearch={(pass) => {
          // if (!pass || !user)
          // displayStatus({
          // type: "error",
          // msg: "Username or Password empty.",
          // });
          // else setSignedIn(true);
          // }}
          // placeholder="input password"
          // size="large"
          // style={{ width: 300, margin: 50 }}
          // />
        }
      </Space>
    </>
  );
};

export default signIn;
