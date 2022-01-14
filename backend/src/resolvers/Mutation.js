// updateWorkflow(status: String, comments: String): Workflow!

import {
  saltModel,
  UserModel,
  DocumentModel,
  WorkflowModel,
} from "../models/models";

import { hash } from "bcrypt";

const Mutation = {
  createUser: async (parent, args, db) => {
    const checkEmail = await UserModel.findOne({ email: args.input.email });
    if (checkEmail) throw new Error(`Email repeat : ${args.input.email}`);

    // const salt = await saltModel.find({});
    // console.log(args.input.password);
    // console.log(salt[0].content);
    // const password = await hash(args.input.password, salt[0].content);
    // console.log(password);

    const user = await new UserModel({
      name: args.input.name,
      id: args.input.id,
      department: args.input.department,
      groups: args.input.groups,
      role: args.input.role,
      password: args.input.password,
      //password: password,
      email: args.input.email,
    });
    await user.save();
    return user;
  },
  createDocument: async (parent, args, db) => {
    // confirm that the id is unique
    const checkId = await DocumentModel.find({ id: args.input.id });
    if (checkId) throw new Error(`id repeat : ${args.input.id}`);

    const document = await new DocumentModel({
      id: args.input.id,
      title: args.input.title,
      body: args.input.body,
      fields: args.input.fields,
      passBy: args.input.passBy,
    })
    await document.save();
    return document;
  },
  // createWorkflow(input: CreateWorkflowInput!): Workflow!

  // createWorkflow: async (parent,args,db)=>{

  // }
};

export default Mutation;

// uploadFile: async (_, { file }) => {
//       const fileId = await storeFile(file).then(result => result);

//       return true;
// // later I will return something more and create some object etc.
//     }
