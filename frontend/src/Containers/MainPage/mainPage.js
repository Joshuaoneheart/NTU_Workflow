import { useState } from "react";
import DocumentPage from "../../Components/DocumentPage/DocumentPage";
import CreateWorkflow from "../CreateWorkflow/createworkflow";
import Chatroom from "../Chatroom/Chatroom";
const Welcome = () => {
  return null;
};
const MainPage = ({ page, setPage, user, displayStatus }) => {
  return (
    <>
      {page["key"] == "document" ? (
        <DocumentPage setPage={setPage} document={page["document"]} />
      ) : page["key"] == "createWorkflow" ? (
        <CreateWorkflow setPage={setPage} document={page["document"]} />
      ) : page["key"] == "chatroom" ? (
        <Chatroom user ={user} correspondence={page["chatroom"]} displayStatus={displayStatus} />
      ) : (
        <Welcome />
      )}
    </>
  );
};
export default MainPage;
