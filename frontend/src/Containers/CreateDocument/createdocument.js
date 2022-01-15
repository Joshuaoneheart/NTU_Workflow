import { Input, Button, Space, Form, Typography, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { ALL_GROUPS } from "../../graphql/queries";

const { Title } = Typography;

const CreateDocument = ({ setPage, displayStatus }) => {
  const { data, loading } = useQuery(ALL_GROUPS);
  const onFinish = (values) => {
    console.log("The values collected from the form are:", values);
  };
  return (
    <>
      <Typography>
        <Title level={2}>Create a document</Title>
        <Form name="Document" autoComplete="off" onFinish={onFinish}>
          <Title level={3}>Document Title</Title>
          <Form.Item name="title">
            <Input />
          </Form.Item>
          <Title level={3}>Document Description</Title>
          <Form.Item name="description">
            <Input.TextArea
              autoSize={{ minRows: 5 }}
              showCount
              maxLength={500}
              row={8}
            />
          </Form.Item>
          <Title level={3}>Required Fields</Title>
          <Form.List name="Fields">
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
                      <Space>
                        <Select defaultValue="TEXT">
                          <Select.Option value="TEXT">Text</Select.Option>
                          <Select.Option value="IMAGE">Image</Select.Option>
                          <Select.Option value="FILE">File</Select.Option>
                        </Select>
                        <Input placeholder="Field name" />
                      </Space>
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
                    Add Field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Title level={3}>Approval Line</Title>
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
                      <Select defaultValue={0}>
                        {(loading)?<Select.Option value={0}>loading...</Select.Option>:data.findGroups.map((group, i) => (
                          <Select.Option value={i}>{group}</Select.Option>
                        ))}
                      </Select>
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
