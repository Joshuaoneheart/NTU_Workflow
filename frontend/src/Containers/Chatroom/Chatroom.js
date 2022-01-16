import { useRef, useState, useEffect } from "react";
import { Message } from "../../Components/Message/Message";
import { Input, Typography, Skeleton } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_CHATBOX_BY_USERS } from "../../graphql/queries";
import { SEND_MESSAGE } from "../../graphql/mutation";
import { MESSAGES_SUBSCRIPTION } from "../../graphql/subscription";

const { Title } = Typography;

const Chatroom = ({ user, correspondence, displayStatus }) => {
  const [body, setBody] = useState("");
  const endRef = useRef();
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const {
    data: chatbox,
    loading,
    error,
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
  useEffect(() => {
    try {
      subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        variables: { from: user.id, to: correspondence.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.message;
          return {
            chatBox: [
              {
                messages: [...prev.chatBox[0].messages, newMessage],
              },
            ],
          };
        },
      });
    } catch (e) {
      console.log(e);
    }
  }, [subscribeToMore]);
  return (
    <>
      <Title level={2}>{correspondence.name}'s Chat Room</Title>
      <div className="App-messages">
        <div
          style={{
            height: "43vh",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            marginBottom: "10px",
          }}
        >
          {loading ? (
            <Skeleton active />
          ) : !chatbox.chatBox[0].messages.length ? (
            <p>Say hey to your new friend</p>
          ) : (
            chatbox.chatBox[0].messages.map(({ sender, body }, i) => {
              return (
                <Message
                  me={user.name}
                  name={sender.name}
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
          onSearch={async (msg) => {
            if (!msg) {
              displayStatus({
                type: "error",
                msg: "Please enter a message body.",
              });
              return;
            }
            await sendMessage({
              variables: {
                from: user.id,
                to: correspondence.id,
                message: body,
              },
            });
            displayStatus({
              type: "success",
              msg: "Message sent.",
            });
            setBody("");
          }}
        ></Input.Search>
      </div>
    </>
  );
};
export default Chatroom;
