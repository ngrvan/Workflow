 
        const btn = document.querySelector(".create");
        const obAuftragID = btn.getAttribute("data-linkid");
        
        let Auftrag_id = document.getElementById("Auftrag_id");
        let Kunde_ID = document.getElementById("Kunde_ID");
        let Lieferdatum = document.getElementById("Lieferdatum");
        
        var auftrag_Info = [];
        
        var Infolength;
        
        var anzahl = document.getElementById("anzahlId0");
        var Teil_id = document.getElementById("teilId0");
        var ankommenDatum = document.getElementById("ankommenId0");
        
        fetch(`/updateJson/${obAuftragID}`)
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            _id = data._id;
        
            Auftrag_id.setAttribute("value", data.Auftrag_id);
            Kunde_ID.setAttribute("value", data.Kunde_ID);
            Lieferdatum.setAttribute("value", data.Lieferdatum);
        
            Infolength = data.auftrag_Info.length;
        
            if (Infolength > 0) {
              var auftragDiv = document.getElementsByClassName("auftragInput");
        
              var neuDiv;
        
              var container = document.getElementById("container");
              for (let index = 0; index < Infolength - 1; index++) {
                neuDiv = auftragDiv[0].cloneNode(true);
        
                var count = auftragDiv.length;
                var labels = neuDiv.getElementsByTagName("label");
                var inputs = neuDiv.getElementsByTagName("input");
        
                for (let index = 0; index < labels.length; index++) {
                  labels[index].htmlFor = labels[index].htmlFor.replace(
                    "0",
                    count.toString()
                  );
                }
                for (let index = 0; index < inputs.length; index++) {
                  inputs[index].name = inputs[index].name.replace(
                    "0",
                    count.toString()
                  );
                  inputs[index].id = inputs[index].id.replace(
                    "0",
                    count.toString()
                  );
                }
        
                container.appendChild(neuDiv);
              }
        
              for (var i = 0; i < Infolength; i++) {
                anzahl = document.getElementById(`anzahlId${i}`);
                Teil_id = document.getElementById(`teilId${i}`);
                ankommendeDatum = document.getElementById(`ankommenId${i}`);
        
                anzahl.setAttribute("value", data.auftrag_Info[i].Anzahl);
                Teil_id.setAttribute("value", data.auftrag_Info[i].Teil_id);
                ankommendeDatum.setAttribute(
                  "value",
                  data.auftrag_Info[i].ankommendeDatum
                );
        
                var obj = {
                  anzahl: anzahl,
                  Teil_id: Teil_id,
                  ankommendeDatum: ankommenDatum
                };
                auftrag_Info.push(obj);
                auftrag_Info.forEach((element) => {
               
                });
              }
            }
          });
        
        const form = document.getElementById("meinFormular");
        
        form.addEventListener("submit", (event) => {
          if (anzahl.value < 0 || isNaN(anzahl.value) || Teil_id.value < 0 || Auftrag_id.value < 0 || Kunde_ID.value < 0) {
            event.preventDefault();
            anzahl.value = "";
            alert("Sie haben eine negative Zahl oder ein ungültiges Zeichen eingegeben!");
          } else {
            if (confirm("Möchten Sie den Auftrag andern?")) {
              event.preventDefault();
              const kundeId = Kunde_ID.value;
              const auftragsId = Auftrag_id.value;
              const LieferdatumUpdate = Lieferdatum.value;
              var AnzahlUpdate, Teil_idUpdate, ankommendeDatumUpdate;
        
              const id = _id;
        
              const auftrag_InfoUpadat = [];
        
              for (let index = 0; index < Infolength; index++) {
                const objUp = {};
                objUp.AnzahlUpdate = auftrag_Info[index].anzahl.value;
                objUp.Teil_idUpdate = auftrag_Info[index].Teil_id.value;
                objUp.ankommendeDatumUpdate = auftrag_Info[index].ankommendeDatum.value;
                auftrag_InfoUpadat.push(objUp);
              }
        
              auftrag_InfoUpadat.forEach((element) => {
                console.log(element);
              });
        
              console.log(AnzahlUpdate);
        
              console.log(auftrag_InfoUpadat);
        
              console.log("Sending" + JSON.stringify());
              var daten = JSON.stringify({
                _id,
                auftragsId,
                kundeId,
                LieferdatumUpdate,
                auftrag_InfoUpadat,
              });
              console.log(daten);
        
              fetch(`/update/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: daten,
              })
                .then((response) => response.json())
                .then((data) => {
                  window.location.href = data.Link;
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }
          }
        });
        