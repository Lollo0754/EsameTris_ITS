//____________________________________________________

//caselle giocabili
var cell1 = document.getElementById("cell1");
var cell2 = document.getElementById("cell2");
var cell3 = document.getElementById("cell3");
var cell4 = document.getElementById("cell4");
var cell5 = document.getElementById("cell5");
var cell6 = document.getElementById("cell6");
var cell7 = document.getElementById("cell7");
var cell8 = document.getElementById("cell8");
var cell9 = document.getElementById("cell9");

//caselle marcatore drag and drop
var Xcell = document.getElementById("Xcell");
var Ocell = document.getElementById("Ocell");

//variabili di gioco
var turno = 0;
var vittoria = false;
var segnoX = "X";
var segnoO = "O";
var draggedSegno = null;
var lastWinner = null;

//____________________________________________________

function dragStart(e) {
    // Determina quale segno dovrebbe essere trascinato in questo turno
    let turnoAttuale;
    if (turno % 2 === 0) {
        turnoAttuale = segnoX;
    } else {
        turnoAttuale = segnoO;
    }
    const segnoTrascinato = this.textContent.trim();
    
    // Se non è il segno giusto, blocca il drag
    if (segnoTrascinato !== turnoAttuale) {
        e.preventDefault();
        return;
    }
    
    draggedSegno = turnoAttuale;
    e.dataTransfer.effectAllowed = "copy";
}

function dragOver(e) {
    // Permette il drop
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
}

function drop(e) {
    // Gestisce il drop
    e.preventDefault();
    if (this.textContent == "" && !vittoria && draggedSegno !== null) {
        this.textContent = draggedSegno;
        // aggiunge classe per colorare il segno nelle celle
        if (draggedSegno === segnoX) this.classList.add('x');
        else this.classList.add('o');
        turno++;
        updateTurnBackground();
        updateTurnDisplay();
        draggedSegno = null;
        
        //check vittoria ad ogni mossa
        const vincitore = checkWin();
        if (vincitore) {
            document.getElementById("message").textContent = vincitore + " ha vinto!";
            document.getElementById("restart-container").classList.remove("hidden");
            vittoria = true;
            lastWinner = vincitore;
            updateTurnBackground();
        }
    }
}

function updateTurnDisplay(){
    // aggiorna il display del turno corrente
    let currentPlayer;
    if (turno % 2 === 0) {
        currentPlayer = segnoX;
    } else {
        currentPlayer = segnoO;
    }
    document.getElementById("turn-player").textContent = currentPlayer;
}

function updateTurnBackground(){
    // aggiorna lo sfondo a seconda di chi tocca o chi ha vinto
    const root = document.documentElement;
    if(vittoria && lastWinner){
        if(lastWinner === segnoX) root.style.setProperty('--bg', '#5151fc');
        else root.style.setProperty('--bg', '#fc5451');
        return;
    }

    // turno attuale: se turno è pari -> tocca a X
    if(turno % 2 === 0){
        root.style.setProperty('--bg', '#5151fc');
    } else {
        root.style.setProperty('--bg', '#fc5451');
    }
}

function checkWin() {
    // effettua il controllo di vittoria
    // tutte le combinazioni vincenti
    const winCombo = [
        // righe
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        // colonne
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        // diagonali
        [1, 5, 9],
        [3, 5, 7]
    ];

    // controlla ogni combinazione
    for (let combo of winCombo) {
        const [a, b, c] = combo;
        const cellA = document.getElementById("cell" + a).textContent;
        const cellB = document.getElementById("cell" + b).textContent;
        const cellC = document.getElementById("cell" + c).textContent;

        // se tutte e 3 le celle hanno lo stesso segno e non sono vuote
        if (cellA !== "" && cellA === cellB && cellB === cellC) {
            vittoria = true;
            return cellA; // ritorna "X" oppure "O"
        }
    }
    
    return null; // nessun vincitore
}

// drag and drop per le celle marcatore X e O
Xcell.addEventListener("dragstart", dragStart);
Ocell.addEventListener("dragstart", dragStart);

// drop sulle celle del tabellone di gioco
cell1.addEventListener("dragover", dragOver);
cell2.addEventListener("dragover", dragOver);
cell3.addEventListener("dragover", dragOver);
cell4.addEventListener("dragover", dragOver);
cell5.addEventListener("dragover", dragOver);
cell6.addEventListener("dragover", dragOver);
cell7.addEventListener("dragover", dragOver);
cell8.addEventListener("dragover", dragOver);
cell9.addEventListener("dragover", dragOver);

// drop event listeners
cell1.addEventListener("drop", drop);
cell2.addEventListener("drop", drop);
cell3.addEventListener("drop", drop);
cell4.addEventListener("drop", drop);
cell5.addEventListener("drop", drop);
cell6.addEventListener("drop", drop);
cell7.addEventListener("drop", drop);
cell8.addEventListener("drop", drop);
cell9.addEventListener("drop", drop);
