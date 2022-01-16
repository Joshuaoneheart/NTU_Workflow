import { Input, Button, Space, Form, List, Typography, Select } from "antd";
import DragAndDrop from "../MainPage/dragAndDrop";
import { useMutation, useQuery } from "@apollo/client";
import { DOCUMENT_QUERY, FIND_USERS_BY_GROUP } from "../../graphql/queries";
import {
  CREATE_WORKFLOW,
  UPLOAD_FILE,
  UPLOAD_TEXT,
} from "../../graphql/mutation";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const GroupSelect = ({ group, onChange }) => {
  const {
    data: candidate,
    error,
    loading,
  } = useQuery(FIND_USERS_BY_GROUP, { variables: { groups: group } });
  const options = loading
    ? [{ value: "loading...", label: "loading..." }]
    : candidate.user.map((u, i) => {
        return { value: u.id, label: u.name };
      });
  return (
    <Select onChange={onChange}>
      {options.map((option, i) => (
        <Option key={i} value={option["value"]}>
          {option["label"]}
        </Option>
      ))}
    </Select>
  );
};

const CreateWorkflow = ({ setPage, user, document, displayStatus }) => {
  const {
    data: doc,
    loading,
    error,
  } = useQuery(DOCUMENT_QUERY, {
    variable: { id: document },
  });
  let [approvals, setApprovals] = useState([]);
  let [contents, setContents] = useState({ file: [], image: [], text: [] });
  const [createWorkflow] = useMutation(CREATE_WORKFLOW);
  const [uploadText] = useMutation(UPLOAD_TEXT);
  const onFinish = async (values) => {
    let tmp = { file: [], image: [], text: [] };
    for (let content of contents) {
      if (content.type == "TEXT") {
        tmp["text"].push(
          (await uploadText({ variables: { text: content.content } })).data
            .uploadTEXT
        );
      } else if (content.type == "IMAGE") tmp.image.push(content.content);
      else tmp.file.push(content.content);
    }
    const id = await createWorkflow({
      variables: {
        document,
        contents: tmp,
        student: user.id,
        approvalLine: approvals,
      },
    });
    setPage({ key: "document", document: id.data.createWorkflow.id });
  };
  useEffect(() => {
    if (!loading) {
      let tmp = [];
      for (let field of doc.document[0].fields) {
        tmp.push({ type: field.fieldType, content: "" });
      }
      setContents(tmp);
    }
  }, [loading]);
  if (error) {
    for (const err of error.graphQLErrors) {
      displayStatus({
        type: "error",
        msg: err.message,
      });
    }
    return <p>Error</p>;
  }
  if (loading) return <p>loading...</p>;
  return (
    <>
      <Typography>
        <Title level={2}>Create a workflow</Title>
        <Form name="Workflow" autoComplete="off" onFinish={onFinish}>
          <List>
            <List.Item>
              <Typography>
                <Title level={3}>
                  {doc.document[0].title}#{doc.document[0].id}
                </Title>
                <Paragraph>{doc.document[0].body}</Paragraph>
              </Typography>
            </List.Item>
            {doc.document[0].fields.map((field, i) => {
              return (
                <List.Item>
                  <Typography style={{ width: "100%" }}>
                    <Title level={4}>{field.name}</Title>
                    {field.fieldType === "TEXT" ? (
                      <Form.Item
												key={i}
                        name={`${field.name}+${i}+text-area`}
                        rules={[
                          { required: true, message: "Please enter your explanation" },
                        ]}
                      >
                        <TextArea
                          autoSize={{ minRows: 3 }}
                          showCount
                          maxLength={500}
                          row={8}
                          onChange={(e) => {
                            let tmp = Array.from(contents);
                            tmp[i].content = e.target.value;
                            setContents(tmp);
                          }}
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item
												key={i}
                        name={`${field.name}+${i}+drag-and-drop`}
                      >
                        <DragAndDrop
                          handleResult={(data) => {
                            let tmp = Array.from(contents);
                            tmp[i].content = data.data.uploadFile;
                            setContents(tmp);
                          }}
                        />
                      </Form.Item>
                    )}
                  </Typography>
                </List.Item>
              );
            })}
            <List.Item>
              <Typography style={{ width: "100%" }}>
                <Title level={4}>Approval Line</Title>
                {doc.document[0].passBy.map((approval, i) => {
                  return (
                    <Form.Item
                      key={i}
                      label={approval}
                      name={`approval-${i}`}
                      rules={[
                        {
                          required: true,
                          message: "Please fill in the staff memeber",
                        },
                      ]}
                    >
                      <GroupSelect
                        group={approval}
                        onChange={(value) => {
                          while (approvals.length <= i)
                            approvals.push({ status: "PENDING" });
                          approvals[i].staff = value;
                          setApprovals(Array.from(approvals));
                        }}
                      />
                    </Form.Item>
                  );
                })}
              </Typography>
            </List.Item>
          </List>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
              <Button
                type="primary"
                onClick={() => setPage({ key: "welcome" })}
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

export default CreateWorkflow;
