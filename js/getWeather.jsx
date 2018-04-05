import React from 'react';
import ReactDOM from 'react-dom';
import {getAPI} from './getLocation.jsx';

$(function getLocation() {

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition);
    }
});

function getPosition(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getAPI(latitude,longitude, (data) => {

        // tu mam dane
        console.log(data);

    })
}

// co mam zrobić żeby je mieć tutaj

class Title extends React.Component {
    render(){

        return <h1>
            {/* // a najlepiej tutaj */}
            title
        </h1>
    }
}

class App extends React.Component {
    render(){
        return <Title />
    }
}


document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});