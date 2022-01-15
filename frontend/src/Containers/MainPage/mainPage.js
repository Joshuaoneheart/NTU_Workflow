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
      <DocumentPage user={user}/>
    </>
  );
};
export default MainPage;
