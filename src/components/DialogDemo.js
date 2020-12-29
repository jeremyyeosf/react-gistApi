import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export class DialogDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayBasic: false,
            position: 'center'
        };

        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };

        if (position) {
            state = {
                ...state,
                position
            }
        }

        this.setState(state);
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Button label="Show" icon="pi pi-external-link" 
                        onClick={() => this.onClick('displayBasic')} />
                    <Dialog header="Header" 
                        visible={this.state.displayBasic} 
                        style={{ width: '50vw' }} 
                        onHide={() => this.onHide('displayBasic')}>
                        <p>Basic information</p>
                    </Dialog>
                </div>
            </div>
        )
    }
}
                
const rootElement = document.getElementById("root");
ReactDOM.render(<DialogDemo />, rootElement);