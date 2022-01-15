import { Empty, Button, Typography, Space } from "antd";

const {Paragraph, Title } = Typography;
const Welcome = ({setPage}) => {
	const onClick = () => {
		setPage({key: "createWorkflow"})
	}
  return (
    <>
			<Space direction="vertical" size="large">
      <Title style={{ textAlign: "center" }}> Welcome to NTU workflow </Title>
      <Empty description={<span>You have no workflow found.</span>}>
        <Button type="primary" onClick={onClick}> Create new workflow </Button>
      </Empty>
			<Title level={2} style={{ textAlign: "center"}}> What is NTU workflow about </Title>
			<Paragraph> 
				Well well well Idk anymore
			</Paragraph>
			</Space>
    </>
  );
};

export default Welcome;
