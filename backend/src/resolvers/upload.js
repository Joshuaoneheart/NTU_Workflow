import { saltModel,UserModel } from "../models/models.js";

const example = [
  {
    name: "Teacher1",
    id: "00000000",
    department: "教務處",
    groups: "註冊組",
    role: "staff",
    password: "$2b$12$Y9VjkCFIdl.NQi/O7YBG5uaMhcY2w29PE/f5qLDm6/4Hgs1oi5ruy",
    email: "teacher1@ntu.edu.tw",
  },
  {
    name: "Teacher2",
    id: "00000001",
    department: "教務處",
    groups: "註冊組",
    role: "staff",
    password: "$2b$12$Y9VjkCFIdl.NQi/O7YBG5uaMhcY2w29PE/f5qLDm6/4Hgs1oi5ruy",
    email: "teacher2@ntu.edu.tw",
  },
  {
    name: "Teacher3",
    id: "00000002",
    department: "學務處",
    groups: "生輔組",
    role: "staff",
    password: "$2b$12$Y9VjkCFIdl.NQi/O7YBG5uaMhcY2w29PE/f5qLDm6/4Hgs1oi5ruy",
    email: "teacher3@ntu.edu.tw",
  },
  {
    name: "Teacher4",
    id: "00000003",
    department: "資訊工程系",
    groups: "教職員",
    role: "staff",
    password: "$2b$12$Y9VjkCFIdl.NQi/O7YBG5uaMhcY2w29PE/f5qLDm6/4Hgs1oi5ruy",
    email: "teacher4@ntu.edu.tw",
  },
];

const salt = {
  name: "salt",
  content: "$2b$12$Y9VjkCFIdl.NQi/O7YBG5u",
};

const dataInit = async () => {
  if (!(await UserModel.findOne({}))) {
    await UserModel.insertMany(example);
    console.log("Database initialized!");
  }
  if (!(await saltModel.findOne())) {
    await new saltModel(salt).save();
  }
};

export { dataInit };
