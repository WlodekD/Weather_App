import React from 'react';
import ReactDOM from 'react-dom';
import {LocationBox} from './locationBox.jsx';
import {TemperatureBox} from './temperatureBox.jsx';
import {AirQualityInfo} from './airQualityInfo.jsx';
import {PressHummBox} from './pressHummBox.jsx';
import {WindBox} from './windBox.jsx';
import {getAPI} from './getLocation.jsx';

class MainWrapper extends React.Component {

    render(){

        return <div className='mainWrapper'>
            <LocationBox />
            <TemperatureBox />
            <AirQualityInfo />
            <PressHummBox />
            <WindBox />
        </div>
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : false,
            image: []
        }
    }

    componentDidMount(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {

                getAPI(position.coords.latitude, position.coords.longitude, (data) => {
                    // console.log(data);
                    if(data !== false){
                        this.setState({
                            data: data.weather[0].id,
                            image: data.weather[0].description
                        });
                    }
                });
            });
        }

        this.backgroundImg = () => {
        }
    };

    render(){

        const code = this.state.data;
        let weatherImg = 'clearSky';

        if(code === 800){
            weatherImg = 'clearSky'
        } else if(code >= 200 && code <= 232){
            weatherImg = 'thunder'
        } else if(code >= 300 && code <= 321){
            weatherImg = 'drizzleRain'
        } else if(code >= 500 && code <= 531){
            weatherImg = 'rain'
        } else if(code >= 600 && code <= 622){
            weatherImg = 'snow'
        } else if(code >= 701 && code <= 731){
            weatherImg = 'dayHaze'
        } else if(code >= 741 && code <= 781){
            weatherImg = 'fog'
        } else if(code >= 801 && code <= 804){
            weatherImg = 'cloudyGusts'
        } else if(code >= 900 && code <= 902){
            weatherImg = 'tornado'
        } else if(code >= 952 && code <= 962){
            weatherImg = 'windy'
        }

        const style = {
            backgroundImage: "url('./images/"+weatherImg+".jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        };

        return <div style={style}>
                <MainWrapper />
            </div>
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});