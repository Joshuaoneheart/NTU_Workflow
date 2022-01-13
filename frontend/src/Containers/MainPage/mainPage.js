import DragAndDrop from "./dragAndDrop";
import ProgressBar from "./progressBar";
import DocumentPage from "./DocumentPage";
import CreateWorkflow from "../CreateWorkflow/createworkflow";
import { Button } from "antd";
import { useState } from "react";
const MainPage = ({ user }) => {
  const [newWorkflow, setNewWorkflow] = useState(false);
  return (
    <>
      {newWorkflow === true ? (
        <CreateWorkflow setNewWorkflow={setNewWorkflow} />
      ) : (
        <DocumentPage />
      )}
      <Button
        type="primary"
        onClick={() => setNewWorkflow(true)}
        style={newWorkflow === true ? { display: "none" } : {}}
      >
        NEW
      </Button>
    </>
  );
};
export default MainPage;
