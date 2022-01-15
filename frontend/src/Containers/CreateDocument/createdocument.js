import { Input, Button, Space, Form, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import DragAndDrop from "../MainPage/dragAndDrop";

const { Title } = Typography;

const CreateDocument = ({ setPage }) => {
  const onFinish = (values) => {
    console.log("The values collected from the form are:", values);
  };
  return (
    <>
      <Typography>
        <Title level={2}>Create a document</Title>
        <Form name="Workflow" autoComplete="off" onFinish={onFinish}>
          <Form.Item>
            <DragAndDrop />
          </Form.Item>
          <Form.List name="Approval">
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
                      <Input placeholder="Group name" />
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
                    Add Approval Line
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                submit
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

export default CreateDocument;
