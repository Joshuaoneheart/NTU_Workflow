const makeName = (id1, id2) => {
    return [id1, id2].sort().join("_");
  };
  
  // return the found user (can be null)
  const checkUser = (db, id, errFunc) => {
    if (!id) throw new Error("Missing user name for " + errFunc);
    return db.UserModel.findOne({ id }); //id
  };
  
  //return the found chatBox (can be null)
  const checkChatBox = (db, chatBoxName, errFunc) => {
    if(!chatBoxName) throw new Error("Missing chatBox name for " + errFunc);
    return db.ChatBoxModel.findOne({ name: chatBoxName });
  }
  
  //Make sure (from, to) users and chatBox have been created
  //return found {chatBox, sender} (can be null)
  const checkMessage = async (db, from, to, message, errFunc) => {
    const chatBoxName = makeName(from,to);
    return{
      chatBox: await checkChatBox(db, chatBoxName, errFunc),
      sender: await checkUser(db, from, errFunc),
      to: await checkUser(db, to, errFunc),
    };
  };
  
  // make sure calling checkUser beforehand
  const newUser = (db, name) => {
    return //new db.UserModel({ name }).save();
  };
  
  //make sure calling checkMessage beforehand
  const newMessage = (db, sender,body)=>{
    return new db.MessageModel({sender,body}).save(); //sender type: ObjectId
  }
  
  const newChatBox= (db,chatBoxName) =>{
    return new db.ChatBoxModel({name: chatBoxName}).save(); //message type: ObjectId　
  };
  
  export{
  makeName,
  checkUser,
  checkChatBox,
  checkMessage,
  newUser,
  newChatBox,
  newMessage
  }
  
  