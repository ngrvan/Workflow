const mongoose= require("mongoose");
const Schema= mongoose.Schema;


// define the Schema (the structure of the article)
const auftragSchema = new Schema({
    Auftrag_id: {type: Number, required:true},
    Kunde_ID: {type: Number, required:true},
    Lieferdatum:{type: String, required:true , trim:true},
      
   auftrag_Info: [{  
    
    Anzahl: {type: Number, required:true},
    Teil_id: {type: String, required:true, trim:true},
    ankommendeDatum: {type: String, required:true , trim:true},
    Vormerk: {type: String}}]
    
  
  });
  

  const Auftrag = mongoose.model('Auftrag', auftragSchema);
  module.exports = Auftrag; 