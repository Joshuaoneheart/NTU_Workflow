// passBy: [Teacher!]! #ref
const Document = {
  //parent is Document
  passBy(parent, args, { db }, info) {
    return Promise.all(parent.passBy.map((Id) => db.TeacherModel.findById(Id)));
  },
};
export default Document;
