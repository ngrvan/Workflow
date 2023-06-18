const express=require("express");

const router=express.Router();

const Auftrag = require("../models/auftragSchema");

router.get("/", (req, res) => {
    Auftrag.find()
      .then((result) => {
        res.render("alle", { mytite: "Alle-Aufträge", arrAuftrag: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/", (req, res) => {
    const auftrag = new Auftrag(req.body);
    auftrag
      .save()
      .then((result) => {
        res.redirect("/alle");
      })
      .catch((err) => {
        console.log(err);
      });
  });

module.exports=router;