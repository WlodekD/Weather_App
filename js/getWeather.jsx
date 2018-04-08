import React from 'react';
import ReactDOM from 'react-dom';
import {getAPI} from './getLocation.jsx';

class LocationNameComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : false,
            tempC: 'inline',
            tempF: 'none'
        }
    }

    componentDidMount(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {

                getAPI(position.coords.latitude, position.coords.longitude, (data) => {

                    if(data !== false){

                        this.setState({
                            data: data
                        });
                    }
                });
            });
        }
    };

    showTempInC = () => {
        this.setState({
            tempC: 'inline',
            tempF: 'none'
        });
    };

    showTempInF = () => {
        this.setState({
            tempC: 'none',
            tempF: 'inline'
        });
    };

    render(){
        if(this.state.data === false){
            return null;
        }

        console.log(this.state.data);

        const locationName = this.state.data.name;

        // in Celcius
        const tempC = this.state.data.main.temp - 273.15;
        const tempF = (this.state.data.main.temp - 273.15) * (9/5) + 32;
        const weatherIcon = this.state.data.weather[0].icon;

        return <div className='mainWrapper'>
                <div className='locationBox'>
                    <p className='locationName'>Your location: <span>{locationName}</span></p>
                </div>
                <div className='tempBox'>
                    <div><img src={"http://openweathermap.org/img/w/"+weatherIcon+".png"} alt="weather icon"/></div>
                    <p style={{display: this.state.tempC}}>{tempC}</p>
                    <p style={{display: this.state.tempF}}>{tempF}</p>
                    <a onClick={this.showTempInC} href="#">&deg;C</a>
                    <a>|</a>
                    <a onClick={this.showTempInF} href="#">&deg;F</a>
                </div>
            </div>
    }
}

class App extends React.Component {
    render(){
        return <LocationNameComponent />
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});