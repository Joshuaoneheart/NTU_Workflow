// import logo from "./logo.svg";
import "./App.css";
import { message } from "antd";
import SignInPage from "./Containers/SignIn/signIn";
import Layout from "./Layout/layout";
import { useEffect, useState } from "react";
const LOCALSTORAGE_KEY_EM = "save-me";
const LOCALSTORAGE_KEY_PA = "save-pa";
function App() {
  const savedEmail = localStorage.getItem(LOCALSTORAGE_KEY_EM);
  const savedPassword = localStorage.getItem(LOCALSTORAGE_KEY_PA);
  const [user, setUser] = useState({ email: savedEmail || "" });
  const [password, setPassword] = useState(savedPassword || "");
  const [confirmPass, setConfirmPass] = useState("");
  const [signedIn, setSignedIn] = useState(true);
  const [isNew, setIsNew] = useState(false);
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
        <Layout
          user={user}
          setUser={setUser}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      ) : (
        <SignInPage
          user={user}
          isNew={isNew}
          password={password}
          confirmPass={confirmPass}
          setConfirmPass={setConfirmPass}
          setIsNew={setIsNew}
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
