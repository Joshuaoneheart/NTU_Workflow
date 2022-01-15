import { Typography, Input, Space } from "antd";

const { Title } = Typography;
const data = {
  name: "Joshua",
  email: "noone@csie.ntu.edu.tw",
  id: "B09877221",
  department: "CSIE",
  groups: "student",
};

const Settings = () => {
  return (
    <>
      <Title>{data.name}</Title>
      <Space direction="vertical" style={{ userSelect: "none" }}>
        <Input addonBefore="email" title="email" value={data.email} />
        <Input addonBefore="id" title="id" value={data.id} />
        <Input addonBefore="groups" title="groups" value={data.groups} />
        <Input
          addonBefore="department"
          title="department"
          value={data.department}
        />
      </Space>
    </>
  );
};

export default Settings;
