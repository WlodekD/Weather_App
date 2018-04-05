import React from 'react';
import ReactDOM from 'react-dom';
import {getAPI} from './getLocation.jsx';


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {

        getAPI(position.coords.latitude, position.coords.longitude, (data) => {

            // i dupa.. zagrzebane
            console.log(data);

        });
    });
}

class App extends React.Component {
    render(){
        return  <h1>title</h1>
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});

// class GetData extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             data: false,
//         };
//     }
//
//     componentDidMount(){
//         getAPI(latitude,longitude, (data) => {
//             data.load().then(this.dataLoaded);
//         })
//     }
//
//     dataLoaded = data => this.setState({data});
//
//
//     render(){
//         if(this.state.data === false){
//             return null;
//         }
//
//         const elements = this.state.data.map(el => {
//             return <div>
//                 <h1>{el.name}</h1>
//                 <div>
//                     <span>{el.main.temp}</span>
//                     <span>{el.main.pressure}</span>
//                     <span>{el.main.humidity}</span>
//                     <span>{el.main.sea_level}</span>
//                 </div>
//             </div>
//         });
//
//         return <div>
//             {elements}
//         </div>
//     }
// }