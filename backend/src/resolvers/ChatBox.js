
const ChatBox = {
    messages(parent, args, { db }, info) {
      //console.log(parent.name);
      // const chatbox = db.ChatBoxModel.findOne({name: parent.name});
      console.log(parent);
      //return parent;
      return Promise.all(
        //chatbox.messages.map((mId) => db.MessageModel.findById(mId)));
        parent.messages.map(
          (mId) => db.MessageModel.findById(mId))
          ) //CheckBox 的 messages type :　ObjectID
    }
  }
  export default ChatBox;
  