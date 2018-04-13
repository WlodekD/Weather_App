import React from 'react';

class AirQualityInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lat: 0,
            long: 0,
            c6h6: '',
            co: '',
            no2: '',
            pm10: '',
            pm25: '',
            airColor: 'black'
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
                        pm25: data.pm25IndexLevel.indexLevelName,
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

        let airCol1 = '';
        let airCol2 = '';
        let airCol3 = '';
        let airCol4 = '';
        let airCol5 = '';

        if(this.state.c6h6 === "Bardzo dobry" || this.state.c6h6 === "Dobry"){
            airCol1 = 'green'
        } else if(this.state.c6h6 === "Umiarkowany"){
            airCol1 = 'orange'
        } else {
            airCol1 = 'red'
        }

        if(this.state.co === "Bardzo dobry" || this.state.co === "Dobry"){
            airCol2 = 'green'
        } else if(this.state.co === "Umiarkowany"){
            airCol2 = 'orange'
        } else {
            airCol2 = 'red'
        }

        if(this.state.co === "Bardzo dobry" || this.state.co === "Dobry"){
            airCol3 = 'green'
        } else if(this.state.co === "Umiarkowany"){
            airCol3 = 'orange'
        } else {
            airCol3 = 'red'
        }

        if(this.state.pm10 === "Bardzo dobry" || this.state.pm10 === "Dobry"){
            airCol4 = 'green'
        } else if(this.state.pm10 === "Umiarkowany"){
            airCol4 = 'orange'
        } else {
            airCol4 = 'red'
        }

        if(this.state.pm25 === "Bardzo dobry" || this.state.pm25 === "Dobry"){
            airCol5 = 'green'
        } else if(this.state.pm25 === "Umiarkowany"){
            airCol5 = 'orange'
        } else {
            airCol5 = 'red'
        }

        if(this.state.c6h6 === false){
            return null;
        } else {
            return <div className='airQualityBox'>
                <h1>Index jakości powietrza</h1>
                <div className='airQualityInfo1'>
                    <div className='chh6'>
                        <p><a href="http://www.chemiaibiznes.com.pl/aktualnosc/benzen-w-powietrzu-czy-jest-sie-czego-bac" target='_blank'>Wskaźnik benzenu</a></p>
                        <p style={{fontWeight: '700', color: airCol1, fontSize: '1rem'}}>{this.state.c6h6}</p>
                    </div>
                    <div className='co'>
                        <p><a href="https://pl.wikipedia.org/wiki/Tlenek_w%C4%99gla" target='_blank'>Wskaźnik tlenku węgla</a></p>
                        <p style={{fontWeight: '700', color: airCol2, fontSize: '1rem'}}>{this.state.co}</p>
                    </div>
                    <div className='no2'>
                        <p><a href="http://www.powietrze.podkarpackie.pl/index.php/item-85/ct-menu-item-87/ct-menu-item-89" target='_blank'>Wskaźnik dwutlenku azotu</a></p>
                        <p style={{fontWeight: '700', color: airCol3, fontSize: '1rem'}}>{this.state.no2}</p>
                    </div>
                </div>
                <hr/>
                <div className='airQualityInfo2'>
                    <div className='no2'>
                        <p><a href="http://sojp.wios.warszawa.pl/?page=pm" target='_blank'>Wskaźnik pyłów zawieszonych pm10</a></p>
                        <p style={{fontWeight: '700', color: airCol4, fontSize: '1rem'}}>{this.state.pm10}</p>
                    </div>
                    <div className='no2'>
                        <p><a href="http://sojp.wios.warszawa.pl/?page=pm" target='_blank'>Wskaźnik pyłów zawieszonych pm2.5</a></p>
                        <p style={{fontWeight: '700', color: airCol5, fontSize: '1rem'}}>{this.state.pm25}</p>
                    </div>
                </div>
                <hr/>
            </div>
        }
    }
}

export {AirQualityInfo}