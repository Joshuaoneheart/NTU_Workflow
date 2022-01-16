const Workflow = {
  //parent is Workflow
  // document(parent, args, { db }, info) {
  //   return db.DocumentModel.findById(parent.document);
  // },
  contents: async (parent, args, { db }, info)=>{

  },
  approvalLine(parent, args, { db }, info) {
    // console.log("workflow.js")
    // console.log(args);
    // return args;

  },
  // student: async(parent, args, { db }, info)=> {
  //   const student_id = parent.student;
  //   const student = await  db.UserModel.find({_id : student_id});
  //   console.log(student);
  //   return student;
  // },
};
export default Workflow;
