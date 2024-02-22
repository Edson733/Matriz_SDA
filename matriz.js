let matriz = []
let iniciado = false
        
function generarCoordenadasAleatorios(cuantosRandoms, limX, limY){
    let coordenadasAleatorias = [];
    for (let i = 0; i < cuantosRandoms; i++) {
        let coordenadaX = Math.floor(Math.random() * limX + 1);
        let coordenadaY = Math.floor(Math.random() * limY + 1);
        coordenadasAleatorias.push({ x: coordenadaX - 1, y: coordenadaY - 1});
    }
    return coordenadasAleatorias;
}

function pintarTabla(matriz, x, y, tiempo, cuadros){
    const contenedor_matriz = document.getElementById("matriz");
    const numerosRandoms = generarCoordenadasAleatorios(cuadros, x, y)
    let tabla = '<table>'

    //verificar que los cuadros a pintar no esten pintados
    let validorCambio = true
    for(let i = 0; i < numerosRandoms.length; i++){
        validorCambio = validorCambio && matriz[numerosRandoms[i].x][numerosRandoms[i].y] == 0
    }

    //si es valido cambiar a 1 las coordenadas
    if(validorCambio){
        for(let i = 0; i < numerosRandoms.length; i++){
            matriz[numerosRandoms[i].x][numerosRandoms[i].y] = 1  
        }
    }

    //mostrar tabla. las coordenadas que esten en 1 se pintaran de rojo
    for (let i = 0; i < x; i++) {
        tabla += '<tr>'
        for (let j = 0; j < y; j++) {
            if(matriz[i][j] == 1){
                tabla += '<td style="background-color: blue;">' + matriz[i][j] + '</td>'
            }else{
                tabla += '<td>' + matriz[i][j] + '</td>'
            }
        }
        tabla += '</tr>'
    }
    tabla += '</table>'
    contenedor_matriz.innerHTML = tabla
    setTimeout(() => {
        pintarTabla(matriz, x, y, tiempo, cuadros)
    },  tiempo * 1000);
}

function verificar(){
    let filas = document.getElementById("filas").value
    let columnas = document.getElementById("columnas").value
    let tiempo = document.getElementById("tiempo").value
    let cuadros = document.getElementById("cuadros").value

    let errores = new Map();

    if(!iniciado){
        iniciado = true
        //validar los campos
        //validar coordenada x individualmente
        if(filas){
            try {
                filas = Number(filas)
                if(Number.isInteger(filas)){
                    if(filas > 0 && filas < 101){
                        errores.set("filas", false)
                    }else{
                        alert("El campo de las Filas debe ser entre 1 y 100")
                        errores.set("filas", true)
                    }
                }else{
                    alert("El campo de las Filas debe ser un numero entero")
                    errores.set("filas", true)
                }
            } catch (error) {
                alert("El campo de las Filas debe ser un numero")
                errores.set("filas", true)
            }
        }else{
            alert("El campo de las Filas no puede estar vacio o contener caracteres especiales")
            errores.set("filas", true)
        }

        //validar coordenada y individualmente
        if(columnas){
            try {
                columnas = Number(columnas)
                if(Number.isInteger(columnas)){
                    if(columnas > 0 && columnas <= 100){
                        errores.set("columnas", false)
                    }else{
                        alert("El campo de las Columnas debe ser entre 1 y 100")
                        errores.set("columnas", true)
                    }
                }else{
                    alert("El campo de las Columnas debe ser un numero entero")
                    errores.set("columnas", true)
                }
            } catch (error) {
                alert("El campo de las Columnas debe ser un numero")
                errores.set("columnas", true)
            }
        }else{
            alert("El campo de las Columnas no puede estar vacio o contener caracteres especiales")
            errores.set("columnas", true)
        }

        //validar tiempo individualmente
        if(tiempo){
            try {
                tiempo = Number(tiempo)
                if(Number.isInteger(tiempo)){
                    if(tiempo > 0){
                        errores.set("tiempo", false)
                    }else{
                        alert("El campo del tiempo debe ser mayor a 0")
                        errores.set("tiempo", true)
                    }
                }else{
                    alert("El campo del tiempo debe ser un numero entero")
                    errores.set("tiempo", true)
                }
            } catch (error) {
                alert("El campo del tiempo debe ser un numero")
                errores.set("tiempo", true)
            }
        }else{
            alert("El campo del tiempo no puede estar vacio o contener caracteres especiales")
            errores.set("tiempo", true)
        }

        //validar cuadros individualmente
        if(cuadros){
            try {
                cuadros = Number(cuadros)
                if(Number.isInteger(cuadros)){
                    if(cuadros > 0){
                        errores.set("cuadros", false)
                    }else{
                        alert("El campo de los cuadros debe ser mayor a 0")
                        errores.set("cuadros", true)
                    }
                }else{
                    alert("El campo de los cuadros debe ser un numero entero")
                    errores.set("cuadros", true)
                }
            } catch (error) {
                alert("El campo de los cuadros debe ser un numero")
                errores.set("cuadros", true)
            }
        }else{
            alert("El campo de los cuadros no puede estar vacio o contener caracteres especiales")
            errores.set("cuadros", true)
        }

        //validar otros posibles errores
        if(filas * columnas <= cuadros){
            alert("El numero de cuadros no puede ser mayor o igual a la cantidad de cuadros que tiene la matriz")
            errores.set("cuadros", true)
        }

        if(filas * columnas % cuadros != 0){
            alert("El numero de cuadros debe ser multiplo de la cantidad de cuadros que tiene la matriz")
            errores.set("cuadros", true)
        }

        //validar errores
        if(!errores.get("filas") && !errores.get("columnas") && !errores.get("tiempo") && !errores.get("cuadros")){
            //crear matriz
            for (let i = 0; i < filas; i++) {
                matriz[i] = [];
                for (let j = 0; j < columnas; j++) {
                    matriz[i][j] = 0;
                }
            }
            pintarTabla(matriz, filas, columnas, tiempo, cuadros)  
        }
    }else{
        alert("Se ha pausado la ejecucion")
    }
}