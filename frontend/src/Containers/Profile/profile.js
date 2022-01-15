import { Avatar, Typography, Input, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Settings = ({data}) => {
  return (
    <>
      <Space
        direction="vertical"
        style={{
          userSelect: "none",
          alignItems: "center",
          margin: "20%",
          marginTop: "10%",
          marginBottom: "10%",
        }}
      >
        <Avatar size={64} icon={<UserOutlined />} />
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
      </Space>
    </>
  );
};

export default Settings;
