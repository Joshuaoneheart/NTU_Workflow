import { List, Avatar, Input, Space, AutoComplete, Skeleton } from "antd";
import VirtualList from "rc-virtual-list";
import { UserOutlined } from "@ant-design/icons";
import { ALL_USERS, FIND_CHATBOX_BY_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Messages = ({ user, setPage }) => {
  const [list_data, setListData] = useState([{ name: "loading", message: "" }]);
  const { data: users, loading } = useQuery(ALL_USERS);
  const [opt, setOpt] = useState();
  const [options, setOptions] = useState([
    { value: "loading...", label: "loading..." },
  ]);
  const {
    data: chatboxes,
    loading: chatbox_loading,
    error,
  } = useQuery(FIND_CHATBOX_BY_USER, { variables: { name: user.id } });
  useEffect(() => {
    if (!loading) {
      if (users && users.user) {
        setOptions(
          users.user.map((user, i) => {
            return { value: user.name, label: user.name, user: user };
          })
        );
      } else {
        setOptions([{ value: "No data", label: "No data" }]);
      }
    }
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
            console.log(opt);
            setOpt(option);
          }}
        >
          <Input.Search
            onSearch={() => {
              if (!options.find((option) => option.user.id == opt.user.id))
                setOptions([
                  ...options,
                  {
                    label: opt.user.name,
                    value: opt.user.name,
                    user: opt.user,
                  },
                ]);
              setPage({ key: "chatroom", chatroom: opt.user, refresh: true });
            }}
            placeholder="Search..."
          />
        </AutoComplete>
        {loading ? (
          <Skeleton avatar active />
        ) : (
          <List>
            <VirtualList data={list_data} itemHeight={40}>
              {(item) => (
                <List.Item
                  key={item.name}
                  onClick={() => {
                    if (!item.user) return;
                    setPage({ key: "chatroom", chatroom: item.user, refresh: true });
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
        )}
      </Space>
    </>
  );
};

export default Messages;
