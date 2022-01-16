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
    height: 70vh;
    overflow-x: hidden;
    overflow-y: scroll;
  `;
  const [data, setData] = useState([]);
  const [turnD2W] = useLazyQuery(FIND_D_BY_W);
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
        <List>
          <VirtualList data={data} itemHeight={40}>
            {(item) => {
              const onclick = async () => {
                setPage({
                  key: "document",
                  document: (await turnD2W(item.notif.workflowId)).data
                    .workflow[0].document,
                  workflow: item.notif.workflowId,
                });
              };
              return (
                <List.Item onClick={onclick} key={item.name}>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.name}
                  />
                </List.Item>
              );
            }}
          </VirtualList>
        </List>
      </Div>
    </>
  );
};

export default Notifications;
