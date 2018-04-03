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
            url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=1bde6d90d3112473406ccd07e4aea6c6',
            dataType: 'json',
            method: 'GET'
        }).done(function (res) {
            console.log(res);
            // getWeather(res);
        }).fail(function () {
            console.log('something went wrong');
        })
    }

});

