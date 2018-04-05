const dataArr = [];

$(function () {

    let latitude = 0;
    let longitude = 0;

    $(function getLocation() {

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getPosition);
        }
    });

    function getPosition(position) {

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        getAPI(latitude,longitude);
    }

    function getAPI(lat,long) {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=65abbbf90e06e64ea43e8b0ebaa43bb0',
            dataType: 'json',
            method: 'GET'
        }).done(function (res) {
            // console.log(res);
            collectWeatherData(res);
        }).fail(function () {
            console.log('something went wrong');
        });
    }
});


function collectWeatherData(data){

    const dataObj = [
        {
            name: data.name
        },
        {
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            temp: data.main.temp
        },
        {
            windDirection: data.wind.deg,
            windSpeed: data.wind.speed
        }
    ];

    console.log(dataObj);

}


// module.exports = dataObj;

