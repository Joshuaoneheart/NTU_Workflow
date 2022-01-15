import DocumentPage from "./DocumentPage";
import CreateWorkflow from "../CreateWorkflow/createworkflow";
import { useState } from "react";
import Welcome from "../Welcome/welcome";
const MainPage = ({ page, setPage, user, displayStatus }) => {
  const [page, setPage] = useState({ key: "welcome" });
  return (
    <>
      {page["key"] == "document" ? (
        <DocumentPage setPage={setPage} document={page["document"]} />
      ) : page["key"] == "createWorkflow" ? (
        <CreateWorkflow setPage={setPage} document={page["document"]} />
      ) : page["key"] == "chatroom" ? (
        <Chatroom user ={user} correspondence={page["chatroom"]} displayStatus={displayStatus} />
      ) : (
        <Welcome setPage={setPage}/>
      )}
    </>
  );
};
export default MainPage;
