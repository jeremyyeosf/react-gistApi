import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';


export default class Table extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            displayBasic2: false,
            position: 'center',
            dialog: []
        }
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    // componentDidUpdate() {
    //     console.log('updated:', this.state.dialog)
    // }

    onClick(name) {
        console.log(name)
        // let state = {
        //     [`${name}`]: true
        // };

        // if (position) {
        //     state = {
        //         ...state,
        //         position
        //     }
        // }

        // this.setState(state);
        this.setState({
            [`${name}`]: true
        });
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    render() {

        const userBodyTemplate = (rowData) => {
            return (
                <a href={rowData.owner.html_url} target="_blank" rel="noopener noreferrer" className="anchortext">
                    {rowData.owner.login}
                </a>
            )
        }
        
        const gistBodyTemplate = (rowData) => {
            return (
                <a href={rowData.html_url} target="_blank" rel="noopener noreferrer" className="anchortext">
                    {rowData.html_url}
                </a>
            )
        }
        
        const handleSaveClick = (rowData) => {
            let result = this.props.gistsArray.find(row => row.id === rowData.id)
            console.log(result)
            localStorage.setItem(rowData.id, JSON.stringify(result))
            
        }
        
        const saveButtonBodyTemplate = (rowData) => {
            return (
                <div>
                    <button
                        className="p-button p-button-rounded p-button-warning p-button-outlined"
                        onClick={() => handleSaveClick(rowData)}
                    >
                        Save
                    </button>
                </div>
            );
        }

        const onRowSelect = (event) => {
            console.log(event.data)
            this.setState({dialog: event.data})
            this.onClick('displayBasic2')
        }
        
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
                <DataTable
                    value={this.props.gistsArray}
                    resizableColumns
                    columnResizeMode="fit"
                    selectionMode="single"
                    dataKey="id"
                    onRowSelect={onRowSelect}
                >
                    <Column
                        body={userBodyTemplate}
                        header="User"
                        style={{ width: "10%" }}
                    ></Column>
                    <Column
                        body={gistBodyTemplate}
                        header="Gist"
                        style={{ width: "30%" }}
                    ></Column>
                    <Column
                        field="description"
                        header="Description"
                        style={{ width: "35%" }}
                    ></Column>
                    <Column
                        field="created_at"
                        header="Date Created"
                        style={{ width: "10%" }}
                    ></Column>
                    <Column
                        field="updated_at"
                        header="Last Updated"
                        style={{ width: "10%" }}
                    ></Column>
                    <Column
                        body={saveButtonBodyTemplate}
                        key="id"
                        header=""
                        style={{ width: "5%" }}
                    ></Column>
                </DataTable>
            </div>
        );
    }
}


