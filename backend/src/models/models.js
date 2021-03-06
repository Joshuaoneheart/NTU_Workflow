import mongoose from "mongoose";

const { Schema } = mongoose;

//https://stackoverflow.com/questions/63366692/uploading-file-with-apollo-graphql-to-mongodb-database
//https://lorefnon.tech/2018/08/20/uploading-files-to-mongodb-gridfs-via-apollo-powered-graphql-api/
const FileSchema = new Schema({
  _id: { type: String, required: true },
  path: { type: String, required: true },
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  encoding: { type: String, required: true },
});

const TextSchema = new Schema({
  text: { type: String, required: true },
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  department: { type: String, required: true }, //教務處
  groups: [{ type: String }], //註冊組 || none,
  role: { type: String, required: true }, //student || stuff
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const DocumentSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  fields: [ {fieldType:{ type: String, required: true },
  name: { type: String, required: true}}], //array of inputs
  passBy: [{ type: String, required: true}], //array of ids
});

const WorkflowSchema = new Schema({
  id: { type: String, required: true },
  document: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
  comments: { type: String }, //等被reject或需要退回修改才會寫
  contents: {
    file: [{ type: String }],
    image:[{ type: String }], //array of ids
    text: [{ type: String }],
  },
  approvalLine: [
    {
      staff: { type: String, required: true },
      status: { type: String, required: true },
    },
  ], //想把它寫成dictionary
  student: { type: String, required: true },
});

const SaltSchema = new Schema({
  name: { type: String, required: true},
  content: { type: String, required: true}
})

const ChatBoxSchema = new Schema({
  name: { type: String, required: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

const MessageSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
});

const NoticeSchema = new Schema({
  userId : {type: String, required: true},
  workflowId: { type: String, required: true},
  content: { type: String, required: true}
});

const UserModel = mongoose.model("User", UserSchema);
const DocumentModel = mongoose.model("Document", DocumentSchema);
const WorkflowModel = mongoose.model("Workflow", WorkflowSchema);
const FileModel = mongoose.model("File", FileSchema);
const TextModel = mongoose.model("Text", TextSchema);
const saltModel = mongoose.model("salt",SaltSchema);
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);
const MessageModel = mongoose.model("Message", MessageSchema);
const NoticeModel = mongoose.model("Notice", NoticeSchema);
export { UserModel, DocumentModel, WorkflowModel, FileModel, TextModel,saltModel,ChatBoxModel,MessageModel,NoticeModel };
