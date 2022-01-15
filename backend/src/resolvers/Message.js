const Message ={
    sender(parent,args,{db},info){
        //console.log(parent.sender);
        
        return db.UserModel.findById(parent.sender); //Message - sender type : ObjectID
    },
};

export default Message;