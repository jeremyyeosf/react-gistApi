import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';



function DialogContent(props) {
    let result = props.gistsArray.find(row => row.id === props.rowId)
    const fileItems = Object.values(result.files).map((file) => 
        <li>{file.filename}</li>
    )
    // console.log(Object.values(result.files)[0].filename)

    return (
        <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
                <h1>{result.owner.login}</h1>
                <img className="item" src={result.owner.avatar_url} alt="No avatar"></img>
            </div>
            <div className="p-mb-2">
                <TabView>
                    <TabPanel header="Files">
                        <ul>{fileItems}</ul>
                    </TabPanel>
                    <TabPanel header="Timestamp">
                        <div>
                            <h4>
                                Created: 
                            </h4>
                            {result.created_at}
                            <h4>
                                Last Updated: 
                            </h4>
                            {result.updated_at}
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}



export default class Table extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            displayBasic2: false,
            position: 'center',
            dialog: {},
            isLoaded: false
        }
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
            localStorage.setItem(rowData.id, JSON.stringify(result))
            
        }
        
        const saveButtonBodyTemplate = (rowData) => {
            return (
                <div className="center">
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
            this.setState({dialog: event.data})
            this.onClick('displayBasic2')
        }
        
        return (
            <div>
                <Dialog
                    visible={this.state.displayBasic2}
                    style={{ width: "30vw" }}
                    onHide={() => this.onHide("displayBasic2")}
                >
                    <DialogContent rowId={this.state.dialog.id} gistsArray={this.props.gistsArray}/>
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
                        style={{ width: "20%" }}
                    ></Column>
                    <Column
                        field="description"
                        header="Description"
                        style={{ width: "35%" }}
                    ></Column>
                    <Column
                        body={saveButtonBodyTemplate}
                        key="id"
                        header=""
                        style={{ width: "10%" }}
                    ></Column>
                </DataTable>
            </div>
        );
    }
}


