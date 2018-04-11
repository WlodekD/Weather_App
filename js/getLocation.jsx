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
