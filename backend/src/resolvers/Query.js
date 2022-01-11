
const Query ={
    user: async (parent, args,  db )=>{
        if( args.password ){
            const password_validation = db.UserModel.find({ password: args.password});
            if (!password_validation){
                
            }
        }

    },
};

export default Query;