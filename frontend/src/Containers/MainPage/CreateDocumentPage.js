import { Typography, Timeline, Tag, Button, List } from "antd";

const { Title, Paragraph } = Typography;

const DocumentPage = (props) => {
  const data = [
    { title: "I am happy", content: "Really" },
    { title: "No, you are dead.", content: "Haha" },
  ];
  return (
    <>
      <Typography>
        <Title>Record for #99999 停修單</Title>
        <Paragraph>This is an example of document description.</Paragraph>
      </Typography>
      <List size="large" header={<Title level={4}>Content List</Title>}>
        {data.map((datum, i) => {
          return (
            <List.Item>
              <Typography>
                <Title level={5}>{datum["title"]}</Title>
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
      <Button danger>Cancel</Button>
    </>
  );
};

export default DocumentPage;
