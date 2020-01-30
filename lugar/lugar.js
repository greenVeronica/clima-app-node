const axios = require('axios');
const getLugarLtdLng = async(dir) => { //no es obligatorio  el async pero como la promesa la haremos await

    const encodeUrl = encodeURI(dir);

    //api para la geolocalizacion:

    //usando la api : https://rapidapi.com/dev132/api/city-geo-location-lookup
    //y el apikey
    //b316bb1d2dmsha09fa0dd295ddbcp12d03fjsn8315e653d6b8
    //NO ESTA FUNCIONANDO LA API



    //para leer la api desde NODE 
    /**
     * consultando una api se pueden usar las siguientes librerias

    	https://www.npmjs.com/package/axios: trabaja con promesas
    	o 
        https://www.npmjs.com/package/request: trabaja con callbacks
        usaremos axios
        para instalarlo no es necesario --save
        npm i axios
     */

    //como esta api necesita headers, se busca en axios como se configuran:
    const instance = axios.create({
        //baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=' + encodeUrl,
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeUrl}`,

        //  timeout: 1000, //ACA NO ES NECESARIO
        headers: { 'X-RapidAPI-Key': 'b316bb1d2dmsha09fa0dd295ddbcp12d03fjsn8315e653d6b8' }
    });


    //ahora ejecutaremsos como si fuera una promesa
    //usaremos la promesa con await

    /*version sin async y await
    instance.get().then(resp => {
            console.log(resp.data.Results[0].name)
                //console.log(resp.data.Results[0])
            let ltd = resp.data.Results[0].name
            let lng = resp.data.Results[0].name

            // para ver todos
            //     for (let i = 0; i < resp.data.Results.length; i++) {
            //     console.log(resp.data.Results[i].name);

            // }
            

        }) //solo traeremos el primero
        //instance.get().then(resp => console.log(resp.data.Results[0])) //solo traeremos el primero

    .catch(err => console.log('Error!!!!!! ', err));
    */
    const resp = await instance.get();
    if (resp.data.Results.length === 0) {
        //si es = 0 no lo encontro
        throw new Error(`no hay resultados para ${dir}`);

    }
    const respuesta = resp.data.Results[0];
    const direccion = respuesta.name;
    const ltd = respuesta.lat;
    const lng = respuesta.lon;


    return {
        direccion,
        ltd,
        lng
    }

}

module.exports = {
    getLugarLtdLng
}