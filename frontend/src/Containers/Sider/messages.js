import { List, message, Avatar, Input, Space } from "antd";
import VirtualList from "rc-virtual-list";
import { UserOutlined } from "@ant-design/icons";

let data = [
  { name: "Jenny" },
  { name: "Peter" },
  { name: "Doris" },
  { name: "Hallena" },
  { name: "Eileen" },
  { name: "Joshua" },
];

const Messages = () => {
  return (
    <>
      <Space direction="vertical" size="large">
        <Input.Search placeholder="Search..." />
        <List>
          <VirtualList data={data} itemHeight={40}>
            {(item) => (
              <List.Item key={item.name}>
                <List.Item.Meta
                  avatar={<Avatar src={UserOutlined} />}
                  title={item.name}
                  description={item.name}
                />
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Space>
    </>
  );
};

export default Messages;
