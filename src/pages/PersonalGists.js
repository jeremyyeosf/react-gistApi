import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Header from "../components/Header";
require('dotenv').config()


const { Octokit } = require("@octokit/core");
const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN || "";
// if empty token, return public gists 
// if wrong token, return 401
// const AUTH_TOKEN = "a";

export class PersonalGists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gists: [],
            dataTable: {
                title: "My Gists"
            },
            favouritedGists: []
        };
    }

    getPersonalGists = async () => {
        const octokit = new Octokit({ auth: AUTH_TOKEN });
        const response = await octokit.request("https://api.github.com/gists", {
            org: "octokit",
            type: "private",
            });
        console.log('octokit', response)
        return response
    }

    componentDidMount() {
        this.getPersonalGists()
            .then((response) => {
                console.log('gists returned: ', response.data);
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

        const handleSaveClick = (rowData) => {
            let result = this.state.gists.find(row => row.id === rowData.id)
            console.log("saved into localstorage: ", result)
            localStorage.setItem(rowData.id, JSON.stringify(result))
        }

        const saveButtonBodyTemplate = (rowData) => {
            return (
                <Button 
                    icon="pi pi-bookmark" 
                    className="p-button-rounded p-button-secondary p-button-outlined" 
                    onClick={() => handleSaveClick(rowData)} 
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
                    <Column body={saveButtonBodyTemplate} key="id" header="" style={{width:'5%'}}></Column>
                </DataTable>
            </div>
        );
    }
}
