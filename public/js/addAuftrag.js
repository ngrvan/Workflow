let icon = document.getElementById("iconId");



icon.onclick = function() {
  let auftragDiv = document.getElementsByClassName("auftragInput");
  let count = auftragDiv.length;
  let neuDiv = auftragDiv[0].cloneNode(true);
  let labels = neuDiv.getElementsByTagName("label");
  let inputs = neuDiv.getElementsByTagName("input");
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
  }

  document.getElementById("iconId").before(neuDiv);
};

const form = document.getElementById("meinFormular");
const inputFields = document.getElementsByClassName("input");
const anzahl = document.getElementById("anzahl");
var auftragId;
form.addEventListener("submit",async (event) => {
    event.preventDefault();
  for (let i = 0; i < inputFields.length; i++) {
    const input = inputFields[i];

    // Eingabe überprüfen und anpassen
    if (input.value < 0) {
      input.value = "";
      alert("Sie haben eine negative Zahl eingegeben!");
      return; // Abbruch, wenn eine negative Zahl gefunden wurde
    }
  }
   auftragId=document.getElementById("Auftrag_id").value;
console.log(auftragId);
  try {
    const response = await fetch(`/auftragArry`);
    const data = await response.json();

    let auftragIdExists = false;
 for (let i = 0; i < data.length; i++) {
      if (data[i].Auftrag_id.toString() === auftragId.toString()) {
        console.log(data[i]);
        console.log("gefunden");
        auftragIdExists = true;
        break;
      }
    } 
    

    if (auftragIdExists) {
      alert("Auftrag Id existiert schon!");
    } else {
      // Eingabe überprüfen
      if (anzahl.value < 0 || isNaN(anzahl.value)) {
        alert("Sie haben eine negative Zahl oder ein ungültiges Zeichen eingegeben!");
        return; // Abbruch, wenn eine negative Zahl oder ein ungültiges Zeichen gefunden wurde
      }

      // Bestätigung anzeigen
      if (!confirm("Möchten Sie fortsetzen?")) {
        return; // Abbruch, wenn die Bestätigung abgelehnt wurde
      }

      // Formular absenden
      form.submit();
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Auftragsdaten:", error);
    alert("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
  }
});