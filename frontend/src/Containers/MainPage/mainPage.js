import DocumentPage from "./DocumentPage";
import CreateWorkflow from "../CreateWorkflow/createworkflow";
import { useState } from "react";
import Welcome from "../Welcome/welcome";
const MainPage = ({ user }) => {
  const [page, setPage] = useState({ key: "welcome" });
  return (
    <>
      {page["key"] == "document" ? (
        <DocumentPage setPage={setPage} document={page["document"]} />
      ) : page["key"] == "createWorkflow" ? (
        <CreateWorkflow setPage={setPage} document={page["document"]} />
      ) : (
        <Welcome setPage={setPage}/>
      )}
    </>
  );
};
export default MainPage;
