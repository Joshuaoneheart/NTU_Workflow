// import logo from "./logo.svg";
import "./App.css";
import { message } from "antd";
import SignInPage from "./Containers/SignIn/signIn";
import MainPage from "./Containers/MainPage/mainPage";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = { content: msg, duration: 0.5 };
      switch (type) {
        case "success":
          message.success(content);
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };
  useEffect(() => {
    console.log(signedIn, user);
  }, [signedIn, user]);

  return (
    <>
      {signedIn === true ? (
        <MainPage user={user} />
      ) : (
        <SignInPage
          user={user}
          password={password}
          setUser={setUser}
          setPassword={setPassword}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      )}
    </>
  );
}

export default App;
