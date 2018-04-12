import React from 'react';
import {getAPI} from './getLocation.jsx';

class WindBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {

                getAPI(position.coords.latitude, position.coords.longitude, (data) => {
                    if(data !== false){
                        this.setState({
                            windSpeed: data.wind.speed,
                            windDeg: data.wind.deg
                        });
                    }
                });
            });
        }
    };

    render(){

        const windSKm = this.state.windSpeed * 3.6;
        const windDeg = this.state.windDeg;

        this.windDirFunc = (num) => {
            const val = Math.floor((num / 22.5)+ 0.5);
            const windDir = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
            return windDir[(val % 16)];
        };

        const prefix = 'wi wi-wind towards-';
        const code = windDeg+'deg';
        const windIcon = prefix+code;


        return <div className='windBox'>
            <div>
                <p className='windSpeedDiv'>Prędkość wiatru:</p>
                <div>
                    <p>{windSKm} km/h</p>
                </div>
            </div>
            <div>
                <i className={windIcon}/>
            </div>
            <div>
                <p className='windDirDiv'>Kierunek wiatru:</p>
                <div>
                    <p>{this.windDirFunc(windDeg)}</p>
                </div>
            </div>
        </div>
    }
}

export {WindBox};