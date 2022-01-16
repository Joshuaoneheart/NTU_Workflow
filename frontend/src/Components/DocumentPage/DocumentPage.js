import { useMutation, useQuery } from "@apollo/client";
import { Typography, Timeline, Tag, List, Upload, Button } from "antd";
import { useEffect, useState } from "react";
import { DECLINE_WORKFLOW } from "../../graphql/mutation";
import {
  DOCUMENT_QUERY,
  FIND_WORKFLOW,
  ALL_USERS,
} from "../../graphql/queries";
import "./Document.css";

const { Title, Paragraph } = Typography;
const DocumentPage = (props) => {
  const { data: workflow, loading } = useQuery(FIND_WORKFLOW, {
    variables: { id: props.workflow },
  });
  const { data: document, doc_loading } = useQuery(DOCUMENT_QUERY, {
    variables: { id: props.document },
  });
  const { data: users, user_loading } = useQuery(ALL_USERS);
  const [status, setStatus] = useState([]);
  const [decline] = useMutation(DECLINE_WORKFLOW);
  console.log(document, workflow);
  useEffect(() => {
    if (!loading) {
      let first = false;
      let tmp = [];
      for (let a of workflow.workflow[0].approvalLine) {
        if (!first && a.status == "PENDING")
          tmp.push({ color: "blue", body: "In Progress" });
        else if (a.status == "PENDING")
          tmp.push({ color: "blue", body: "Pending" });
        else if (a.status == "ACCEPT")
          tmp.push({ color: "green", body: "Pass" });
        else tmp.push({ color: "red", body: "Rejected" });
      }
      console.log(tmp);
      setStatus(tmp);
    }
  }, [loading]);
  return loading || doc_loading || user_loading || !status.length ? (
    <p>Loading...</p>
  ) : (
    <>
      <Typography>
        <Title>
          Record for {document.document[0].title}
          <br />#{document.document[0].id}
        </Title>
        <Paragraph>{document.document[0].body}</Paragraph>
      </Typography>
      <List size="large" header={<Title level={4}>Content List</Title>}>
        {document.document[0].fields.map((datum, i) => {
          let content = workflow.workflow[0].contents[i];
          return (
            <List.Item key={i}>
              <Typography>
                <Title level={5}>{datum["name"]}</Title>
                <Paragraph>{datum["content"]}</Paragraph>
              </Typography>
            </List.Item>
          );
        })}
      </List>
      <br />
      <Timeline>
        {document.document[0].passBy.map((approval, i) => {
          const meta = workflow.workflow[0].approvalLine[i];
          let name = users.user.find((user) => user.id === meta.staff).name;
          return (
            <Timeline.Item color={status[i].color}>
              <Tag color={status[i].color}>{status[i].body}</Tag>
              {approval} {name}
            </Timeline.Item>
          );
        })}
      </Timeline>
      <Button
        danger
        onClick={async () => {
          await decline({ variables: { id: props.workflow } });
        }}
      >
        Cancel
      </Button>
    </>
  );
};

export default DocumentPage;
