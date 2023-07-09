
require('dotenv').config(); 

const mongoose=require("mongoose");

const username=encodeURIComponent(process.env.BENUTZERNAME);
const password=encodeURIComponent(process.env.PASSWORD);
const database="alldata";

const connectionString=`mongodb+srv://${username}:${password}@cluster0.ggdpcne.mongodb.net/${database}?retryWrites=true&w=majority`;

const connectDB=(url)=> {
    return mongoose.connect(connectionString,{


    })
}


module.exports=connectDB;