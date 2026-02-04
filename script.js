//Roba brutta____________________________________________________

var cell1 = document.getElementById("cell1");
var cell2 = document.getElementById("cell2");
var cell3 = document.getElementById("cell3");
var cell4 = document.getElementById("cell4");
var cell5 = document.getElementById("cell5");
var cell6 = document.getElementById("cell6");
var cell7 = document.getElementById("cell7");
var cell8 = document.getElementById("cell8");
var cell9 = document.getElementById("cell9");

var turno = 0;
var vittoria = false;
var segnoX = "X";
var segnoO = "O";

//Roba che funziona____________________________________________________

//stampa il segno in base al turno corrente e controlla se la cella è vuota
function stampaSegno() {
    if (this.textContent == "" && !vittoria) {
        if (turno % 2 === 0) {
            this.textContent = segnoX;
        } else {
            this.textContent = segnoO;
        }
        turno++;
        
        //check vittoria ad ogni mossa
        const vincitore = checkWin();
        if (vincitore) {
            alert(vincitore + " ha vinto!");
            document.getElementById("restart-container").classList.remove("hidden");
        }
    }
}

function checkWin() {
    // Tutte le combinazioni vincenti
    const winCombo = [
        // Righe
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        // Colonne
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        // Diagonali
        [1, 5, 9],
        [3, 5, 7]
    ];

    // Controlla ogni combinazione
    for (let combo of winCombo) {
        const [a, b, c] = combo;
        const cellA = document.getElementById("cell" + a).textContent;
        const cellB = document.getElementById("cell" + b).textContent;
        const cellC = document.getElementById("cell" + c).textContent;

        // Se tutte e 3 le celle hanno lo stesso segno e non sono vuote
        if (cellA !== "" && cellA === cellB && cellB === cellC) {
            vittoria = true;
            return cellA; // Ritorna "X" oppure "O"
        }
    }
    
    return null; // Nessun vincitore
}

cell1.addEventListener("click", stampaSegno);
cell2.addEventListener("click", stampaSegno);
cell3.addEventListener("click", stampaSegno);
cell4.addEventListener("click", stampaSegno);
cell5.addEventListener("click", stampaSegno);
cell6.addEventListener("click", stampaSegno);
cell7.addEventListener("click", stampaSegno);
cell8.addEventListener("click", stampaSegno);
cell9.addEventListener("click", stampaSegno);
