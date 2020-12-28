import React from "react";
import axios from 'axios';
import Header from "../components/Header";
import Table from "../components/Table";


export class PublicGists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gists: [],
            title: "Public Gists",
            favouritedGists: []
        };
        
    }

    componentDidMount() {
        axios.get("https://api.github.com/gists/public")
            .then((response) => {
                // console.log(response.data);
                const gists = response.data;
                this.setState({ gists });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // componentDidUpdate() {
    //     console.log('favouritedGists: ', this.state.favouritedGists)
    // }

    render() {
        return (
            <div>
                <Header title={this.state.title}/>
                <Table gistsArray={this.state.gists}/>
            </div>
        );
    }
}
