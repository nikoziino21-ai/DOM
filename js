// Funzione di supporto per aggiornare il contatore totale
function aggiornaContatore() {
  const lista = document.querySelector("#lista-task");
  const totale = document.querySelector("#totale-task");
  const conteggio = lista ? lista.querySelectorAll("li").length : 0;
  if (totale) {
    totale.textContent = "Totale: " + conteggio;
  }
}

// 1, 2, 7. aggiungiTask(testo, priorita)
function aggiungiTask(testo, priorita = "bassa") {
  const lista = document.querySelector("#lista-task");
  if (!lista) return;

  const li = document.createElement("li");

  // Assegnazione classe in base alla priorità
  const prioritaLower = priorita.toLowerCase();
  if (prioritaLower === "alta") {
    li.classList.add("priorita-alta");
  } else if (prioritaLower === "media") {
    li.classList.add("priorita-media");
  } else {
    li.classList.add("priorita-bassa");
  }

  // Testo principale del task
  const spanTesto = document.createElement("span");
  spanTesto.textContent = testo;
  li.appendChild(spanTesto);

  // Badge priorità
  const spanBadge = document.createElement("span");
  spanBadge.classList.add("badge");
  spanBadge.textContent = prioritaLower;
  li.appendChild(spanBadge);

  // Data e ora di creazione
  const spanData = document.createElement("span");
  spanData.classList.add("data");
  const oraAttuale = new Date().toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  spanData.textContent = oraAttuale;
  li.appendChild(spanData);

  // Bottone Elimina con ID univoco data-id
  const btnElimina = document.createElement("button");
  btnElimina.textContent = "Elimina";
  btnElimina.setAttribute("data-id", Date.now());
  li.appendChild(btnElimina);

  lista.appendChild(li);
  aggiornaContatore();
}

// 3. modificaTask(indice, nuovoTesto)
function modificaTask(indice, nuovoTesto) {
  const elementi = document.querySelectorAll("#lista-task li");
  if (elementi[indice]) {
    const primoSpan = elementi[indice].querySelector("span");
    if (primoSpan) {
      primoSpan.textContent = nuovoTesto;
    }
  }
}

// 4. rimuoviUltimo()
function rimuoviUltimo() {
  const lista = document.querySelector("#lista-task");
  if (!lista) return;
  const ultimo = lista.querySelector("li:last-child");
  if (ultimo) {
    ultimo.remove();
    aggiornaContatore();
  }
}

// 5. svuotaTutto()
function svuotaTutto() {
  const lista = document.querySelector("#lista-task");
  if (lista) {
    lista.innerHTML = "";
    aggiornaContatore();
  }
}

// 6. evidenzia(indice) / togliEvidenza(indice)
function evidenzia(indice) {
  const elementi = document.querySelectorAll("#lista-task li");
  if (elementi[indice]) {
    elementi[indice].classList.add("evidenziato");
  }
}

function togliEvidenza(indice) {
  const elementi = document.querySelectorAll("#lista-task li");
  if (elementi[indice]) {
    elementi[indice].classList.remove("evidenziato");
  }
}

// 8. contaPerPriorita()
function contaPerPriorita() {
  const conteggio = { alta: 0, media: 0, bassa: 0 };
  const elementi = document.querySelectorAll("#lista-task li");

  elementi.forEach(function(li) {
    if (li.classList.contains("priorita-alta")) {
      conteggio.alta++;
    } else if (li.classList.contains("priorita-media")) {
      conteggio.media++;
    } else if (li.classList.contains("priorita-bassa")) {
      conteggio.bassa++;
    }
  });

  console.log(conteggio);
  return conteggio;
}

// --- EXTRA ---

// 9. portaInCima(indice)
function portaInCima(indice) {
  const lista = document.querySelector("#lista-task");
  const elementi = document.querySelectorAll("#lista-task li");

  if (lista && elementi[indice] && elementi.length > 0) {
    lista.insertBefore(elementi[indice], lista.firstChild);
  }
}

// 10. infoTask(indice)
function infoTask(indice) {
  const elementi = document.querySelectorAll("#lista-task li");
  const task = elementi[indice];

  if (!task) {
    console.log("Task non trovato all'indice specificato.");
    return;
  }

  const testoSpan = task.querySelector("span");
  const testo = testoSpan ? testoSpan.textContent : task.textContent;
  const prev = task.previousElementSibling;
  const next = task.nextElementSibling;
  const parentTag = task.parentNode ? task.parentNode.tagName : null;

  console.log("Info Task " + indice + ":");
  console.log("- Testo:", testo);
  console.log("- Fratello precedente:", prev);
  console.log("- Fratello successivo:", next);
  console.log("- Tag Genitore:", parentTag);
}

// --- POPOLAMENTO INIZIALE (PAGINA) ---
// Popoliamo la lista all'avvio per replicare l'immagine di esempio
aggiungiTask("Pagare le bollette", "alta");
aggiungiTask("Studiare JavaScript", "media");
aggiungiTask("Comprare il pane", "bassa");
aggiungiTask("Chiamare il dentista", "alta");
aggiungiTask("Riposarsi", "bassa");

// Evidenziamo il secondo elemento (indice 1) come nell'immagine
evidenzia(1);
