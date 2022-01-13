import { Card, Typography, Input} from "antd";

const { Text, Title } = Typography;
const data = {
	name: "Joshua",
	email: "noone@csie.ntu.edu.tw",
	id: "B09877221",
	department: "CSIE",
	groups: "student",
	password: "hahahahah"
};

const Settings = () => {
  return (
    <>
      <Card>
				<Title>{data.name}</Title>
				<Input.TextArea title="email" value={data.email} disabled></Input.TextArea>
				<Input.TextArea title="id" value={data.id} disabled></Input.TextArea>
				<Input.TextArea title="department" value={data.department} disabled></Input.TextArea>
				<Input.TextArea title="groups" value={data.groups} disabled></Input.TextArea>
			</Card>
    </>
  );
};

export default Settings;
