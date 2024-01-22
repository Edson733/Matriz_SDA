let intervalo;
let matrix = [];

function crearMatriz(filas, columnas) {
    matrix = [];
    const tabla = document.getElementById('matriz');
    tabla.innerHTML = '';

    for (let i = 0; i < filas; i++) {
        const fila = [];
        const tr = document.createElement('tr');
        
        for (let j = 0; j < columnas; j++) {
            const td = document.createElement('td');
            fila.push(false);
            tr.appendChild(td);
        }
        matrix.push(fila);
        tabla.appendChild(tr);
    }
}

function iniciar() {
    const filas = parseInt(document.getElementById('filas').value);
    const columnas = parseInt(document.getElementById('columnas').value);
    const tiempo = parseInt(document.getElementById('tiempo').value * 1000);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (isNaN(filas) || isNaN(columnas) || isNaN(tiempo) || isNaN(cantidad) || filas < 1 || columnas < 1 || tiempo < 1 || cantidad < 1) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    crearMatriz(filas, columnas);
    intervalo = setInterval(() => {
        pintarCuadros(cantidad);
    }, tiempo);
}

function pintarCuadros(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        const fil = Math.floor(Math.random() * matrix.length);
        const col = Math.floor(Math.random() * matrix[0].length);

        if (matrix[fil][col]) {
            detener();
            alert('El programa se ha detenido, alguno de los cuadros esta ocupado.');
            return;            
        }

        matrix[fil][col] = true;
        document.getElementsByTagName('td')[row * matrix[0].length + col].style.backgroundColor = 'blue';
    }
}

function detener() {
    clearInterval(intervalo);
    limpiar();
}

function limpiar() {
    location.reload();
}