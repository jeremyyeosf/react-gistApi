import React, { Component } from 'react'
import { Dialog } from 'primereact/dialog';


export default class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Dialog
                    header="Header"
                    visible={this.state.displayBasic2}
                    style={{ width: "50vw" }}
                    onHide={() => this.onHide("displayBasic2")}
                >
                    <p>{this.state.dialog.html_url}</p>
                    <p>{this.state.dialog}</p>
                    <img src={this.state.dialog} alt="No Avatar"></img>
                </Dialog>
            </div>
        )
    }
}
