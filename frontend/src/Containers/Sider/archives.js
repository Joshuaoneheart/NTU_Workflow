import { Badge, Card, Typography } from "antd";

const { Text } = Typography;
const archives = () => {
  return (
    <>
      <Badge.Ribbon text="approved" color="green">
        <Card>This is a card</Card>
      </Badge.Ribbon>
      <Badge.Ribbon text="pending" color="yellow">
        <Card>
          <Text type="warning">This is a card</Text>
        </Card>
      </Badge.Ribbon>
      <Badge.Ribbon text="rejected" color="red">
        <Card>
          <Text type="danger">This is a card</Text>
        </Card>
      </Badge.Ribbon>
    </>
  );
};

export default archives;
