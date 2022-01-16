const Message ={
    sender: async (parent,args,{db},info) => {
        //console.log(parent.sender);
        
        return await db.UserModel.findById(parent.sender); //Message - sender type : ObjectID
    },
};

export default Message;