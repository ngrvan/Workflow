const express=require("express");

const router=express.Router();
const auftragController=require("../controllers/auftragControllers");

router.get("/update/:id",auftragController.update_auftrag_id_get );
  
router.put("/update/:id",auftragController.update_auftrag_id_put);

module.exports=router;