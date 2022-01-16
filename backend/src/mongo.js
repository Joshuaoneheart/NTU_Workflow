import dotenv from "dotenv-defaults";
import mongoose from "mongoose";

async function connect() {
  dotenv.config();

  if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!");
    process.exit(1);
  }

  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected!");
      FSBUCKET = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: "files",
      });
    })
    .catch((err) => console.log(err));
}

let FSBUCKET;

export { connect, FSBUCKET };
