

function formatiereDatum() {
    const lieferdatumInput = document.getElementById("Lieferdatum");
    const lieferdatum = new Date(lieferdatumInput.value);
    
    const tag = lieferdatum.getDate();
    const monat = lieferdatum.getMonth() + 1;
    const jahr = lieferdatum.getFullYear();
    
    
    lieferdatumInput.textContent=jahr + "-" + monat + "-" + tag;
}
function formatiereDatumAnkommen() {
    const lieferdatumInput = document.getElementById("Datum_ankommmen");
    const lieferdatum = new Date(lieferdatumInput.value);
    
    const tag = lieferdatum.getDate();
    const monat = lieferdatum.getMonth() + 1;
    const jahr = lieferdatum.getFullYear();
    
    
    lieferdatumInput.textContent=jahr + "-" + monat + "-" + tag;
}
//<label for="auftrag_Info[0][Anzahl]">Anzahl: </label>
//<input name="auftrag_Info[0][Anzahl]" class="Anzahl" type="text" >


