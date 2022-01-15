import { Card, Input, Button, Space, Form, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import DragAndDrop from "../MainPage/dragAndDrop";

const { Title } = Typography;

const CreateWorkflow = ({ setPage, document}) => {
  const onFinish = (values) => {
    console.log("The values collected from the form are:", values);
  };
  return (
    <>
      <Card title="Create New Workflow" style={{ width: 800 }}>
        <Form name="Workflow" autoComplete="off" onFinish={onFinish}>
          <Form.Item>
            <DragAndDrop />
          </Form.Item>
          <Form.List name="Staff Members">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "Professor"]}
                      rules={[
                        { required: true, message: "Missing Professor field" },
                      ]}
                    >
                      <Input placeholder="Professor" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Staff
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Title> Attach comment</Title>
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
              <Button
                type="primary"
                onClick={() => setPage({key: "welcome"})}
                danger
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CreateWorkflow;
