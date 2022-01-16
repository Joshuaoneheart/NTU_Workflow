import { useState } from "react";
import DocumentPage from "../../Components/DocumentPage/DocumentPage";
import CreateWorkflow from "../CreateWorkflow/createworkflow";
import CreateDocument from "../CreateDocument/createdocument";
import Chatroom from "../Chatroom/Chatroom";
import Welcome from "../Welcome/welcome";
const MainPage = ({ page, setPage, user, displayStatus }) => {
  return (
    <>
      {page["key"] == "document" ? (
        <DocumentPage setPage={setPage} document={page["document"]} />
      ) : page["key"] == "createWorkflow" ? (
        <CreateWorkflow setPage={setPage} user={user} document={page["document"]} displayStatus={displayStatus} />
      ) : page["key"] == "createDocument" ? (
        <CreateDocument setPage={setPage} displayStatus={displayStatus} />
      ) : page["key"] == "chatroom" ? (
        <Chatroom
          user={user}
          correspondence={page["chatroom"]}
          displayStatus={displayStatus}
        />
      ) : (
        <Welcome setPage={setPage} />
      )}
    </>
  );
};
export default MainPage;
