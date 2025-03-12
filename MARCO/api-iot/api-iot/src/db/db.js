import mongoose  from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/db_iot-local')
.then((db)=> console.log("MongoDB atlas conenected"))
.catch((error)=>console.error(error));

export default mongoose;