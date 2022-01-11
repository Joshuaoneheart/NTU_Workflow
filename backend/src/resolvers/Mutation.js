// logIn(id: ID!, password: String!): User!

// createUser(input: CreateUserInput!): User!

// createDocument(input: CreateDocumentInput!): Document!
// createWorkflow(input: CreateWorkflowInput!): Workflow!

// updateWorkflow(status: String, comments: String): Workflow!

// 引入外部套件
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 定義 bcrypt 加密所需 saltRounds 次數
const SALT_ROUNDS = 2;
// 定義 jwt 所需 secret (可隨便打)
const SECRET = 'just_a_random_secret';

// createUser(input: CreateUserInput!): User!
// name: String!
// id: ID!
// department: String!
// groups: [String]
// role: String!
// password: String!
// email: String!
import { saltModel, UserModel,DocumentModel,WorkflowModel } from "../models/models";

const Mutation = {
  createUser: async (parent, args, db ) =>{

    const user = await new UserModel({
      name: args.input.name,
      id: args.input.id,
      department: args.input.department,
      groups: args.input.groups,
      role: args.input.role,
      password: args.input.password,
      email: args.input.email,
    })
    await user.save();
    return user;
  },
    // if (password) {
    //   const user = await db.UserModel.find({
    //     password: password,
    //   });
    //   if (!user) {
    //     throw new Error('wrong password or user is invalid');
    //   }
    //   else{
    //     return (user);
    //   }
    // }
    
};

export default Mutation;

// uploadFile: async (_, { file }) => {
//       const fileId = await storeFile(file).then(result => result);

//       return true;
// // later I will return something more and create some object etc.
//     }
