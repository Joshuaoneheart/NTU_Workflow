import mongo from "./mongo.js";
import server from "./server.js";


mongo();

const port = process.env.PORT | 5000;

server.start({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
