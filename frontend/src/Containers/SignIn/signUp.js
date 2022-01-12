import { Space, Button, Card, Input, Select } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { hash } from "bcryptjs";
import "../../App.css";
import { SIGN_UP } from "../../graphql/mutation";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4, v4 } from "uuid";

const departments =
  "中國文學系,外國語文學系,歷史學系,哲學系,人類學系,圖書資訊學系,日本語文學系,戲劇學系,數學系,物理學系,化學系,地質科學系,心理學系,地理環境資源學系,大氣科學系,政治學系,經濟學系,社會學系,社會工作學系,醫學系,護理學系,學士後護理學系,醫學檢驗暨生物技術學系,物理治療學系,職能治療學系,牙醫學系,藥學系,土木工程學系,機械工程學系,化學工程學系,工程科學及海洋工程學系,材料科學與工程學系,醫學工程學系,農藝學系,生物環境系統工程學系,農業化學系,森林環境暨資源學系,動物科學技術學系,農業經濟學系,園藝暨景觀學系,生物產業傳播暨發展學系,生物機電工程學系,昆蟲學系,植物病理與微生物學系,獸醫學系,工商管理學系,會計學系,財務金融學系,國際企業學系,資訊管理學系,公共衛生學系,電機工程學系,資訊工程學系,法律學系,生命科學系,生化科技學系".split(
    ","
  );

const { Option } = Select;

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
  top: 15vh;
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
    else if (!user["department"])
      displayStatus({
        type: "error",
        msg: "Select a department",
      });
    else if (password !== confirmPass) {
      displayStatus({
        type: "error",
        msg: "Passwords are different",
      });
    } else {
      let salt = 0;
      const hashed_p = await hash(password, salt);
      let tmp = Object.assign({}, user);
      tmp["password"] = hashed_p;
      tmp["id"] = uuidv4();
      setUser(tmp);
      console.log(user);
      const { data: signUp_res, error: signUp_err } = await signUp({
        variables: user,
      });
      if (!signUp_err) {
        setUser(signUp_res.createUser);
        setSignedIn(true);
      } else
        displayStatus({
          type: "error",
          msg: signUp_err,
        });
    }
  };

  return (
    <Container>
      <div className="SignIn-title">
        <h1> Please sign up </h1>
      </div>
      <br />
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
        <Select
          size="large"
          showSearch
          style={{ width: "30vw", marginTop: "20px" }}
          onChange={(e) => {
            let tmp = Object.assign({}, user);
            tmp["department"] = e;
            setUser(tmp);
          }}
        >
          {departments.map((department, i) => (
            <Option value={department} key={i}>
              {department}
            </Option>
          ))}
        </Select>
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

export default SignUp;
