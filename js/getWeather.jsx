import React from 'react';
import ReactDOM from 'react-dom';
import {getAPI} from './getLocation.jsx';
import weatherIcons from './icons.json';


class LocationBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : false,
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


    render(){
        if(this.state.data === false){
            return null;
        }

        const locationName = this.state.data.name;

        return <div className='locationBox'>
            <p className='locationName'>Your location: <span>{locationName}</span></p>
        </div>
    }
}

class TemperatureBox extends React.Component{
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
        const tempF = ((this.state.data.main.temp - 273.15) * (9/5) + 32).toFixed(1);

        const description = this.state.data.weather["0"].description;
        const prefix = 'wi wi-';
        const code = this.state.data.weather[0].id;
        let icon = weatherIcons[code].icon;

        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }

        icon = prefix+icon;

        return <div className='tempBox'>
            <div>
                <i className={icon}/>
                <p>{description}</p>
            </div>
            <div>
                <div>
                    <p style={{display: this.state.tempC}}>{tempC}</p>
                    <p style={{display: this.state.tempF}}>{tempF}</p>
                </div>
                <span>
                    <a onClick={this.showTempInC} href="#">&deg;C</a>
                    <a>|</a>
                    <a onClick={this.showTempInF} href="#">&deg;F</a>
                </span>
            </div>
        </div>
    }
}

class MainWrapper extends React.Component {

    render(){
        return <div className='mainWrapper'>
            <LocationBox />
            <TemperatureBox />
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