import {checkUser, newUser, makeName, checkChatBox, newChatBox,newMessage, checkMessage} from './utility.js'
import { ChatBoxModel } from '../models/models.js';

const Subscription = {
    message:{
      async subscribe(parent, { from, to }, { db, pubSub }, info){
        const name = makeName(from,to);
        const chatBox = await ChatBoxModel.findOne({name});
        if(!chatBox) {
          console.log(`Chatbox ${name} not exist`)
        }
  
        return pubSub.asyncIterator(`chatBox ${name}`);
      }
    },

    notificationSubscription:{
      async subscribe(parent, {id}, { db, pubSub }, info){
        return pubSub.asyncIterator(`Notification ${id}`);
      }

    },
    }
    
    export default Subscription;