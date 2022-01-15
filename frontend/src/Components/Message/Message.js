import styled from "styled-components";
import { Tag, Space } from "antd";

const StyledMessage = styled.p`
    display: flex;
    align-self: ${(p) => {return (p.isMe ? "flex-end" : "flex-start")}};
`;

const Message = (props) => {
  return (
    <StyledMessage className="App-message" isMe={props.me === props.name}>
      <Space>{!(props.me === props.name) && props.name} <Tag color="geekblue">{props.body}</Tag>{(props.me === props.name) && props.name}</Space> 
    </StyledMessage>
  );
};

export { Message };