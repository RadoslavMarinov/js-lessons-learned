import mongoose from 'mongoose';
const CONNECTION_STRING = 'mongodb://localhost:27017/Test'

var connected = false;

async function connect ():Promise<mongoose.Connection> {
  if(!connected){ 
    mongoose.connection.on('error', () => {
      console.log(`❌ Mongo connection ERROR!!`);
      connected = false
    })
    mongoose.connection.on('connected', () => {
      console.log(`✅ Mongo connected!!`);
      connected = true
    })
    mongoose.connection.on('disconnected', () => {
      console.log(`❗ MONGO disconnected!!!`);
      connected = false
    })
    
    await mongoose.connect(CONNECTION_STRING,{ maxPoolSize: 10 })
  } 
  return mongoose.connection;
}

export default connect;
