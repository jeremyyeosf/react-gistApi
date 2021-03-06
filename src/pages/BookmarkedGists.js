import React from "react";
import Header from "../components/Header";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { Toast } from 'primereact/toast';

function DialogContent(props) {
    let result = props.gistsArray.find((row) => row.id === props.rowId);
    const fileItems = Object.values(result.files).map((file) => (
        <li className="text-wrap" key={result.id}>
            {file.filename}
        </li>
    ));

    return (
        <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
                <h1 className="text-wrap">{result.owner.login}</h1>
                <a
                    href={result.owner.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="anchortext text-wrap"
                >
                    <img
                        className="item"
                        src={result.owner.avatar_url}
                        alt="No avatar"
                    ></img>
                </a>
            </div>
            <div className="p-mb-2">
                <TabView>
                    <TabPanel header="Gist">
                        <h4>Gist Url:</h4>
                        <a
                            href={result.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dialog-anchortext"
                        >
                            {result.html_url}
                        </a>
                    </TabPanel>
                    <TabPanel header="Files">
                        <ul>{fileItems}</ul>
                    </TabPanel>
                    <TabPanel header="Timestamp">
                        <div>
                            <h4>Created:</h4>
                            {result.created_at}
                            <h4>Last Updated:</h4>
                            {result.updated_at}
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}

export default class BookmarkedGists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Bookmarked Gists",
            bookmarkedGists: [],
            displayBasic2: false,
            position: "center",
            dialog: {},
        };
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.showBookmarkDeletedToast = this.showBookmarkDeletedToast.bind(this);
    }

    componentDidMount() {
        // retrieve id and then get each localStorage object, parse and add to array
        const keysOfGistsInLocalStorage = Object.keys(localStorage);
        let arrayOfGists = [];
        for (const i of keysOfGistsInLocalStorage) {
            arrayOfGists.push(JSON.parse(localStorage.getItem(i)));
        }
        this.setState({ bookmarkedGists: arrayOfGists });
    }

    showBookmarkDeletedToast() {
        this.toast.show({severity:'error', summary: 'Bookmark Deleted', detail:'', life: 1500});
    }

    onClick(name, position) {
        let state = {
            [`${name}`]: true,
        };

        if (position) {
            state = {
                ...state,
                position,
            };
        }

        this.setState(state);
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false,
        });
    }

    render() {
        const userBodyTemplate = (rowData) => {
            return (
                <a
                    href={rowData.owner.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="anchortext"
                >
                    {rowData.owner.login}
                </a>
            );
        };

        const gistBodyTemplate = (rowData) => {
            return (
                <a
                    href={rowData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="anchortext"
                >
                    {rowData.html_url}
                </a>
            );
        };

        const handleDeleteClick = (rowData) => {
            // delete from localStorage
            localStorage.removeItem(rowData.id);
            // delete from bookmarkedGists
            let filteredArray = this.state.bookmarkedGists.filter((i) => {
                return i.id !== rowData.id;
            });
            this.setState({ bookmarkedGists: filteredArray });
            this.showBookmarkDeletedToast()
        };

        const deleteButtonBodyTemplate = (rowData) => {
            return (
                <div className="center">
                    <button
                        className="p-button p-button-rounded p-button-danger"
                        onClick={() => handleDeleteClick(rowData)}
                    >
                        Delete
                    </button>
                </div>
            );
        };

        const onRowSelect = (event) => {
            this.setState({ dialog: event.data });
            this.onClick("displayBasic2");
        };

        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <Header title={this.state.title} />
                <Dialog
                    visible={this.state.displayBasic2}
                    style={{ width: "40vw" }}
                    onHide={() => this.onHide("displayBasic2")}
                >
                    <DialogContent
                        rowId={this.state.dialog.id}
                        gistsArray={this.state.bookmarkedGists}
                    />
                </Dialog>
                <DataTable
                    value={this.state.bookmarkedGists}
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
                        body={deleteButtonBodyTemplate}
                        key="id"
                        header=""
                        style={{ width: "10%" }}
                    ></Column>
                </DataTable>
            </div>
        );
    }
}