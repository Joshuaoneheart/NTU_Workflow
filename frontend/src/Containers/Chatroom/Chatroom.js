import { useRef, useState, useEffect } from "react";
import { Message } from "../../Components/Message/Message";
import { Input, Typography } from "antd";
import { useQuery } from "@apollo/client";
import { FIND_CHATBOX_BY_USERS } from "../../graphql/queries";

const { Title } = Typography;

const Chatroom = ({ user, correspondence, displayStatus }) => {
  console.log(user, correspondence);
  const [body, setBody] = useState("");
  const endRef = useRef();
  const {
    data: chatbox,
    loading,
    subscribeToMore,
  } = useQuery(FIND_CHATBOX_BY_USERS, {
    variables: { name1: user.id, name2: correspondence.id },
  });

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatbox]);
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
      <Title level={2}>{correspondence.name}'s Chat Room</Title>
      <div className="App-messages">
        <div style={{ height: "43vh" }}>
          {loading ? (
            <p>Loading...</p>
          ) : !chatbox.chatBox[0].messages.length ? (
            <p>Say hey to your new friend</p>
          ) : (
            chatbox.chatBox[0].messages.map(({ sender, body }, i) => {
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
