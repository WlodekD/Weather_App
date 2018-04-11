import React from 'react';
import {getAPI} from './getLocation.jsx';

class PressHummBox extends React.Component{
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
                            pressure: data.main.pressure,
                            humidity: data.main.humidity
                        });
                    }
                });
            });
        }
    };

    render(){

        return <div className='pressHummBox'>
            <div className='pressure'>
                <p>Pressure</p>
                <p>{this.state.pressure} hPa</p>
            </div>
            <div className='humidity'>
                <p>Humidity</p>
                <p>{this.state.humidity}%</p>
            </div>
        </div>
    }
}

export {PressHummBox}
