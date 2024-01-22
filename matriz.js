let turno;

function iniciar() {
    detener();

    const filas = parseInt(document.getElementById("filas").value);
    const columnas = parseInt(document.getElementById("columnas").value);
    const tiempo = parseInt(document.getElementById("tiempo").value);
    const cuadros = parseInt(document.getElementById("cantidad").value);
    const tabla = document.getElementById("matriz");

    tabla.innerHTML = "";
    const matriz = Array.from({ length: filas }, () => Array(columnas).fill(0));

    turno = setInterval(() => {
        const llenar = [];
        for (let i = 0; i < cuadros; i++) {
            let corX, corY;
            do {
                corX = Math.floor(Math.random() * filas);
                corY = Math.floor(Math.random() * columnas);
            } while (matriz[corX][corY] === 1);
            matriz[corX][corY];
            llenar.push([corX, corY]);
        }

        for (let i = 0; i < filas; i++) {
            const fila = document.createElement("tr");
            for (let j = 0; j < columnas; j++) {
                const celda = document.createElement("td");
                if (matriz[i][j] === 1) {
                    celda.textContent = 'X';
                }
                fila.appendChild(celda);
            }
            tabla.appendChild(fila);
        }

        console.log("Cuadros llenados:", llenar);
    }, tiempo * 1000);
}

function detener() {
    clearInterval(turno);
}