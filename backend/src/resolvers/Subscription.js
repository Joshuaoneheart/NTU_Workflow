import {checkUser, newUser, makeName, checkChatBox, newChatBox,newMessage, checkMessage} from './utility.js'

const Subscription = {
    message:{
  
      async subscribe(parent, { from, to }, { db, pubSub }, info){
  
        const name = makeName(from,to);
        const chatBox = await db.ChatBoxModel.findOne({name});
        if(!chatBox) {
          await newChatBox(db, chatBoxName);
        }
  
        return pubSub.asyncIterator(`chatBox ${name}`);
      }
    },
    }
    
    export default Subscription;