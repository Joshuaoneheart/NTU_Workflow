import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "../../graphql/mutation";

const { Dragger } = Upload;

const DragAndDrop = (props) => {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  return (
    <Dragger
      maxCount={1}
      customRequest={async (e) => {
        const { onSuccess, onError, file, action, onProgress } = e;
        try {
          const res = await uploadFile({ variables: { file } });
          props.handleResult(res);
          onSuccess(res);
        } catch (e) {
          onError(e);
        }
      }}
      onDrop={(e) => {
        console.log("Dropped files", e.dataTransfer.files);
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Dragger>
  );
};

export default DragAndDrop;
