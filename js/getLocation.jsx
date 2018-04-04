let dataArr = [];

$(function () {

    let latitude = 0;
    let longitude = 0;

    // pozyskanie danych geolokayjcnych
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

    // pobranie danych pogodowych z API dla konkretnej lokalizacji
    function getAPI(lat,long) {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=65abbbf90e06e64ea43e8b0ebaa43bb0',
            dataType: 'json',
            method: 'GET'
        }).done(function (res) {
            // console.log(res);
            exportsDataWeather(res);
        }).fail(function () {
            console.log('something went wrong');
        })
    }
});

// funkcja której jedyną rola to spuszować dane pogodowe do tablicy
// żebym mógł je eksportować
function exportsDataWeather(data){
    //
    dataArr.push(data);
}

module.exports = dataArr;
