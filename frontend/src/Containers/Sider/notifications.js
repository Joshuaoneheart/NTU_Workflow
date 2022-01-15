import { List, message, Avatar, Badge, Radio } from "antd";
import VirtualList from "rc-virtual-list";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

let data = [
  { name: "Jenny is in love", status: "NEW" },
  { name: "Peter is in love", status: "OLD" },
  { name: "Doris is in love", status: "OLD" },
  { name: "Hallena is in love", status: "NEW" },
  { name: "Eileen is in love", status: "NEW" },
  { name: "Joshua is in love", status: "OLD" },
];

const Notifications = () => {
  const [filter, setFilter] = useState("All");
  const onFilterChange = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };
  return (
    <>
      <Radio.Group onChange={onFilterChange} value={filter}>
        <Radio value="All">All</Radio>
        <Radio value="NEW">New</Radio>
        <Radio value="OLD">Old</Radio>
      </Radio.Group>
      <List>
        <VirtualList data={data} itemHeight={40}>
          {(item) => {
            if (filter === "All") {
              return (
                <List.Item key={item.name}>
                  <List.Item.Meta
                    avatar={<Avatar src={UserOutlined} />}
                    title={item.name}
                  />
                  <Badge count={item.status === "NEW" ? 1 : 0} />
                </List.Item>
              );
            } else {
              console.log(filter, item.status);
              return (
                <List.Item
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
    </>
  );
};

export default Notifications;
