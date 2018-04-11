import React from 'react';

class AirQualityInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lat: 0,
            long: 0,
        }
    }

    componentDidMount() {

        fetch('https://cors-anywhere.herokuapp.com/https://api.gios.gov.pl/pjp-api/rest/station/findAll').then( resp => {
            if (resp.ok)
                return resp.json();
            else
                throw new Error('Something went wrong');
        }).then( data => {

            const latU = Number(this.state.lat);
            const longU = Number(this.state.long);

            let minDist = Infinity;
            let closestID;
            data.forEach(el => {
               const {gegrLat, gegrLon, id} = el;
               const dist = (Math.abs(latU - gegrLat)) + (Math.abs(longU - gegrLon));
               if(dist < minDist){
                   minDist = dist;
                   closestID = id;
               }
            });

            this.getID(closestID);

        }).catch( err => {
            console.log('error! ', err);
        });

        this.getID = (id) => {
            fetch('https://cors-anywhere.herokuapp.com/https://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/'+id)
                .then(r => r.json())
                .then( data => {
                    this.setState({
                        c6h6: data.c6h6IndexLevel.indexLevelName,
                        co: data.coIndexLevel.indexLevelName,
                        no2: data.no2IndexLevel.indexLevelName,
                        pm10: data.pm10IndexLevel.indexLevelName,
                        pm25: data.pm25IndexLevel.indexLevelName
                    });
                });
        };

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    lat: position.coords.latitude.toFixed(4),
                    long: position.coords.longitude.toFixed(4)
                });
            });
        }
    }

    render(){

        if(this.state.c6h6 === false){
            return null;
        } else {
            return <div className='airQualityBox'>
                <h1>Index jakości powietrza</h1>
                <div className='airQualityInfo1'>
                    <div className='chh6'>
                        <p>Wskaźnik benzenu</p>
                        <p>{this.state.c6h6}</p>
                    </div>
                    <div className='co'>
                        <p>Wskaźnik tlenku węgla</p>
                        <p>{this.state.co}</p>
                    </div>
                    <div className='no2'>
                        <p>Wskaźnik dwutlenku azotu </p>
                        <p>{this.state.no2}</p>
                    </div>
                </div>
                <hr/>
                <div className='airQualityInfo2'>
                    <div className='no2'>
                        <p>Wskaźnik pyłów zawieszonych pm10 </p>
                        <p>{this.state.pm10}</p>
                    </div>
                    <div className='no2'>
                        <p>Wskaźnik pyłów zawieszonych pm2.5 </p>
                        <p>{this.state.pm25}</p>
                    </div>
                </div>
                </div>
        }
    }
}

export {AirQualityInfo}