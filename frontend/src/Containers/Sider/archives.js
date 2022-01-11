import { Badge, Card, Typography, Radio } from "antd";
import { useState } from "react";

const { Text } = Typography;
const data = [
  {
    content: "This is a card",
    status: "APPROVED",
  },
  {
    content: "This is not a card",
    status: "REJECTED",
  },
  {
    content: "That is a card",
    status: "PENDING",
  },
  {
    content: "This isn't a card",
    status: "REJECTED",
  },
  {
    content: "This should be a card",
    status: "PENDING",
  },
  {
    content: "This is a card or is it?",
    status: "APPROVED",
  },
];
const Archives = () => {
  const [filter, setFilter] = useState(null);
	const onFilterChange = (e) => {
		if (e.target.value === "All")
			setFilter(null);
		else 
			setFilter(e.target.value);
	}
  const convert = (a) => {
    switch (a) {
      case "APPROVED":
        return { text: a.toLowerCase(), color: "green" };
      case "PENDING":
        return { text: a.toLowerCase(), color: "yellow" };
      case "REJECTED":
        return { text: a.toLowerCase(), color: "red" };
    }
  };
  return (
    <>
      <Radio.Group onChange={onFilterChange} value={filter}>
        <Radio value="All">All</Radio>
        <Radio value="approved">Approved</Radio>
        <Radio value="pending">Pending</Radio>
        <Radio value="rejected">Rejected</Radio>
      </Radio.Group>
      {data.map((archive) => {
        const { text, color } = convert(archive.status);
        console.log(archive);
        if (!filter) {
          return (
            <Badge.Ribbon text={text} color={color}>
              <Card>{archive.content}</Card>
            </Badge.Ribbon>
          );
        } else {
          if (filter === text) {
            return (
              <Badge.Ribbon text={text} color={color}>
                <Card>{archive.content}</Card>
              </Badge.Ribbon>
            );
          }
        }
      })}
    </>
  );
};

export default Archives;
