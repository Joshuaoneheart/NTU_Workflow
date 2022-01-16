import { Avatar, Space, Button, Card, Input, Select } from "antd";
import { MailOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { hash } from "bcryptjs";
import "../../App.css";
import { SIGN_UP } from "../../graphql/mutation";
import { useMutation } from "@apollo/client";
const LOCALSTORAGE_KEY_EM = "save-me";
const LOCALSTORAGE_KEY_PA = "save-pa";

const departments = {
  101: "中國文學系",
  102: "外國語文學系",
  103: "歷史學系",
  104: "哲學系",
  105: "人類學系",
  106: "圖書資訊學系",
  107: "日本語文學系",
  109: "戲劇學系",
  201: "數學系",
  202: "物理學系",
  203: "化學系",
  204: "地質科學系",
  207: "心理學系",
  208: "地理環境資源學系",
  209: "大氣科學系",
  302: "政治學系",
  303: "經濟學系",
  305: "社會學系",
  310: "社會工作學系",
  401: "醫學系",
  406: "護理學系",
  404: "醫學檢驗暨生物技術學系",
  408: "物理治療學系",
  409: "職能治療學系",
  402: "牙醫學系",
  403: "藥學系",
  501: "土木工程學系",
  502: "機械工程學系",
  504: "化學工程學系",
  505: "工程科學及海洋工程學系",
  507: "材料科學與工程學系",
  508: "醫學工程學系",
  601: "農藝學系",
  602: "生物環境系統工程學系",
  603: "農業化學系",
  605: "森林環境暨資源學系",
  606: "動物科學技術學系",
  607: "農業經濟學系",
  608: "園藝暨景觀學系",
  610: "生物產業傳播暨發展學系",
  611: "生物機電工程學系",
  612: "昆蟲學系",
  613: "植物病理與微生物學系",
  609: "獸醫學系",
  701: "工商管理學系",
  702: "會計學系",
  703: "財務金融學系",
  704: "國際企業學系",
  705: "資訊管理學系",
  801: "公共衛生學系",
  901: "電機工程學系",
  902: "資訊工程學系",
  A01: "法律學系",
  B01: "生命科學系",
  B02: "生化科技學系",
};

const Container = styled(Card)`
  position: absolute;
  width: 50vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1vh;
  height: 70vh;
  top: 10vh;
  left: 25vw;
  box-shadow: 0px 0px 1px black;
`;

const SignUp = ({
  user,
  password,
  salt,
  confirmPass,
  isNew,
  setIsNew,
  setUser,
  setPassword,
  setConfirmPass,
  setSignedIn,
  displayStatus,
}) => {
  const [signUp] = useMutation(SIGN_UP);
  const handleCancel = () => {
    setPassword("");
    setConfirmPass("");
    setIsNew(false);
  };
  const handleSignUp = async () => {
    if (!password || !confirmPass)
      displayStatus({
        type: "error",
        msg: "Password empty",
      });
    else if (!user["name"])
      displayStatus({
        type: "error",
        msg: "Username empty",
      });
    else if (!user["email"])
      displayStatus({
        type: "error",
        msg: "Email empty",
      });
    else if (!user["id"])
      displayStatus({
        type: "error",
        msg: "Student ID empty",
      });
    else if (password !== confirmPass) {
      displayStatus({
        type: "error",
        msg: "Passwords are different",
      });
    } else {
      localStorage.setItem(LOCALSTORAGE_KEY_EM, user["email"]);
      localStorage.setItem(LOCALSTORAGE_KEY_PA, password);
      const hashed_p = await hash(password, salt);
      let tmp = Object.assign({}, user);
      tmp["password"] = hashed_p;
      const department = departments[tmp["id"].substr(3, 3)];
      if (!department) {
        displayStatus({
          type: "error",
          msg: "Wrong Student ID format",
        });
      }
      tmp["department"] = department;
      try {
        const { data: signUp_res } = await signUp({
          variables: tmp,
        });
        setSignedIn(true);
        setUser(signUp_res.createUser);
      } catch (e) {
        displayStatus({
          type: "error",
          msg: e.message,
        });
      }
    }
  };

  return (
    <Container>
      <Space direction="vertical" size="large">
        <div
          style={{
            height: "31px",
            fontFamily: "Bebas Neue, cursive",
            fontSize: "47px",
            textAlign: "center",
          }}
        >
          NTU WORKFLOW
        </div>
				<br />
				<Avatar size={64} icon={<UserOutlined />} />
        <Input.Group compact style={{ width: "30vw" }}>
          <Input
            value={user["name"]}
            prefix={<UserOutlined size="large" />}
            onChange={(e) => {
              let tmp = Object.assign({}, user);
              tmp["name"] = e.target.value;
              setUser(tmp);
            }}
            placeholder="Enter username here"
            size="large"
            style={{ marginTop: "20px" }}
          />
          <Input
            value={user["id"]}
            prefix={<ReadOutlined size="large" />}
            onChange={(e) => {
              let tmp = Object.assign({}, user);
              tmp["id"] = e.target.value;
              setUser(tmp);
            }}
            placeholder="Enter student id here"
            size="large"
            style={{ marginTop: "20px" }}
          />
          <Input
            value={user["email"]}
            prefix={<MailOutlined size="large" />}
            onChange={(e) => {
              let tmp = Object.assign({}, user);
              tmp["email"] = e.target.value;
              setUser(tmp);
            }}
            placeholder="Enter email here"
            size="large"
            style={{ marginTop: "20px" }}
          />
          <Input.Password
            value={password}
						prefix={<KeyOutlined size="large" />}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password here"
            size="large"
            style={{ marginTop: "20px" }}
          />
          <Input.Password
            value={confirmPass}
						prefix={<KeyOutlined size="large" />}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Re-enter password here"
            size="large"
            style={{ marginTop: "20px" }}
          />
        </Input.Group>
        <Space>
          <Button type="primary" onClick={handleSignUp}>
            Sign up
          </Button>
          <Button type="primary" onClick={handleCancel} danger>
            Cancel
          </Button>
        </Space>
      </Space>
    </Container>
  );
};

export default SignUp;
