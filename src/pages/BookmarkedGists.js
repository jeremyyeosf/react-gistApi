import React from 'react'
import Header from '../components/Header'
import Table from '../components/Table';

export default class BookmarkedGists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "BookmarkedGists",
            bookmarkedGists: []
        }
    }

    componentDidMount() {
        // retrieve id and then get each localStorage object, parse and add to array
        const keysOfGistsInLocalStorage = Object.keys(localStorage)
        console.log('keysOfGistsInLocalStorage: ', keysOfGistsInLocalStorage)
        let arrayOfGists = []
        for (const i of keysOfGistsInLocalStorage) {
            arrayOfGists.push(JSON.parse(localStorage.getItem(i)))
        }
        console.log('arrayOfGists', arrayOfGists)
        this.setState({bookmarkedGists: arrayOfGists})
    }
    
    render() {
        return (
            <div>
                <Header title={this.state.title}/>
                <Table gistsArray={this.state.bookmarkedGists}/>
            </div>
        )
    }
}

