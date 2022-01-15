import DocumentPage from "./DocumentPage";
import CreateWorkflow from "../CreateWorkflow/createworkflow";
import { Button } from "antd";
import { useState } from "react";
const Welcome = () => {
  return null;
};
const MainPage = ({ user }) => {
  const [page, setPage] = useState({ key: "welcome" });
  return (
    <>
      {page["key"] == "document" ? (
        <DocumentPage setPage={setPage} document={page["document"]} />
      ) : page["key"] == "createWorkflow" ? (
        <CreateWorkflow setPage={setPage} document={page["document"]} />
      ) : (
        <Welcome />
      )}
    </>
  );
};
export default MainPage;
