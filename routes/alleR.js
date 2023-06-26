const express=require("express");

const router=express.Router();
const Auftrag = require("../models/auftragSchema");

const auftragController=require("../controllers/auftragControllers");
router.get("/",auftragController.alle_auftraege_get);
  
  router.post("/",auftragController.add_auftrag_post   );

module.exports=router;