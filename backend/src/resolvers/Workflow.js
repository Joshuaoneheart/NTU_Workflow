// document : Document! # ref
// approvalLine: [approvalPayload]!
// student: Student!

const Workflow = {
  //parent is Workflow
  document(parent, args, { db }, info) {
    return db.DocumentModel.findById(parent.document);
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
