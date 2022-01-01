import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';

export default()=>{
  
dotenv.config();

if(!process.env.MONGO_URL){
  console.error("Missing MONGO_URL!")
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const db = mongoose.connection

db.once('error',()=>{
    console.log('MongoDB error!')
  });

db.once('open', () => {
    console.log('MongoDB connected!')
});
}