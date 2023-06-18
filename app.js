//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;
app.set("view engine", "ejs");
app.use(express.static("public"));
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


start();



app.use("/alle",alleAuftragRouter);
//  404
app.use((req, res) => {
  res.status(404).send("Die Seite exestiert nicht");
});
