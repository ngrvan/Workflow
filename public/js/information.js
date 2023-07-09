window.onload = function () {
    const select = document.querySelectorAll(".select");
    select.forEach((e) => {
      myfunktion(e);
    });
  };

  //onchange Funktion difinieren
  function myfunktion(obj) {
    //console.log(obj.parentNode);
    const btn = document.querySelector(".Delete");
    const auftragID = btn.getAttribute("data-linkid");
    //console.log(auftragID);
    fetch(`/auftragInfo/${auftragID}`)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        data.auftrag_Info.forEach((element) => {
          var str = element.Teil_id.substring(0, 3);
          //console.log(element);
          //console.log(str);
          if (element.Teil_id.includes(obj.value) && str === "DSK") {
            //console.log(element);

            document.getElementById("anzahl_1").innerHTML = element.Anzahl;
            document.getElementById("ankommenDatum1").innerHTML =
              element.ankommendeDatum;
            document.getElementById("vormerk1").innerHTML=element.Vormerk;

          }
          if (element.Teil_id.includes(obj.value) && str === "DPS") {
            //console.log(element);
            document.getElementById("anzahl_2").innerHTML = element.Anzahl;
            document.getElementById("ankommenDatum2").innerHTML =
              element.ankommendeDatum;
              document.getElementById("vormerk2").innerHTML=element.Vormerk;
          }
          if (element.Teil_id.includes(obj.value) && str === "DLG") {
            //console.log(element);

            document.getElementById("anzahl_3").innerHTML = element.Anzahl;
            document.getElementById("ankommenDatum3").innerHTML =
              element.ankommendeDatum;
              document.getElementById("vormerk3").innerHTML=element.Vormerk;
          }
          if (element.Teil_id.includes(obj.value) && str === "DSD") {
            //console.log(element);

            document.getElementById("anzahl").innerHTML = element.Anzahl;
            document.getElementById("ankommenDatum").innerHTML =
              element.ankommendeDatum;
              document.getElementById("vormerk").innerHTML=element.Vormerk;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(obj.value);
  }

  const btn = document.querySelector(".Delete");
  const auftragID = btn.getAttribute("data-linkid");

  btn.addEventListener("click", (e) => {
if (confirm("Möchten Sie den Auftrag wirklich löschen?")) {
fetch(`/auftrag-informationen/${auftragID}`, { method: "DELETE" })
  .then((response) => response.json())
  .then((data) => (window.location.href = data.Link))
  .catch((err) => {
    console.log(err);
  });
}
});
  fetch(`/auftragInfo/${auftragID}`)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
     // console.log(data);
      data.auftrag_Info.forEach((auftrag) => {
      //  console.log(data);
        const str = auftrag.Teil_id.substring(0, 3);
        const text = auftrag.Teil_id;
        const lastTenChars = text.slice(-7);
        if (str === "DSD") {
          let serviceSelect = document.getElementById("serviceSelect");
          let option = document.createElement("option");
          serviceSelect.add(option);
          option.text = lastTenChars;
        }
        if (str === "DSK") {
          let SystemConfSelect =
            document.getElementById("SystemConfSelect");
          let option = document.createElement("option");
          SystemConfSelect.add(option);

          option.text = lastTenChars;
        }

        if (str === "DPS") {
          let profisionalSelect =
            document.getElementById("profisionalSelect");
          let option = document.createElement("option");
          profisionalSelect.add(option);

          option.text = lastTenChars;
        }
        if (str === "DLG") {
          let logistikSelect = document.getElementById("logistikSelect");
          let option = document.createElement("option");
          logistikSelect.add(option);

          option.text = lastTenChars;
        }
      });
    });
 