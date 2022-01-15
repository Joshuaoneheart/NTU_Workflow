// updateWorkflow(status: String, comments: String): Workflow!
import { uuid } from "uuidv4";
import {
  saltModel,
  UserModel,
  DocumentModel,
  WorkflowModel,
  TextModel,
} from "../models/models";
import {
  checkUser,
  newUser,
  makeName,
  checkChatBox,
  newChatBox,
  newMessage,
  checkMessage,
} from "./utility.js";
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
    const id = uuid();

    const document = await new DocumentModel({
      id: id,
      title: args.input.title,
      body: args.input.body,
      fields: args.input.fields,
      passBy: args.input.passBy,
    });
    await document.save();
    return document;
  },

  createWorkflow: async (parent, args, db) => {
    const workflow = await new WorkflowModel({
      id: uuid(),
      document: args.input.document, //ref _id
      status: "PENDING",
      date: new Date().getTime(),
      comments: "no comment",
      contents: {
        file: args.input.contents.file,
        image: args.input.contents.image, //array of ids
        text: args.input.contents.text,
      },
      approvalLine: args.input.approvalLine,
      student: args.input.student,
    });
    await workflow.save();
    return workflow;
  },

  uploadTEXT: async (parent, { input }, db) => {
    console.log(input);

    if (input) {
      const textUnit = new TextModel({ text: input });
      await textUnit.save();
      console.log(JSON.stringify(textUnit._id));

      return JSON.stringify(textUnit._id);
    }
    throw new Error(`missing uploadTEXT input`);
  },
  //updateWorkflow(status: String!):ID!
  updateWorkflow: async (
    parent,
    { status, workflowId, staffId, comments },
    db
  ) => {
    console.log(status, workflowId, staffId, comments);

    if (status && workflowId) {
      
      const workflow = await WorkflowModel.findOne({ id: workflowId });

      if(!workflow) throw new Error(`workflow not found with mutation updateWorkflow`)

      // console.log(workflow.approvalLine[0].staff);

      await workflow.approvalLine.map(async (approvalPayload) => {
        //console.log(approvalPayload.staff === staffId);

          approvalPayload.staff === staffId
          ? approvalPayload.status = status
          : approvalPayload.status;
          
     });
        
      if (status == "DECLINE") {
        workflow.status = "DECLINE";
        
        if (comments) {
          workflow.comments = comments;
        }
        }

        var flag = true;

         flag =  await workflow.approvalLine.map((approvalPayload) => {
           console.log(approvalPayload.status == "ACCEPT");
          if(approvalPayload.status == "PENDING" || approvalPayload.status =="DECLINE") {
            console.log("false");
            return false;
          }
        });

        console.log(flag.includes(false));

        if(!flag.includes(false)){
          workflow.status = "ACCEPT";
        }
        await workflow.save();
        return workflow.id; //workflow ID
      }
     else {
      throw new Error(`missing status or workflowId`);
    }
  },

  async createChatBox(parent, { name1, name2 }, { db, pubsub }, info) {
    //arg

    if (!name1 || !name2)
      throw new Error("Missing chatBox name for CreateChatBox");

    if (!(await checkUser(db, name1, "createChatBox"))) {
      throw new Error("User does not exist for CreateChatBox: " + name1);
      //await newUser(db, name1);
    }
    if (!(await checkUser(db, name2, "createChatBox"))) {
      throw new Error("User does not exist for CreateChatBox: " + name2);
      //await newUser(db, name2);
    }

    const chatBoxName = makeName(name1, name2);
    let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
    if (!chatBox) {
      chatBox = await newChatBox(db, chatBoxName);
    }

    return chatBox;
  },
  async createMessage(parent, { from, to, message }, { db, pubSub }, info) {
    const { chatBox, sender } = await checkMessage(
      db,
      from,
      to,
      message,
      "createMessage"
    );
    if (!chatBox) throw new Error("ChatBox not found for createMessage");
    if (!sender) throw new Error("User not found: " + from);

    const chatBoxName = makeName(from, to);
    const newMsg = await newMessage(db, sender, message); //body = message
    chatBox.messages.push(newMsg); // save in that specific, new chatBox
    await chatBox.save();

    pubSub.publish(`chatBox ${chatBoxName}`, {
      message: { mutation: "CREATED", message: newMsg },
    });
    return newMsg;
  },
};

export default Mutation;
