import React from 'react';

class AirQualityInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : false,
            lat: 0,
            long: 0
        }
    }

    componentDidMount() {
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/https://api.gios.gov.pl/pjp-api/rest/station/findAll',
            dataType: 'json',
            method: 'GET'
        }).done(function (res) {
            getAirData(res)
        }).fail(function () {
            console.log('something went wrong');
        });

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    lat: position.coords.latitude.toFixed(6),
                    long: position.coords.longitude.toFixed(6)
                })
            });
        }

        function getAirData(data) {
            // console.log(data[0].gegrLat);
            // console.log(data[0].gegrLon);
            console.log(data);
        }

    }

    render(){

        // if(this.state.data === false){
        //     return null;
        // }

        console.log(this.state.lat);
        console.log(this.state.long);

        return <div className='airQualityBox'>

        </div>
    }
}


export {AirQualityInfo}