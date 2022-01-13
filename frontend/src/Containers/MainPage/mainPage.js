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
<<<<<<< HEAD
      <DocumentPage user={user}/>
=======
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
>>>>>>> 8766e57 (First version of create workflow)
    </>
  );
};
export default MainPage;
