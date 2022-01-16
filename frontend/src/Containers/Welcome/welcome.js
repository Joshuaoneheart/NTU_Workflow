import { Empty, Button, Typography, Space } from "antd";

const { Paragraph, Title, Text } = Typography;
const Welcome = ({ setPage, user, setJump }) => {
  const contentType = user.role === "student" ? "workflow" : "document";
  const onClick = () => {
    if (user.role === "student") setJump(true);
    else setPage({ key: "createDocument", refresh: true });
  };
  return (
    <>
      <Space direction="vertical" size="large">
        <Title style={{ textAlign: "center" }}> Welcome to NTU workflow </Title>
        {user.role === "student" && (
          <div style={{ textAlign: "center" }}>
            <Button type="primary" onClick={onClick}>
              Create new {contentType}
            </Button>
          </div>
        )}
        {user.role !== "student" && (
          <div style={{ textAlign: "center" }}>
            <Button type="primary" onClick={onClick} size="large">
              Create new {contentType}
            </Button>
          </div>
        )}
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
            application, the whole process is then rejected
          </Text>
        </Paragraph>
        <Title level={3} style={{ textAlign: "center" }}>
          Video Demo
        </Title>
        <div style={{ textAlign: "center" }}>
          <iframe
            src="https://www.youtube.com/embed/ohI_k-8wt_w"
            title="Demo video"
            style={{ width: "30vw", height: "25vw" }}
          ></iframe>
        </div>
      </Space>
    </>
  );
};

export default Welcome;
