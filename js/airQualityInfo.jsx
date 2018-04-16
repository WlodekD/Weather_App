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
            airColor: 'black',
            airInfo: 'none'
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

        this.clickAction = (e) => {
            console.log('click');
        }
    }


    render(){

        let airCol1 = '';
        let airCol2 = '';
        let airCol3 = '';
        let airCol4 = '';
        let airCol5 = '';

        switch (this.state.c6h6) {
            case "Bardzo dobry":
                airCol1 = 'rgb(20,125,10)';
                break;
            case "Dobry":
                airCol1 = 'rgb(32,196,16)';
                break;
            case "Umiarkowany":
                airCol1 = 'rgb(237,196,14)';
                break;
            case "Dostateczny":
                airCol1 = 'rgb(239,110,22)';
                break;
            case "Zły":
                airCol1 = 'rgb(239,51,30)';
                break;
            case "Bardzo zły":
                airCol1 = 'rgb(140,30,17)';
                break;
        }

        switch (this.state.co) {
            case "Bardzo dobry":
                airCol2 = 'rgb(20,125,10)';
                break;
            case "Dobry":
                airCol2 = 'rgb(32,196,16)';
                break;
            case "Umiarkowany":
                airCol2 = 'rgb(237,196,14)';
                break;
            case "Dostateczny":
                airCol2 = 'rgb(239,110,22)';
                break;
            case "Zły":
                airCol2 = 'rgb(239,51,30)';
                break;
            case "Bardzo zły":
                airCol2 = 'rgb(140,30,17)';
                break;
        }

        switch (this.state.pm10) {
            case "Bardzo dobry":
                airCol3 = 'rgb(20,125,10)';
                break;
            case "Dobry":
                airCol3 = 'rgb(32,196,16)';
                break;
            case "Umiarkowany":
                airCol3 = 'rgb(237,196,14)';
                break;
            case "Dostateczny":
                airCol3 = 'rgb(239,110,22)';
                break;
            case "Zły":
                airCol3 = 'rgb(239,51,30)';
                break;
            case "Bardzo zły":
                airCol3 = 'rgb(140,30,17)';
                break;
        }

        switch (this.state.pm25) {
            case "Bardzo dobry":
                airCol4 = 'rgb(20,125,10)';
                break;
            case "Dobry":
                airCol4 = 'rgb(32,196,16)';
                break;
            case "Umiarkowany":
                airCol4 = 'rgb(237,196,14)';
                break;
            case "Dostateczny":
                airCol4 = 'rgb(239,110,22)';
                break;
            case "Zły":
                airCol4 = 'rgb(239,51,30)';
                break;
            case "Bardzo zły":
                airCol4 = 'rgb(140,30,17)';
        }

        switch (this.state.no2) {
            case "Bardzo dobry":
                airCol5 = 'rgb(20,125,10)';
                break;
            case "Dobry":
                airCol5 = 'rgb(32,196,16)';
                break;
            case "Umiarkowany":
                airCol5 = 'rgb(237,196,14)';
                break;
            case "Dostateczny":
                airCol5 = 'rgb(239,110,22)';
                break;
            case "Zły":
                airCol5 = 'rgb(239,51,30)';
                break;
            case 'Bardzo zły':
                airCol5 = 'rgb(140,30,17)';
                break;
        }

        if(this.state.c6h6 === false){
            return null;
        } else {
            return <div className='airQualityBox'>
                <hr className='hrStyle1'/>
                <div>
                    <h1>Index jakości powietrza</h1>
                </div>
                <div className='airQFlexBox'>
                    <div onClick={this.clickAction} className='chh6'>
                        {/*<a href="http://www.chemiaibiznes.com.pl/aktualnosc/benzen-w-powietrzu-czy-jest-sie-czego-bac" target='_blank'>Wskaźnik chh6</a>*/}
                        <div style={{display: this.state.airInfo}}>
                            <p>jakiś tak opis</p>
                        </div>
                        <p>Wskaźnik chh6</p>
                        <p style={{fontWeight: '700', color: airCol1, fontSize: '1rem'}}>{this.state.c6h6}</p>
                    </div>
                    <div className='co'>
                        {/*<a href="https://pl.wikipedia.org/wiki/Tlenek_w%C4%99gla" target='_blank'>Wskaźnik co</a>*/}
                        <p>Wskaźnik co</p>
                        <p style={{fontWeight: '700', color: airCol2, fontSize: '1rem'}}>{this.state.co}</p>
                    </div>
                    <div className='no2'>
                        {/*<a href="http://www.powietrze.podkarpackie.pl/index.php/item-85/ct-menu-item-87/ct-menu-item-89" target='_blank'>Wskaźnik no2</a>*/}
                        <p>Wskaźnik no2</p>
                        <p style={{fontWeight: '700', color: airCol5, fontSize: '1rem'}}>{this.state.no2}</p>
                    </div>
                    <div className='no2'>
                        {/*<a href="http://sojp.wios.warszawa.pl/?page=pm" target='_blank'>Wskaźnik pm10</a>*/}
                        <p>Wskaźnik pm10</p>
                        <p style={{fontWeight: '700', color: airCol3, fontSize: '1rem'}}>{this.state.pm10}</p>
                    </div>
                    <div className='no2'>
                        {/*<a href="http://sojp.wios.warszawa.pl/?page=pm" target='_blank'>Wskaźnik pm2.5</a>*/}
                        <p>Wskaźnik pm2.5</p>
                        <p style={{fontWeight: '700', color: airCol4, fontSize: '1rem'}}>{this.state.pm25}</p>
                    </div>
                </div>
                <hr className='hrStyle1'/>
            </div>
        }
    }
}

export {AirQualityInfo}