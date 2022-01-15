import { Input, Button, Space, Form, List, Typography, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import DragAndDrop from "../MainPage/dragAndDrop";
import { useQuery } from "@apollo/client";
import { DOCUMENT_QUERY } from "../../graphql/queries";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const CreateWorkflow = ({ setPage, document }) => {
  /*const { data, loading } = useQuery(DOCUMENT_QUERY, {
    variable: { id: document.id },
  });*/
  const onFinish = (values) => {
    console.log("The values collected from the form are:", values);
    // setPage({key: "document", document: });
  };
  const passBy = ["學務處"];
  return (
    <>
      <Typography>
        <Title level={2}>Create a workflow</Title>
        <Form name="Workflow" autoComplete="off" onFinish={onFinish}>
          <List>
            <List.Item>
              <Typography>
                <Title level={3}>停修單#9999</Title>
                <Paragraph>有課當停直需停</Paragraph>
              </Typography>
            </List.Item>
            <List.Item>
              <Typography style={{ width: "100%" }}>
                <Title level={4}>停修原因</Title>
                <Form.Item>
                  <TextArea
                    autoSize={{ minRows: 3 }}
                    showCount
                    maxLength={500}
                    row={8}
                  />
                </Form.Item>
              </Typography>
            </List.Item>
            <List.Item>
              <Typography style={{ width: "100%" }}>
                <Title level={4}>停修單掃描檔</Title>
                <Form.Item>
                  <DragAndDrop />
                </Form.Item>
              </Typography>
            </List.Item>
            <List.Item>
              <Typography style={{ width: "100%" }}>
                <Title level={4}>Approval Line</Title>
                {passBy.map((approval, i) => (
                  <Form.Item key={i} label={approval} name={`${approval}-${i}`}>
                    <Select>
                      <Option value={"我"}>我</Option>
                    </Select>
                  </Form.Item>
                ))}
              </Typography>
            </List.Item>
          </List>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
              <Button type="primary" onClick={() => {}} danger>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Typography>
    </>
  );
};

export default CreateWorkflow;
