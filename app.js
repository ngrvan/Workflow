//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const api = ` http://localhost:${port}`;
const cors = require("cors");
const auftragController = require("./controllers/auftragControllers");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



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


//Router
const alleAuftragRouter = require("./routes/alleR");
const auftragInfoRouter = require("./routes/auftragInfoR");
const updateRouter = require("./routes/updateR");

// Mongoose
const connectDB = require("./db/connect");

const { log } = require("console");

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Example app listening at ${api}`);
    });
  } catch (error) {
    console.log(error);
  }
};
//REST API Funkion
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

app.get("/auftragInfo/:id", auftragController.auftrag_json_info_get);
app.get("/auftragArry", auftragController.alle_auftraege_json_get);

app.get("/updateJson/:id", auftragController.auftrag_update_jsonId_get);

app.get("/suche/:json", auftragController.kundeid_auftraege_get);

start();

app.use("/alle", alleAuftragRouter);
app.use("/", auftragInfoRouter);
app.use("/", updateRouter);
//  404
app.use((req, res) => {
  res.status(404).render("404", { mytite: "Page Not Fund" });
});
