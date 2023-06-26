const mongoose=require("mongoose");

const username="ngrvannnyosef";
const password="rLw23eJyX8b4GcIU";
const database="alldata";

const connectionString=`mongodb+srv://${username}:${password}@cluster0.ukwwlm4.mongodb.net/${database}?retryWrites=true&w=majority`;

const connectDB=(url)=> {
    return mongoose.connect(connectionString,{


    })
}


module.exports=connectDB;