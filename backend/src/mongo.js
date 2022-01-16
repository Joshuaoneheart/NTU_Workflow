import dotenv from "dotenv-defaults";
import mongoose from "mongoose";
const Grid = require("gridfs-stream");
const fs = require("fs");

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
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log(err));
}

const storeFile = async (upload) => {
  const { filename, createReadStream, mimetype } = await upload.then(
    (result) => result
  );

  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "files",
  });

  const uploadStream = bucket.openUploadStream(filename, {
    contentType: mimetype,
  });
  createReadStream()
    .pipe(uploadStream)
    .on("error", console.log("error"))
    .on("finish", console.log("finish"));
};

export { connect, storeFile };
