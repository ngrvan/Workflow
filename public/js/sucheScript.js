
let inputId = document.getElementById("Auftrag_ID");
let inputKunde= document.getElementById("Kunde_ID");
var meinFormular = document.getElementById("meinFormular");

var ergebnis = document.getElementById("ergebnis");
var suchButton = document.getElementById("suchButton");
var kundeIdInputValue="";
var eingegebenerText = "";

suchButton.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Eingegebener Text:", eingegebenerText);

  kundeIdInputValue = document.getElementById("Kunde_ID").value;
  eingegebenerText = document.getElementById("Auftrag_ID").value;
  console.log("TEXT: " + eingegebenerText);

  var AuftragIDGefunden = false;
  fetch(`/auftragArry`)
    .then((result) => {
      return result.json();
    })
    .then((data) => {

      var objekteFuerKunde = [];
     
      data.forEach((element) => {
        //console.log(element.Auftrag_id);
       //console.log("Jiro Id"+element._id);
     // console.log(element);
        if ((parseInt(eingegebenerText)=== element.Auftrag_id) ) {
          //console.log(eingegebenerText);
         //console.log("Jiro Id"+element._id);
          console.log("fall gefunden");
          AuftragIDGefunden = true;
          meineURL = `/auftrag-informationen/${element._id}`;
          window.location.href = meineURL;
        }
        if(((parseInt(kundeIdInputValue)=== element.Kunde_ID))){
          objekteFuerKunde.push(element);               
        }
     });

     if(AuftragIDGefunden == false){           
        var toJson = JSON.stringify(objekteFuerKunde);
        meineURL = `/suche/${toJson}`;
        window.location.href = meineURL; 
    }   
     
    

     //post request

    });
  });
   