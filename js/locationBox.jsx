import React from 'react';
import {getAPI} from './getLocation.jsx';


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

export {LocationBox}