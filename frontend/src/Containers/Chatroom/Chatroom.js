import { useRef, useState, useEffect } from "react";
import { Message } from "../../Components/Message/Message";
import { Input, Typography } from "antd";
const { Title } = Typography;
const Chatroom = ({ user, correspondence, displayStatus }) => {
  const [body, setBody] = useState("");
  /*
  const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
    variables: { name1: user.id, name2: correspondence.id },
  });
  */
  const data = { chatbox: { messages: [{ sender: "Joshua", body: "Hey" }] } };
  const loading = false;
  const endRef = useRef();

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [data]);
  /*
  useEffect(() => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      variables: { name: props.box },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.message;
        props.setUnread((prev) => {
          let new_ = Object.assign({}, prev);
          new_[props.box]++;
          return new_;
        });
        return {
          chatbox: {
            messages: [...prev.chatbox.messages, newMessage],
          },
        };
      },
    });
  }, [subscribeToMore]);
*/
  return (
    <>
      <Title level={2}>Joshua's Chat Room</Title>
      <div className="App-messages">
          <div style={{height: "43vh"}}>
        {loading || !data.chatbox ? (
          <p>loading...</p>
        ) : (
          data.chatbox.messages.map(({ sender, body }, i) => {
            return (
              <Message
                me={user.name}
                name={sender}
                body={body}
                key={sender + body + i}
              />
            );
          })
        )}
        <div ref={endRef} />
        </div>
        <Input.Search
          enterButton="Send"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="Type a message here..."
          onSearch={(msg) => {
            if (!msg) {
              displayStatus({
                type: "error",
                msg: "Please enter a message body.",
              });
              return;
            }
            // Todo: sendMessage
            setBody("");
          }}
        ></Input.Search>
      </div>
    </>
  );
};
export default Chatroom;
