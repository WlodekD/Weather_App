import React from 'react';

class AirQualityInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lat: 0,
            long: 0,
            closestStationName: '',
            c6h6: '',
            co: '',
            no2: '',
            pm10: '',
            pm25: '',
            airColor: 'black',

            divInfo: 'none',
            hideDiv: 'flex',

        };

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
            const stationsArr = [];

            let minDist = Infinity;
            let closestID;
            data.forEach(el => {
               const {gegrLat, gegrLon, id} = el;
               const dist = (Math.abs(latU - gegrLat)) + (Math.abs(longU - gegrLon));
               if(dist < minDist){
                   minDist = dist;
                   closestID = id;
                   stationsArr.push(el);
               }
            });

            const closestStationCity = stationsArr[stationsArr.length - 1].city.name;
            const closestStationStreet = stationsArr[stationsArr.length - 1].addressStreet;

            this.getClosestStationName(closestStationCity,closestStationStreet);
            this.getID(closestID);

        }).catch( err => {
            console.log('error! ', err);
        });

        this.getClosestStationName = (city, street) => {
            this.setState({
                closestStationName: city +', '+street,
            });
        };

        this.getID = (id) => {
            fetch('https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/'+id)
                .then(r => r.json())
                .then( data => {
                    if(data.c6h6IndexLevel !== null){
                        this.setState({
                            c6h6: data.c6h6IndexLevel.indexLevelName
                        })
                    } else {
                        this.setState({
                            c6h6: "Brak informacji z punktu pomiaru"
                        })
                    }

                    if(data.coIndexLevel !== null) {
                        this.setState({
                            co: data.coIndexLevel.indexLevelName
                        })
                    } else {
                        this.setState({
                            co: "Brak informacji z punktu pomiaru"
                        })
                    }

                    if(data.no2IndexLevel !== null){
                        this.setState({
                            no2: data.no2IndexLevel.indexLevelName
                        })
                    } else {
                        this.setState({
                            no2: "Brak informacji z punktu pomiaru"
                        })
                    }

                    if(data.pm10IndexLevel !== null){
                        this.setState({
                            pm10: data.pm10IndexLevel.indexLevelName
                        })
                    } else {
                        this.setState({
                            pm10: "Brak informacji z punktu pomiaru"
                        })
                    }

                    if(data.pm25IndexLevel !== null){
                        this.setState({
                            pm25: data.pm25IndexLevel.indexLevelName
                        })
                    }else {
                        this.setState({
                           pm25:  "Brak informacji z punktu pomiaru"
                        })
                    }
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

        this.clickAction1 = (e) => {

            this.setState({
                divInfo: "flex",
                hideDiv: 'none',
            });
        };

        this.clickAction2 = (e) => {

            this.setState({
                divInfo: "none",
                hideDiv: 'flex',
            });
        };

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

        return <div className='airQualityBox'>
            <hr className='hrStyle1'/>
            <div>
                <h1>Index jakości powietrza</h1>
                <h2>Twoja najbliższa stacja pomiaru:</h2>
                <p>{this.state.closestStationName}</p>
            </div>
            <div className='airQFlexBox'>

                <div onClick={this.clickAction2} style={{display: this.state.divInfo, width: '12rem', height: '10rem'}}>
                    <p>jakiś tekst1</p>
                </div>
                <div onClick={this.clickAction1} style={{display: this.state.hideDiv}}>
                    <p>Wskaźnik chh6</p>
                    <p style={{fontWeight: '700', color: airCol1, fontSize: '1rem'}}>{this.state.c6h6}</p>
                </div>


                <div onClick={this.clickAction2} style={{display: this.state.divInfo, width: '12rem', height: '10rem'}}>
                    <p>jakiś tekst 2</p>
                </div>
                <div onClick={this.clickAction1} style={{display: this.state.hideDiv}}>
                    <p>Wskaźnik co</p>
                    <p style={{fontWeight: '700', color: airCol2, fontSize: '1rem'}}>{this.state.co}</p>
                </div>

                <div>
                    <p>Wskaźnik no2</p>
                    <p style={{fontWeight: '700', color: airCol5, fontSize: '1rem'}}>{this.state.no2}</p>
                </div>

                <div>
                    <p>Wskaźnik pm10</p>
                    <p style={{fontWeight: '700', color: airCol3, fontSize: '1rem'}}>{this.state.pm10}</p>
                </div>

                <div>
                    <p>Wskaźnik pm2.5</p>
                    <p style={{fontWeight: '700', color: airCol4, fontSize: '1rem'}}>{this.state.pm25}</p>
                </div>

            </div>
            <hr className='hrStyle1'/>
        </div>
    }
}

export {AirQualityInfo}