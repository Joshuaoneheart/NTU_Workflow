import { useQuery } from "@apollo/client";
import { Typography, Timeline, Tag, List, Upload } from "antd";
import { DOCUMENT_QUERY, FIND_WORKFLOW } from "../../graphql/queries";
import "./Document.css";

const { Title, Paragraph } = Typography;
const DocumentPage = (props) => {
  const {data: workflow, loading} = useQuery(FIND_WORKFLOW, {variables: {id: props.workflow}});
  const {data: document, doc_loading} = useQuery(DOCUMENT_QUERY, {variables: {id: props.document}});
  console.log(props, workflow, document, doc_loading, loading)
  return (loading || doc_loading)? <p>Loading...</p>:(
    <>
      <Typography>
        <Title>Record for {document.document[0].title}<br />#{document.document[0].id}</Title>
        <Paragraph>{document.document[0].body}</Paragraph>
      </Typography>
      <List size="large" header={<Title level={4}>Content List</Title>}>
        {document.document[0].fields.map((datum, i) => {
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
        <Timeline.Item color="green">
          <Tag color="green">Pass</Tag>教授 呂XX
        </Timeline.Item>
        <Timeline.Item color="green">
          <Tag color="green">Pass</Tag>資工系辦 黃XX
        </Timeline.Item>
        <Timeline.Item color="blue">
          <Tag color="blue">In Process</Tag>資工系辦 周XX
        </Timeline.Item>
        <Timeline.Item color="gray">
          <Tag>Pending</Tag>資工系主任 洪XX
        </Timeline.Item>
        <Timeline.Item color="gray">
          <Tag>Pending</Tag>電資學院院長 張XX
        </Timeline.Item>
      </Timeline>
    </>
  );
};

export default DocumentPage;
