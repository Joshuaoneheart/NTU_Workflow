import { useQuery } from "@apollo/client";
import {
  Typography,
  Badge,
  Button,
  Card,
  Cascader,
  Divider,
  Radio,
  Space,
  Skeleton,
} from "antd";
import { useState } from "react";
import styled from "styled-components";
import { ALL_DOCUMENTS, WORKFLOW_QUERY } from "../../graphql/queries";
import moment from "moment";

const { Text } = Typography;

const Archives = ({ setPage, user }) => {
  const [filter, setFilter] = useState("All");
  const { data: documents, loading } = useQuery(ALL_DOCUMENTS);
  const { data: workflows, loading: workflow_loading } = useQuery(
    WORKFLOW_QUERY,
    { variables: { id: user.id } }
  );
  const [doc_id, setDoc] = useState();
  const optionLists = loading
    ? [{ value: "loading...", label: "loading..." }]
    : !documents.document.length
    ? [{ value: "No data", label: "No data" }]
    : documents.document.map((d, i) => {
        return { value: d["id"], label: d["title"] };
      });
  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const convert = (a) => {
    switch (a) {
      case "ACCEPT":
        return { text: a.toLowerCase(), color: "green" };
      case "PENDING":
        return { text: a.toLowerCase(), color: "yellow" };
      case "DECLINE":
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
        {user.role === "student" ? (
          <>
            <Space>
              <Cascader
                options={optionLists}
                dropdownRender={dropdownRender}
                placeholder="Select Workflow"
                onChange={(values) => {
                  setDoc(values[0]);
                }}
              />
              <Button
                type="primary"
                onClick={() => {
                  setPage({ key: "createWorkflow", document: doc_id });
                }}
              >
                Create
              </Button>
            </Space>
            <Radio.Group onChange={onFilterChange} value={filter}>
              <Radio value="All">All</Radio>
              <Radio value="accept">Accept</Radio>
              <Radio value="pending">Pending</Radio>
              <Radio value="decline">Decline</Radio>
            </Radio.Group>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              onClick={() => {
                setPage({
                  key: "createDocument",
                  document: doc_id,
                });
              }}
            >
              Create
            </Button>
          </div>
        )}
        <Div>
          {workflow_loading || loading ? (
            <Skeleton active />
          ) : (
            workflows.workflow.map((archive) => {
              const { text, color } = convert(archive.status);
              let content = documents.document.find(
                (d) => d.id === archive.document
              ).title;
              if (filter === "All") {
                return (
                  <Badge.Ribbon text={text} color={color}>
                    <br />
                    <Card
                      onClick={() => {
                        setPage({
                          key: "document",
                          document: archive.document,
                          workflow: archive.id,
                        });
                      }}
                    >
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Text>{content}</Text>
                        <Text type="secondary" style={{ float: "right" }}>
                          {moment(archive.date).fromNow()}
                        </Text>
                      </Space>
                    </Card>
                  </Badge.Ribbon>
                );
              } else {
                if (filter === text) {
                  return (
                    <Badge.Ribbon text={text} color={color}>
                      <Card
                        onClick={() => {
                          setPage({ key: "document", document: archive.id });
                        }}
                      >
                        <br />
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <Text>{content}</Text>
                          <Text type="secondary" style={{ float: "right" }}>
                            {moment(archive.date).fromNow()}
                          </Text>
                        </Space>
                      </Card>
                    </Badge.Ribbon>
                  );
                }
              }
            })
          )}
        </Div>
      </Space>
    </>
  );
};

export default Archives;
