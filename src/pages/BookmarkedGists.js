import React from 'react'
import Header from '../components/Header'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default class BookmarkedGists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "Bookmarked Gists",
            bookmarkedGists: []
        }
    }

    componentDidMount() {
        // retrieve id and then get each localStorage object, parse and add to array
        const keysOfGistsInLocalStorage = Object.keys(localStorage)
        let arrayOfGists = []
        for (const i of keysOfGistsInLocalStorage) {
            arrayOfGists.push(JSON.parse(localStorage.getItem(i)))
        }
        console.log('arrayOfGists', arrayOfGists)
        this.setState({bookmarkedGists: arrayOfGists})
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
        
        const handleDeleteClick = (rowData) => {
            // delete from localStorage
            localStorage.removeItem(rowData.id)
            // delete from bookmarkedGists
            let filteredArray = this.state.bookmarkedGists.filter((i) => {
                return i.id !== rowData.id
            })
            this.setState({bookmarkedGists: filteredArray})
        }
        
        const deleteButtonBodyTemplate = (rowData) => {
            return (
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-danger p-button-outlined" 
                    onClick={() => handleDeleteClick(rowData)} 
                />
            )
        }

        return (
            <div>
                <Header title={this.state.title}/>
                <DataTable value={this.state.bookmarkedGists} resizableColumns columnResizeMode="fit">
                    <Column body={userBodyTemplate} header="User" style={{width:'10%'}}></Column>
                    <Column body={gistBodyTemplate} header="Gist" style={{width:'30%'}}></Column>
                    <Column field="description" header="Description" style={{width:'35%'}}></Column>
                    <Column field="created_at" header="Date Created" style={{width:'10%'}}></Column>
                    <Column field="updated_at" header="Last Updated" style={{width:'10%'}}></Column>
                    <Column body={deleteButtonBodyTemplate} key="id" header="" style={{width:'5%'}}></Column>
                </DataTable>
            </div>
        )
        
    }
}



// return (
//     <div>
//         <Header title={this.state.title}/>
//         <Table gistsArray={this.state.bookmarkedGists}/>
//     </div>
// )