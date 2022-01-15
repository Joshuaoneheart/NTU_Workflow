import { List, Avatar, Input, Space, AutoComplete } from "antd";
import VirtualList from "rc-virtual-list";
import { UserOutlined } from "@ant-design/icons";
import { ALL_USERS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

let data = [
  { name: "Jenny" },
  { name: "Peter" },
  { name: "Doris" },
  { name: "Hallena" },
  { name: "Eileen" },
  { name: "Joshua" },
];

const Messages = () => {
  const { data: users, loading } = useQuery(ALL_USERS);
  console.log(users)
  const options = loading
    ? [{ value: "loading...", label: "loading..." }]
    : (users && users.user)
    ? users.user.map((user, i) => {
        return { value: user.id, label: user.name };
      })
    : [{ value: "No data", label: "No data" }];
  return (
    <>
      <Space direction="vertical" size="large">
        <AutoComplete options={options}>
          <Input.Search placeholder="Search..." />
        </AutoComplete>
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
