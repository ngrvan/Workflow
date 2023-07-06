const express=require("express");

const router=express.Router();
const auftragController=require("../controllers/auftragControllers");

router.get("/auftrag-informationen/:id",auftragController.auftrag_id_information_get  );

router.delete("/auftrag-informationen/:id", auftragController.delete_auftrag_id_delete  );

module.exports=router;