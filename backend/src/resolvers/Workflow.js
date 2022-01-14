// type Workflow {

//   contents: ContentPayload!
//   approvalLine: [approvalPayload]!
//   student: User! # REVICE
// }

const Workflow = {
  //parent is Workflow
  document(parent, args, { db }, info) {
    return db.DocumentModel.findById(parent.document);
  },
  contents: async (parent, args, { db }, info)=>{

  },
  approvalLine(parent, args, { db }, info) {
    //const teacherArray = Promise.all((payload) => db.TeacherModel.findById(payload.teacher));
    //const statusArray = (payload) => {payload.status}
    return 
  },
  student(parent, args, { db }, info) {
    return db.StudentModel.findById(parent.student);
  },
};
export default Workflow;
