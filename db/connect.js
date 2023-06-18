const mongoose=require("mongoose");

const connectionString="mongodb+srv://ngrvannnyosef:rLw23eJyX8b4GcIU@cluster0.ukwwlm4.mongodb.net/alldata?retryWrites=true&w=majority";

const connectDB=(url)=> {
    return mongoose.connect(connectionString,{


    })
}


module.exports=connectDB;