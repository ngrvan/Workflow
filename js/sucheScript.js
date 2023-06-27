
      let inputId = document.getElementById("Auftrag_ID");
      let inputKunde= document.getElementById("Kunde_ID");
      var meinFormular = document.getElementById("meinFormular");

      var ergebnis = document.getElementById("ergebnis");
      var suchButton = document.getElementById("suchButton");
      var kundeIdInputValue="";
      var eingegebenerText = "";
      inputId.addEventListener("input", function (event) {
        eingegebenerText = event.target.value;
      });
      inputKunde.addEventListener("input", function (event) {
        kundeIdInputValue = event.target.value;
      });

      suchButton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Eingegebener Text:", eingegebenerText);
 
        fetch(`/auftragArry`)
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            data.forEach((element) => {
              //console.log(element.Auftrag_id);
             //console.log("Jiro Id"+element._id);
               console.log(element);
              if ((parseInt(eingegebenerText)=== element.Auftrag_id) || ((parseInt(kundeIdInputValue)=== element.Kunde_ID))) {
                //console.log(eingegebenerText);
               //console.log("Jiro Id"+element._id);
                meineURL = `/auftrag-informationen/${element._id}`;
                //console.log(meineURL);

                window.location.href = meineURL;
              }
            });
          });
        });
   