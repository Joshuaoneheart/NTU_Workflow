// user(name: String, id: ID, groups: String): [User!]
//   document(title: String): [Document!]
//   workflow(status: Status, user_id: ID): [Workflow!]

import {
  saltModel,
  UserModel,
  DocumentModel,
  WorkflowModel,
} from "../models/models";
import bcrypt from "bcrypt";

const Query = {
  salt: async (parent, args, { pubsub }, info) => {
    try {
      let salt = await saltModel.findOne({ name: "salt" });
      if (!salt) {
        salt = new saltModel({
          name: "salt",
          content: await bcrypt.genSalt(12),
        });
        await salt.save();
      }
      salt = salt.content;
      return salt;
    } catch (e) {
      console.log(e.message);
      return "Internal Error";
    }
  },
  signIn: async (parent, { email, password }, { db }) => {
    // if (email) {
    //
    //   if (!user) throw new Error(`user not found by email ${email}`);
    //   if (password) {
    //     if (user.password == password) return user;
    //   } else throw new Error(" password input is null ");
    // } else {
    //   throw new Error(" id input is null ");
    // }
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return "User not exists";
      if (user.password == password) return user;
      else return "Password incorrect";
    } catch (e) {
      console.log(e.message);
      return "Internal Error";
    }
  },
  findGroups: async (parent, args, db) => {
    let groupList = [];
      (await UserModel.find({})).map((user) => {
        user.groups.map((group) => {
          groupList.push(group);
        });
      });
    
    groupList = [...new Set(groupList)];
    return groupList;
  },
  user: async (parent, { name, id, groups }, db) => {
    if (name) {
      const user = await UserModel.find({ name });
      if (!user) throw new Error(`user is not found by name ${name}`);
      return user;
    }
    if (id) {
      const user = await UserModel.find({ id });
      if (!user) throw new Error(`user is not found by id ${id}`);
      return user;
    }
    if (groups) {
      const user = await UserModel.find({ groups: { $in: [groups] } });
      if (!user) throw new Error(`user is not found by group ${groups}`);
      return user;
    }
  },
  document: async (parent, args, db) => {
    if (title) {
      const doc = await DocumentModel.find({ title: args.title });
      if (!doc) throw new Error("Document is not found"); //應該不用throw new error
    } else {
      const doc = await DocumentModel.find();
      if (!doc) throw new Error("Document is null");
    }
    return doc;
  },
  workflow: async (parent, { status, user_id }, db) => {
    if (status) {
      if (!user_id) {
        const workflow = await WorkflowModel.find({ status: status });
        if (!workflow)
          throw new Error(`workflow is not found by status ${status}`);
      } else {
        const user = await UserModel.find({ id: user_id });
        const workflow = await WorkflowModel.find({
          student: user,
          status: status,
        }); //pass by user id, cos ref
        if (!workflow)
          throw new Error(
            `workflow is not found by status ${status} & user id ${user.id}`
          );
      }
      //return workflow;
    } else if (user_id) {
      const user = await UserModel.find({ id: user_id });
      const workflow = await WorkflowModel.find({ student: user }); //pass by user id, cos ref
      if (!workflow)
        throw new Error(`workflow is not found by user id ${user.id}`);
      //return workflow;
    } else {
      const workflow = await WorkflowModel.find();
      if (!workflow) throw new Error(`workflow is null`);
      //return workflow;
    }
    return workflow;
  },
};

export default Query;
