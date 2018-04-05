import React from 'react';
import ReactDOM from 'react-dom';
import {getAPI} from './getLocation.jsx';

class Test extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : false
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

        console.log(this.state.data);

        return <div>
                <h1>{this.state.data.name}</h1>
            </div>
    }
}

class App extends React.Component {
    render(){
        return <Test />
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});