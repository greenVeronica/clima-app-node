const axios = require('axios'); //para usar el servicio rest
const getClima = async(lat, lon) => { //no es obligatorio  el async pero como la promesa la haremos await



    ///api para el clima
    //https://openweathermap.org/
    //apikey para usar a492ad3f7bda3926ad8a476dd18c0e86
    //ejemplo de uso
    /*http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=a492ad3f7bda3926ad8a476dd18c0e86 */

    //otro ejemplo: ezeiza
    //http://api.openweathermap.org/data/2.5/weather?lat=-34.82&lon=-58.53&appid=a492ad3f7bda3926ad8a476dd18c0e86



    //como esta  api NO  necesita headers VA DIRECTO
    //como es una promesa puedo esperar haste que responda
    const respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a492ad3f7bda3926ad8a476dd18c0e86&units=metric`)
        // console.log(respuesta); //aca se ve que viene el data
        // console.log(respuesta.data);

    //main.temp

    // if (resp.data.Results.length === 0) {
    //     //si es = 0 no lo encontro
    //     throw new Error(`no hay clima para  el lugar seleccionado`);

    // }

    return respuesta.data.main.temp;

}

module.exports = {
    getClima
}