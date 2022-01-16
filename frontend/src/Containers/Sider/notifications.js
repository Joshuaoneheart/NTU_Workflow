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
    const handleData = async () => {
      if (!loading) {
        let tmp = [];
        for (let no of notifs.notification) {
          tmp = [
            {
              name: no.content,
              status: "NEW",
              notif: no,
              doc: (await turnD2W(no.workflowId)).data.workflow[0].document,
            },
            ...tmp,
          ];
        }
        setData(tmp);
      }
    };
    handleData();
  }, [notifs]);
  return (
    <>
      <Div>
        <List>
          <VirtualList data={data} itemHeight={40}>
            {(item) => {
              return (
                <List.Item
                  onClick={() => {
                    setPage({
                      key: "document",
                      document: item.doc,
                      workflow: item.notif.workflowId,
                      refresh: true,
                    });
                  }}
                  key={item.name}
                >
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
