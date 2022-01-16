import { List, message, Avatar, Badge, Radio, Space } from "antd";
import VirtualList from "rc-virtual-list";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FIND_D_BY_W } from "../../graphql/queries";
import { useLazyQuery } from "@apollo/client";
const Notifications = ({ notifs, loading, setPage }) => {
  const Div = styled.div`
    padding: 10px;
    width: 300px;
    height: 50vh;
    overflow-x: hidden;
    overflow-y: scroll;
  `;
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState([]);
  const [turnD2W] = useLazyQuery(FIND_D_BY_W);
  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    if (!loading) {
      let tmp = [];
      for (let no of notifs.notification) {
        tmp.push({ name: no.content, status: "NEW", notif: no });
      }
      setData(tmp);
    }
  }, [loading]);
  return (
    <>
      <Div>
        <Space direction="vertical" size="large">
          <Radio.Group onChange={onFilterChange} value={filter}>
            <Radio value="All">All</Radio>
            <Radio value="NEW">New</Radio>
            <Radio value="OLD">Old</Radio>
          </Radio.Group>
          <List>
            <VirtualList data={data} itemHeight={40}>
              {(item) => {
                const onclick = async () => {
                  setPage({
                    key: "document",
                    document: (await turnD2W(item.notif.workflowId)).data.workflow[0].document,
                    workflow: item.notif.workflowId,
                  });
                };
                if (filter === "All") {
                  return (
                    <List.Item onClick={onclick} key={item.name}>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={item.name}
                      />
                      <Badge count={item.status === "NEW" ? 1 : 0} />
                    </List.Item>
                  ); 
                } else {
                  return (
                    <List.Item
                      onClick={onclick}
                      key={item.name}
                      style={item.status !== filter ? { display: "none" } : {}}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={UserOutlined} />}
                        title={item.name}
                      />
                      <Badge count={item.status === "NEW" ? 1 : 0} />
                    </List.Item>
                  );
                }
              }}
            </VirtualList>
          </List>
        </Space>
      </Div>
    </>
  );
};

export default Notifications;
