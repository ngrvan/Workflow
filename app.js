//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;
const bodyParser=require("body-parser");

const api=` http://localhost:${port}`;
const cors= require("cors");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const auftragController=require("./controllers/auftragControllers");


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
      console.log(`Example app listening at ${api}`);
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

app.get("/Suche", auftragController.suche_auftrag_get);
//REST API Funkion
app.get("/auftragInfo/:id",auftragController.auftrag_json_info_get)
app.get("/auftragArry",auftragController.alle_auftraege_json_get)

app.get("/auftrag-informationen/:id",auftragController.auftrag_id_information_get  );

app.delete("/auftrag-informationen/:id", auftragController.delete_auftrag_id_delete  );


app.get("/update/:id",auftragController.update_auftrag_id_get  );

app.get('/js/sucheScript.js', function(req, res) {     res.sendFile("C:/test/Workflow/js/sucheScript.js"); }); 

app.get("/updateJson/:id",auftragController.auftrag_update_jsonId_get);


app.put("/update/:id",auftragController.update_auftrag_id_put);
app.get("/suche/:json",auftragController.kundeid_auftraege_get )
/* app.put(`/update/:id`, (req,res ) => {
 
    console.log(req.body);
    let neuAuftrag=req.body;
    let kundeId=neuAuftrag.kundeId;
    let auftragId=neuAuftrag.auftragsId;
    let LieferdatumUpdate=neuAuftrag.LieferdatumUpdate;
    
  
    const id = req.params.id;
  
  
    let info=neuAuftrag.auftrag_InfoUpadat;
    var AnzahlUpdate;
    var Teil_idUpdate
  
  
    var ankommendeDatumUpdate;
  for (let index = 0; index < info.length; index++) {
    
     AnzahlUpdate=info[index].AnzahlUpdate;
     Teil_idUpdate=info[index].Teil_idUpdate;
     ankommendeDatumUpdate=info[index].ankommendeDatumUpdate;
  console.log("anzahl :" + AnzahlUpdate + " teil: " + Teil_idUpdate + " ankommen : " + ankommendeDatumUpdate);
  
  
  
    Auftrag.updateOne({_id:id},{$set:{Auftrag_id: auftragId,Kunde_ID: kundeId,Lieferdatum:LieferdatumUpdate,auftrag_Info:[{Anzahl:AnzahlUpdate,
      Teil_id:Teil_idUpdate, ankommendeDatum:ankommendeDatumUpdate}]}})
    .then((result) => {
      res.json({ Link: "/alle" });
    }).catch((err) => {
      console.log(err);
    })
  }
  
  
  
  }) */
   /* app.put(`/update/:id`, (req, res) => {
    console.log(req.body);
    let neuAuftrag = req.body;
    let kundeId = neuAuftrag.kundeId;
    let auftragId = neuAuftrag.auftragsId;
    let LieferdatumUpdate = neuAuftrag.LieferdatumUpdate;
  
    const id = req.params.id;
  
    let info = neuAuftrag.auftrag_InfoUpadat;
    let updatePromises = []; // Array für die Promises der Aktualisierungen
  
    for (let index = 0; index < info.length; index++) {
      let AnzahlUpdate = info[index].AnzahlUpdate;
      let Teil_idUpdate = info[index].Teil_idUpdate;
      let ankommendeDatumUpdate = info[index].ankommendeDatumUpdate;
      console.log("anzahl: " + AnzahlUpdate + ", teil: " + Teil_idUpdate + ", ankommen: " + ankommendeDatumUpdate);
  
      // Aktualisierte Objektstruktur
      let updatedObject = {
        Anzahl: AnzahlUpdate,
        Teil_id: Teil_idUpdate,
        ankommendeDatum: ankommendeDatumUpdate
      };
  
      // Aktualisierung durch Hinzufügen des neuen Objekts zum vorhandenen Array
      updatePromises.push(
        Auftrag.updateOne(
          { _id: id },
          {
            $set: {
              Auftrag_id: auftragId,
              Kunde_ID: kundeId,
              Lieferdatum: LieferdatumUpdate,
            },
            $push: { auftrag_Info: updatedObject } // Hinzufügen des neuen Objekts zum Array
          }
        )
      );
    }
  
    Promise.all(updatePromises)
      .then((results) => {
        res.json({ Link: "/alle" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Fehler beim Aktualisieren des Auftrags" });
      });
  });  */
  
  

  
start();



app.use("/alle",alleAuftragRouter);
//  404
app.use((req, res) => {
  res.status(404).render("404", { mytite: "Page Not Fund"})
});
