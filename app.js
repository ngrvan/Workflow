//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Auftrag = require("./models/auftragSchema");



// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
const alleAuftragRouter= require("./routes/alleR");

// Mongoose
const connectDB=require("./db/connect")


const { log } = require("console");

const start =async()=> {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

app.get("/all-articles", (req, res) => {
  res.render("index", { mytite: "Home" });
});

app.get("/add-new-article", (req, res) => {
  res.render("add-new-article", { mytite: "Neuer-Auftrag" });
});

app.get("/Suche", (req, res) => {
  res.render("suche", { mytite: "Suche" });
 
});
//REST API Funkion
app.get("/auftragInfo/:id",(req, res) => {
  Auftrag.findById(req.params.id)
    .then((result) => {
     res.setHeader("content-type", "application/json");
     res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
  
})
app.get("/auftragArry",(req, res) => {
  Auftrag.find()
    .then((result) => {
     res.setHeader("content-type", "application/json");
     res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
  
})

app.get("/auftrag-informationen/:id", (req, res) => {
  Auftrag.findById(req.params.id)
    .then((result) => {
      res.render("information", {
        mytite: "Auftrag-Inrformation",
        objekt_Auftrag: result,
       
      });
    })
    .catch((err) => {
      console.log(err);
    });
   
    
  
});

app.delete("/auftrag-informationen/:id", (req, res) => {
  Auftrag.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ Link: "/alle" });
    })
    .catch((err) => {
      console.log(err);
    });
});


app.get("/update/:id",(req, res) => {
 
  Auftrag.findById(req.params.id)
  .then((result) => {
    res.render("update", { mytite: "Update", obAuftrag: result });
  })
  .catch((err) => {
    console.log(err);
  });
});
app.get("/updateJson/:id",(req, res) => {
  Auftrag.findById(req.params.id)
    .then((result) => {
     res.setHeader("content-type", "application/json");
     res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
  
})



app.put(`/update/:id`,async (req,res ) => {
 
//  console.log(req.body);
  let neuAuftrag=req.body;
  let kundeId=neuAuftrag.kundeId;
  let auftragId=neuAuftrag.auftragsId;
  let LieferdatumUpdate=neuAuftrag.LieferdatumUpdate;
  



  let info=neuAuftrag.auftrag_InfoUpadat;
  console.log(info);
for (let index = 0; index < info.length; index++) {
  
  var AnzahlUpdate=info[index].AnzahlUpdate;
  var Teil_idUpdate=info[index].Teil_idUpdate;
  var ankommendeDatumUpdate=info[index].ankommendeDatumUpdate;



  const id = req.params.id;

  Auftrag.updateOne({_id:id},{$set:{Auftrag_id: auftragId,Kunde_ID: kundeId,Lieferdatum:LieferdatumUpdate,auftrag_Info:[{Anzahl:AnzahlUpdate,
    Teil_id:Teil_idUpdate, ankommendeDatum:ankommendeDatumUpdate}]}})
  .then((result) => {
    res.json({ Link: "/alle" });
  }).catch((err) => {
    console.log(err);
  })
}

 /*
  let auftrag=req.body;
try{
auftrag=await Auftrag.findById(req.params.id)
Auftrag.Lieferdatum=req.body.LieferdatumUpdate;
Auftrag.Anzahl=req.body.AnzahlUpdate;
Auftrag.Teil_id=req.body.Teil_idUpdate;
Auftrag.ankommenDatum=req.body.ankommendeDatumUpdate;
await auftrag.save();
console.log(auftrag);
res.redirect(`/alle`);
}catch{
if(auftrag==null){
  res.redirect(`/alle`)
}else{
  res.render("/",{
    auftrag:auftrag,
    errorMessage: "Error ubdating Auftrag"
  })

}
}
*/
  // const id = req.params.id;

  // const LieferdatumUpdate= req.body.LieferdatumUpdate;
  // const AnzahlUpdate= req.body.AnzahlUpdate;
  // const Teil_idUpdate= req.body.Teil_idUpdate;
  // const ankommendeDatumUpdate= req.body.ankommendeDatumUpdate;
  // let collection=connectDB.collection("auftrags");
  // collection.updateOne({_id:id},{$set:{Lieferdatum:LieferdatumUpdate,Anzhal:AnzahlUpdate,Teil_id:Teil_idUpdate,ankommendeDatum:ankommendeDatumUpdate}})
})
start();



app.use("/alle",alleAuftragRouter);
//  404
app.use((req, res) => {
  res.status(404).send("./views/not-fund.ejs");
});
