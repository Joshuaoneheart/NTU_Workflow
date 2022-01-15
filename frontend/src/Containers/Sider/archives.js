import {
  Typography,
  Badge,
  Button,
  Card,
  Cascader,
  Divider,
  Radio,
  Space,
} from "antd";
import { useState } from "react";
import styled from "styled-components";

const { Text } = Typography;
const data = [
  {
    content: "This is a card",
    status: "APPROVED",
    date: "2022-1-13",
  },
  {
    content: "This is not a card",
    status: "REJECTED",
    date: "2021-3-29",
  },
  {
    content: "That is a card",
    status: "PENDING",
    date: "2021-1-24",
  },
  {
    content: "This isn't a card",
    status: "REJECTED",
    date: "2022-1-14",
  },
  {
    content: "This should be a card",
    status: "PENDING",
    date: "2022-2-24",
  },
  {
    content: "This is a card or is it?",
    status: "APPROVED",
    date: "2022-1-24",
  },
];
const optionLists = [
  {
    value: "停修單",
    label: "停修單",
  },
  {
    value: "活動申請單",
    label: "活動申請單",
  },
  {
    value: "獎學金申請單",
    label: "獎學金申請單",
  },
];
const Archives = ({ setPage }) => {
  const [filter, setFilter] = useState("All");
  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const convert = (a) => {
    switch (a) {
      case "APPROVED":
        return { text: a.toLowerCase(), color: "green" };
      case "PENDING":
        return { text: a.toLowerCase(), color: "yellow" };
      case "REJECTED":
        return { text: a.toLowerCase(), color: "red" };
    }
  };
  const Div = styled.div`
    padding: 10px;
    width: 300px;
    height: 50vh;
    overflow-x: hidden;
    overflow-y: scroll;
  `;

  const dropdownRender = (menus) => {
    return (
      <>
        {menus}
        <Divider style={{ margin: 0 }} />
      </>
    );
  };
  return (
    <>
      <Space direction="vertical" size="large">
        <Space>
          <Cascader
            options={optionLists}
            dropdownRender={dropdownRender}
            placeholder="Select Workflow"
          />
          <Button
            type="primary"
            onClick={() => {
              setPage({ key: "createWorkflow" });
            }}
          >
            Create
          </Button>
        </Space>
        <Radio.Group onChange={onFilterChange} value={filter}>
          <Radio value="All">All</Radio>
          <Radio value="approved">Approved</Radio>
          <Radio value="pending">Pending</Radio>
          <Radio value="rejected">Rejected</Radio>
        </Radio.Group>
        <Div>
          {data.map((archive) => {
            const { text, color } = convert(archive.status);
            if (filter === "All") {
              return (
                <Badge.Ribbon text={text} color={color}>
                  <br />
                  <Card>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text>{archive.content}</Text>
                      <Text type="secondary" style={{ float: "right" }}>
                        {archive.date}
                      </Text>
                    </Space>
                  </Card>
                </Badge.Ribbon>
              );
            } else {
              if (filter === text) {
                return (
                  <Badge.Ribbon text={text} color={color}>
                    <Card>
                      <br />
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Text>{archive.content}</Text>
                        <Text type="secondary" style={{ float: "right" }}>
                          {archive.date}
                        </Text>
                      </Space>
                    </Card>
                  </Badge.Ribbon>
                );
              }
            }
          })}
        </Div>
      </Space>
    </>
  );
};

export default Archives;
