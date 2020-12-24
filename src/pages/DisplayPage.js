import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';
import Header from "../components/Header";



export class DisplayPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gists: [],
            dataTable: {
                title: "Public Gists"
            }
        };
    }

    componentDidMount() {
        axios.get("https://api.github.com/gists/public")
            .then((response) => {
                console.log(response.data);
                const gists = response.data;
                this.setState({ gists });
            })
            .catch((error) => {
                console.log(error);
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

        

        const saveButtonBodyTemplate = () => {
            const handleSaveClick = () => {
                console.log('clicked save')
            }

            return (
                <Button 
                    icon="pi pi-bookmark" 
                    className="p-button-rounded p-button-secondary p-button-outlined" 
                    onClick={() => handleSaveClick()} 
                />
            )
        }
        
        return (
            <div>
                <Header title={this.state.dataTable.title}/>
                <DataTable value={this.state.gists} resizableColumns columnResizeMode="fit">
                    <Column body={userBodyTemplate} header="User" style={{width:'10%'}}></Column>
                    <Column body={gistBodyTemplate} header="Gist" style={{width:'30%'}}></Column>
                    <Column field="description" header="Description" style={{width:'35%'}}></Column>
                    <Column field="created_at" header="Date Created" style={{width:'10%'}}></Column>
                    <Column field="updated_at" header="Last Updated" style={{width:'10%'}}></Column>
                    <Column body={saveButtonBodyTemplate} header="" style={{width:'5%'}}></Column>
                </DataTable>
            </div>
        );
    }
}
