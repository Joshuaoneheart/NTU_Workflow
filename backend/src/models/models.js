import mongoose from "mongoose";

const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true},
  department: { type: String, required: true },
  grade: { type: Number, required: true },
  email: { type: String, required: true },
});

const TeacherSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true},
  department: { type: String, required: true },
  email: { type: String, required: true },
});

const DocumentSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  passBy: [ { type: mongoose.Types.ObjectId, ref: "Teacher" } ] //array of ids
});

const WorkflowSchema = new Schema({
id: { type: String, required:true},
document: { type: mongoose.Types.ObjectId, ref: "Document" }, 
status: { type: String, required: true },
date :{ type: Date, required: true },
comments: [{ type: String}], //等被reject或需要退回修改才會寫
approvalLine: [{ teacher:{ type: mongoose.Types.ObjectId, ref: "Teacher" }, approve: {type: Boolean}}], //想把它寫成dictionary
student: { type: mongoose.Types.ObjectId, ref: "Student" },
})


const StudentModel = mongoose.model("Student", StudentSchema);
const TeacherModel = mongoose.model("Teacher", TeacherSchema);
const DocumentModel = mongoose.model("Document", DocumentSchema);
const WorkflowModel = mongoose.model("Workflow", WorkflowSchema);


export { StudentModel, TeacherModel, DocumentModel,WorkflowModel };
