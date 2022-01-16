import { List, Avatar, Input, Space, AutoComplete } from "antd";
import VirtualList from "rc-virtual-list";
import { UserOutlined } from "@ant-design/icons";
import { ALL_USERS, FIND_CHATBOX_BY_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Messages = ({ user, setPage }) => {
  const [list_data, setListData] = useState([{ name: "loading", message: "" }]);
  const { data: users, loading } = useQuery(ALL_USERS);
  const {
    data: chatboxes,
    loading: chatbox_loading,
    error
  } = useQuery(FIND_CHATBOX_BY_USER, { variables: { name: user.id } });
  console.log(users, chatboxes, error);
  const options = loading
    ? [{ value: "loading...", label: "loading..." }]
    : users && users.user
    ? users.user.map((user, i) => {
        return { value: user.name, label: user.name, user: user };
      })
    : [{ value: "No data", label: "No data" }];
  useEffect(() => {
    if (!chatbox_loading && !loading) {
      let new_list = [];
      for (let chatbox of chatboxes.chatBox) {
        const id = chatbox.name.startsWith(user.id)
          ? chatbox.name.split("_")[1]
          : chatbox.name.split("_")[0];
        let u = users.user.find((user) => user.id == id);
        new_list.push({
          name: u.name,
          message: chatbox.messages.length
            ? chatbox.messages[chatbox.messages.length - 1].body
            : "",
          user: u,
        });
      }
      setListData(new_list);
    }
  }, [chatbox_loading, loading]);
  return (
    <>
      <Space direction="vertical" size="large">
        <AutoComplete
          options={options}
          onSelect={(value, option) => {
            console.log(value, option);
          }}
        >
          <Input.Search placeholder="Search..." />
        </AutoComplete>
        <List
          onSelect={(e) => {
            console.log(e);
          }}
        >
          <VirtualList data={list_data} itemHeight={40}>
            {(item) => (
              <List.Item
                key={item.name}
                onClick={() => {
                  if (!item.user) return;
                  setPage({ key: "chatroom", chatroom: item.user });
                }}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={item.name}
                  description={item.message}
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
