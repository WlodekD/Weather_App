import React from 'react';
import ReactDOM from 'react-dom';
import {LocationBox} from './locationBox.jsx';
import {TemperatureBox} from './temperatureBox.jsx';
import {AirQualityInfo} from './airQualityInfo.jsx';
import {PressHummBox} from './pressHummBox.jsx';
import {WindBox} from './windBox.jsx';


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
    render(){
        return <MainWrapper />
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});