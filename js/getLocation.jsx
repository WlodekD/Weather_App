// const dataArr = [];
//
// $(function () {
//
//     let latitude = 0;
//     let longitude = 0;
//
//     $(function getLocation() {
//
//         if(navigator.geolocation){
//             navigator.geolocation.getCurrentPosition(getPosition);
//         }
//     });
//
//     function getPosition(position) {
//
//         latitude = position.coords.latitude;
//         longitude = position.coords.longitude;
//
//         getAPI(latitude,longitude);
//     }
//
//     function getAPI(lat,long) {
//         $.ajax({
//             url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=65abbbf90e06e64ea43e8b0ebaa43bb0',
//             dataType: 'json',
//             method: 'GET'
//         }).done(function (res) {
//             // console.log(res);
//             collectWeatherData(res);
//         }).fail(function () {
//             console.log('something went wrong');
//         });
//     }
// });
//
// let dataObj = '';
//
// function collectWeatherData(data){
//
//     const obj = [
//         {
//             name: data.name
//         },
//         {
//             humidity: data.main.humidity,
//             pressure: data.main.pressure,
//             temp: data.main.temp
//         },
//         {
//             windDirection: data.wind.deg,
//             windSpeed: data.wind.speed
//         }
//     ];
//
// }
//
// // module.exports = dataObj;
//

// *******************************************************************************

//
// let latitude = 0;
// let longitude = 0;
//
// $(function getLocation() {
//
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(getPosition);
//     }
// });
//
// function getPosition(position) {
//
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;
//
//     getAPI(latitude,longitude, (data) => {
//         // console.log(data);
//     })
// }




function getAPI(lat,long,callback) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=65abbbf90e06e64ea43e8b0ebaa43bb0',
        dataType: 'json',
        method: 'GET'
    }).done(function (res) {
        // console.log(res);
        callback(res);
    }).fail(function () {
        console.log('something went wrong');
    });
}

export {getAPI};

