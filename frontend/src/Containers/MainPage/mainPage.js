import DragAndDrop from "./dragAndDrop";
import ProgressBar from "./progressBar";

const MainPage = ({user}) => {
  return (
    <>
			<h1>Welcome {user}</h1>
      <DragAndDrop />
      <ProgressBar />
    </>
  );
};

export default MainPage;
