import React from 'react';
import ReactDOM from 'react-dom';
import data from './getLocation.jsx';

document.addEventListener('DOMContentLoaded', function () {

    class Title extends React.Component {
        render(){

            const test = data;

            // console.log(test);


            return <h1>
                title
            </h1>
        }
    }

    class App extends React.Component {
        render(){
            return <Title />
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );

});
