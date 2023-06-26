


const Auftrag = require("../models/auftragSchema");
const suche_auftrag_get=(req, res) => {
  res.render("suche", { mytite: "Suche" });
 
}
const auftrag_json_info_get =(req, res) => {
    Auftrag.findById(req.params.id)
      .then((result) => {
       res.setHeader("content-type", "application/json");
       res.send(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
      });
    
  }
const alle_auftraege_json_get=(req, res) => {
    Auftrag.find()
      .then((result) => {
       res.setHeader("content-type", "application/json");
       res.send(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
      });
    
  }
const auftrag_id_information_get=(req, res) => {
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
     
      
    
  }  
const delete_auftrag_id_delete=(req, res) => {
    Auftrag.findByIdAndDelete(req.params.id)
      .then((result) => {
        res.json({ Link: "/alle" });
      })
      .catch((err) => {
        console.log(err);
      });
  }  
const update_auftrag_id_get=(req, res) => {
 
    Auftrag.findById(req.params.id)
    .then((result) => {
      res.render("update", { mytite: "Update", obAuftrag: result });
    })
    .catch((err) => {
      console.log(err);
    });
  }  
const auftrag_update_jsonId_get=(req, res) => {
    Auftrag.findById(req.params.id)
      .then((result) => {
       res.setHeader("content-type", "application/json");
       res.send(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
      });
    
  }
const update_auftrag_id_put=(req, res) => {
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

    // Aktualisierung durch Aktualisierung des entsprechenden Objekts im Array
    updatePromises.push(
      Auftrag.updateOne(
        { 
          _id: id,
          auftrag_Info: {
            $elemMatch: { Teil_id: Teil_idUpdate } // Filtert das Array nach Teil_id
          } 
        },
        {
          $set: {
            Auftrag_id: auftragId,
            Kunde_ID: kundeId,
            Lieferdatum: LieferdatumUpdate,
            "auftrag_Info.$.Teil_id":Teil_idUpdate,
            "auftrag_Info.$.Anzahl": AnzahlUpdate, // Aktualisiert die Anzahl im entsprechenden Objekt
            "auftrag_Info.$.ankommendeDatum": ankommendeDatumUpdate // Aktualisiert das ankommendeDatum im entsprechenden Objekt
          }
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
}
const alle_auftraege_get=(req, res) => {
    Auftrag.find()
      .then((result) => {
        res.render("alle", { mytite: "Alle-Aufträge", arrAuftrag: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
const add_auftrag_post=(req, res) => {
    const auftrag = new Auftrag(req.body);
    auftrag
      .save()
      .then((result) => {
        res.redirect("/alle");
      })
      .catch((err) => {
        console.log(err);
      });
  }  

  module.exports={auftrag_json_info_get,
    alle_auftraege_json_get,
    auftrag_id_information_get,
    delete_auftrag_id_delete,
    update_auftrag_id_get,
    auftrag_update_jsonId_get,
    update_auftrag_id_put,
    alle_auftraege_get,
    add_auftrag_post,
    suche_auftrag_get
}