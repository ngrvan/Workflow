const mongoose=require("mongoose");

const username="nejerfanyosef001";
const password="k0d0uvz1AZNarbjw";
const database="alldata";

const connectionString=`mongodb+srv://${username}:${password}@cluster0.ggdpcne.mongodb.net/${database}?retryWrites=true&w=majority`;

const connectDB=(url)=> {
    return mongoose.connect(connectionString,{


    })
}


module.exports=connectDB;