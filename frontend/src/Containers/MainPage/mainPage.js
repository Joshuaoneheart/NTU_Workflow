import { useEffect, useState } from "react";
import DocumentPage from "../../Components/DocumentPage/DocumentPage";
import CreateWorkflow from "../CreateWorkflow/createworkflow";
import CreateDocument from "../CreateDocument/createdocument";
import Chatroom from "../Chatroom/Chatroom";
import Welcome from "../Welcome/welcome";
const MainPage = ({ page, setPage, user, displayStatus, setJump }) => {
  var [component, setComponent] = useState(
    <Welcome setJump={setJump} setPage={setPage} user={user} />
  );
  useEffect(() => {
    console.log(page)
    if (page["refresh"]) {
      if (page["key"] == "document")
        setComponent(
          <DocumentPage
            setPage={setPage}
            document={page["document"]}
            workflow={page["workflow"]}
            displayStatus={displayStatus}
            user={user}
          />
        );
      else if (page["key"] == "createWorkflow")
        setComponent(
          <CreateWorkflow
            setPage={setPage}
            user={user}
            document={page["document"]}
            displayStatus={displayStatus}
          />
        );
      else if (page["key"] == "createDocument")
        setComponent(
          <CreateDocument setPage={setPage} displayStatus={displayStatus} />
        );
      else if (page["key"] == "chatroom")
        setComponent(
          <Chatroom
            user={user}
            correspondence={page["chatroom"]}
            displayStatus={displayStatus}
          />
        );
      else
        setComponent(
          <Welcome setJump={setJump} setPage={setPage} user={user} />
        );
      let tmp = Object.assign({}, page);
      tmp.refresh = false;
      setPage(tmp);
    }
  }, [page]);
  return component;
};
export default MainPage;
