import storeFile from "../mongo";

Mutation: {
    uploadFile: async (_, { file }) => {
      console.log(file);
      const fileId = await storeFile(file);

      return true;
     
    }
  }

// const { storeFile } = require('../../server');
// //...

// uploadFile: async (_, { file }) => {
//       const fileId = await storeFile(file).then(result => result);

//       return true;
// // later I will return something more and create some object etc.
//     }