import Layout from "../../Layout/layout";
import DragAndDrop from "./dragAndDrop";
import ProgressBar from "./progressBar";

const MainPage = ({user}) => {
  return (
    <Layout>
			<h1>Welcome {user}</h1>
      <DragAndDrop />
      <ProgressBar />
    </Layout>
  );
};

export default MainPage;
