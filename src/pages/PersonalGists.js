import React from "react";
import Header from "../components/Header";
import Table from "../components/Table";
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

        
        
        return (
            <div>
                <Header title={this.state.dataTable.title}/>
                <Table gistsArray={this.state.gists}/>
            </div>
        );
    }
}