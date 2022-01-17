import { List, message, Avatar, Badge, Radio, Space } from "antd";
import VirtualList from "rc-virtual-list";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FIND_D_BY_W } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const NotifyItem = ({ item, setPage }) => {
  const { data: doc, loading } = useQuery(FIND_D_BY_W, {
    variables: { id: item.notif.workflowId },
  });
  if(loading) return <p>Loading...</p>;
  return (
    <List.Item
      onClick={() => {
        setPage({
          key: "document",
          document: doc.workflow[0].document,
          workflow: item.notif.workflowId,
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
};

const Notifications = ({ notifs, loading, setPage }) => {
  const Div = styled.div`
    padding: 10px;
    width: 300px;
    height: 70vh;
    overflow-x: hidden;
    overflow-y: scroll;
  `;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!loading) {
      let tmp = [];
      for (let no of notifs.notification) {
        tmp = [
          {
            name: no.content,
            status: "NEW",
            notif: no,
          },
          ...tmp,
        ];
      }
      setData(tmp);
    }
  }, [notifs]);
  return (
    <>
      <Div>
        <List>
          <VirtualList data={data} itemHeight={40}>
            {(item) => {
              return <NotifyItem setPage={setPage} item={item} />;
            }}
          </VirtualList>
        </List>
      </Div>
    </>
  );
};

export default Notifications;
