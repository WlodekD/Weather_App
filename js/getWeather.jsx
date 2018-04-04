import React from 'react';
import ReactDOM from 'react-dom';
import data from './getLocation.jsx';

document.addEventListener('DOMContentLoaded', function () {

    class App extends React.Component {



        render(){

            // plan mam taki że z modułu getLocation chćę wyeksportować dane do innych modułów w których z wykorzystaniem React
            // będę budował elementy i komponenty aplikacji

            // problem jest tego typu że w consol.logu widzę obiekt ale nie mogę się do niego dostać
            // przy obiekcie w console.log pojawia mi się info: Value below was evaluated just now
            // szukałem o tym info i znalazłem to że console.log uruchamia się pierszy ale dane które ma pokazać
            // jeszcze się nie załadowały

            // próbowałem przypisać dane do zmiennej żeby mieć do nich dostęp ale nie daje to rezultatu
            const myData = data;
            console.log(myData);


            return <div>
                <h1>test</h1>
            </div>
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );

});
