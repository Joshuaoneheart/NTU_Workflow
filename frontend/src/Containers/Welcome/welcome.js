import { Empty, Button, Typography, Space } from "antd";

const { Paragraph, Title, Text } = Typography;
const Welcome = ({ setPage }) => {
  const onClick = () => {
    setPage({ key: "createWorkflow" });
  };
  return (
    <>
      <Space direction="vertical" size="large">
        <Title style={{ textAlign: "center" }}> Welcome to NTU workflow </Title>
        <Empty description={<span>You have no workflow found.</span>}>
          <Button type="primary" onClick={onClick}>
            Create new workflow
          </Button>
        </Empty>
        <Title level={2} style={{ textAlign: "center" }}>
          What is NTU workflow about?
        </Title>
        <Paragraph>
          <b>NTU Workflow</b> is an auxiliary workflow system for facilitating
          the administrative work in National Taiwan University. The users are
          able to create and edit administrative documents such as Scholarship
          applications or Club Activities applications directly from their
          devices.
        </Paragraph>
        <Title level={3} style={{ textAlign: "center" }}>
          How to Use?
        </Title>
        <Paragraph>
          <b>1.</b> Staff members are able to create documents(<i>templates</i>)
          for student users to use a workflow.
          <br />
          <b>2.</b> Students in return are able to apply and fill in those
          documents with respect to their positions and needs
          <br />
          <b>3.</b> Those documents, later, will go through an approval line
          which can either ACCEPT or REJECT the said request.
          <br />
          <b>4.</b> The verdict of the approval line is later sent to the
          student.
          <br />
          <Text type="secondary" style={{ fontSize: "0.9em" }}>
            <b>Note</b>. If any member of the approval rejects the document or
            application, the whole process is the rejected
          </Text>
        </Paragraph>
        <Title level={3} style={{ textAlign: "center" }}>
          Video Demo
        </Title>
        <iframe
          src="https://www.youtube.com/embed/1jSEVNtvhAU"
          title="Demo video"
          style={{ marginLeft: "35%", width: "420px", height: "315px" }}
        ></iframe>
      </Space>
    </>
  );
};

export default Welcome;
