import React from "react";
import { Link } from "react-router-dom";

// requires two clicks for onClick to setState
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLink: ""
        };
        this.activatePublicLink = this.activatePublicLink.bind(this)
        this.activateBookmarkedLink = this.activateBookmarkedLink.bind(this)
        this.activatePersonalLink = this.activatePersonalLink.bind(this)
    }

    componentDidUpdate() {
        console.log('the activeLink is now: ', this.state.activeLink)
    }

    activatePublicLink() {
        this.setState({ activeLink: "public" });
        console.log('clicked public')
    };
    activateBookmarkedLink() {
        this.setState({ activeLink: "bookmarked" });
        console.log('clicked bookmarked')
    };

    activatePersonalLink() {
        this.setState({ activeLink: "personal" });
        console.log('clicked personal')
    };

    // isStateActiveClass = this.state.active ? 'active-link': null
    // linkClass = `anchortext ${this.isStateActiveClass}`

    render() {
        
        // const activatePublicLink = () => {
        //     this.setState({ activeLink: "public" });
        //     console.log('clicked public')
        // };
        // const activateBookmarkedLink = () => {
        //     this.setState({ activeLink: "bookmarked" });
        //     console.log('clicked bookmarked')
        // };

        // const activatePersonalLink = () => {
        //     this.setState({ activeLink: "personal" });
        //     console.log('clicked personal')
        // };

        return (
            <div className="header">
                    <Link className={this.state.activeLink === "public" ? 'active-link': ''} to="/" onMouseDown={this.activatePublicLink} >
                        Public Gists
                    </Link>
                    <Link className={this.state.activeLink === "bookmarked" ? 'active-link': ''} to="/bookmarkedGists" onMouseDown={this.activateBookmarkedLink}>
                        Bookmarked Gists
                    </Link>
                    <Link className={this.state.activeLink === "personal" ? 'active-link': ''} to="/personalGists" onMouseDown={this.activatePersonalLink}>
                        Personal Gists
                    </Link>
            </div>
        );
    }
}


// render() {
//     return (
//         <div className="header">
//             <ul class="nav nav-fill">
//                 <Link className={this.state.activeLink === "public" ? 'active-link': null} to="/" onClick={() => this.activatePublicLink()} >
//                     Public Gists
//                 </Link>
//                 <Link className="anchortext" to="/bookmarkedGists">
//                     Bookmarked Gists
//                 </Link>
//                 <Link className="anchortext" to="/personalGists">
//                     Personal Gists
//                 </Link>
//             </ul>
//         </div>
//     );
// }
