import { Input, Button, Space, Form, Typography, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_GROUPS } from "../../graphql/queries";
import { CREATE_DOCUMENT } from "../../graphql/mutation";
import { useState } from "react";

const { Title } = Typography;

const CreateDocument = ({ setPage, displayStatus }) => {
  const { data, loading } = useQuery(ALL_GROUPS);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [approvalLine, setApproval] = useState([]);
  const [Fields, setFields] = useState([]);
  const [createDocument] = useMutation(CREATE_DOCUMENT);
  return (
    <>
      <Typography>
        <Title level={2}>Create a document</Title>
        <Form name="Document" autoComplete="off">
          <Title level={3}>Document Title</Title>
          <Form.Item name="title">
            <Input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Item>
          <Title level={3}>Document Description</Title>
          <Form.Item name="description">
            <Input.TextArea
              autoSize={{ minRows: 5 }}
              showCount
              maxLength={500}
              row={8}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
          </Form.Item>
          <Title level={3}>Required Fields</Title>
          <Form.List name="Fields">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, i) => (
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
                        <Select
                          onChange={(e) => {
                            let tmp = Array.from(Fields);
                            tmp[i].fieldType = e;
                            setFields(tmp);
                          }}
                          defaultValue="TEXT"
                        >
                          <Select.Option value="TEXT">Text</Select.Option>
                          <Select.Option value="IMAGE">Image</Select.Option>
                          <Select.Option value="FILE">File</Select.Option>
                        </Select>
                        <Input
                          onChange={(e) => {
                            let tmp = Array.from(Fields);
                            tmp[i].name = e.target.value;
                            setFields(tmp);
                          }}
                          placeholder="Field name"
                        />
                      </Space>
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        setFields([
                          ...Fields.slice(0, i),
                          ...Fields.slice(i + 1),
                        ]);
                        remove(name);
                      }}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      setFields([...Fields, { fieldType: "TEXT", name: "" }]);
                      add();
                    }}
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
                {fields.map(({ key, name, ...restField }, i) => (
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
                      <Select
                        onChange={(e) => {
                          let tmp = Array.from(approvalLine);
                          tmp[i] = data.findGroups[e];
                          setApproval(tmp);
                        }}
                        defaultValue={0}
                      >
                        {loading ? (
                          <Select.Option value={0}>loading...</Select.Option>
                        ) : (
                          data.findGroups.map((group, i) => (
                            <Select.Option value={i}>{group}</Select.Option>
                          ))
                        )}
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        setApproval([
                          ...approvalLine.slice(0, i),
                          ...approvalLine.slice(i + 1),
                        ]);
                        remove(name);
                      }}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      setApproval([...approvalLine, data.findGroups[0]]);
                      add();
                    }}
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
              <Button
                onClick={async () => {
                  await createDocument({variables: {title, body, fields: Fields, passBy: approvalLine}})
                  displayStatus({
                    type: "success",
                    msg: `Document ${title} created!`,
                  });
                  setPage({ key: "welcome" });
                }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setPage({ key: "welcome" });
                }}
                danger
              >
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
