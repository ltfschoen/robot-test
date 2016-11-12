import React from 'react';
import {render} from 'react-dom';

import '../styles/main.css'

class App extends React.Component {
    render () {
        return (
            <div>
                <p>Welcome to Toy Robot app!</p>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));