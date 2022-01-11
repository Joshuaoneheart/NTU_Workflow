import { List, message, Avatar } from "antd";
import VirtualList from "rc-virtual-list";
import { UserOutlined } from "@ant-design/icons";

let data = [
  { name: "Jenny is in love" },
  { name: "Peter is in love" },
  { name: "Doris is in love" },
  { name: "Hallena is in love" },
  { name: "Eileen is in love" },
  { name: "Joshua is in love" },
];

const Notifications = () => {
  return (
    <List>
      <VirtualList data={data} itemHeight={40}>
        {(item) => (
          <List.Item key={item.name}>
            <List.Item.Meta
              avatar={<Avatar src={UserOutlined} />}
              title={item.name}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default Notifications;
