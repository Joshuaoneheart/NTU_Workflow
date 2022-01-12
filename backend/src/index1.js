import {connect} from "./mongo.js";
import server from "./index.js";

require('dotenv').config()

// const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
// const SECRET = process.env.SECRET;

// const hash = (text, saltRounds) => bcrypt.hash(text, saltRounds)

// const createToken = ({ id, email, name }, secret) =>
// +  jwt.sign({ id, email, name }, secret, {
//     expiresIn: '1d'
//   })



connect();

const port = process.env.PORT | 5000;

server.start({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
