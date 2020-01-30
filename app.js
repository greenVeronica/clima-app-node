const lugar = require('./lugar/lugar'); //ahora puedo usar directo la funcion
const clima = require('./clima/clima'); //ahora puedo usar directo la funcion


//como en este caso no usaremos muchos comandos
//hay una forma de configurar comandos aca desde el directorio raiz
//usando el options 
const argv = require('yargs').options({
    direccion: { //seria el --base del command
        demand: true, //obligatorio
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima'
    }

}).argv; //.argv para obtener los argumentos

//console.log(argv.direccion);
//.then(datos => console.log(datos))

////mi Primer version  de llamar a los dos servicios
//con promesas encadenadas

/************************************************************
lugar.getLugarLtdLng(argv.direccion) //regresa una promesa
    .then(respuesta => { //ahora llamo al clima
        console.log('version 1', respuesta.direccion, ' con una temperatura de')
            //con la latitud y longitud obtenidas llamo al clima
        clima.getClima(respuesta.ltd, respuesta.lng)
            .then(console.log) //ok
            .catch(respuesta => {
                console.log('No se pudo encontrar el clima de ', argv.direccion);
            });
    }) // es igual a decir .then(respuesta => console.log(respuesta))
    .catch(console.log);
 ********************************************************************/

//const getClima = async(lat, lon) => { }

const getInfo = async(direccion) => {

        try {
            //primero voya a buscar la ubicacion
            let localizacion = await lugar.getLugarLtdLng(argv.direccion); //esperaremos que de el resolve
            //ahora voy a buscar el clima
            let climaobtenido = await clima.getClima(localizacion.ltd, localizacion.lng);
            // console.log(respuesta);
            return `El clima de ${localizacion.direccion} es de ${climaobtenido} grados de temperatura`;

        } catch (e) {
            return `no se pudo determinar el clima de ${direccion}`
        }
    }
    //el clima de xxxxxx es de ttt temperatura
    //no se pudo determinar el clima de xxzzzz lugar
getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);