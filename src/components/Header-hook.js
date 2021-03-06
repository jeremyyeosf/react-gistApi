import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
    const [activeLink, setActiveLink] = useState("");

    return (
        <div className="header">
            <ul class="nav nav-fill">
                <Link
                    className={activeLink === "public" ? "active-link" : null}
                    to="/"
                    onClick={() => setActiveLink("public")}
                >
                    Public Gists
                </Link>
                <Link
                    className={
                        activeLink === "bookmarked" ? "active-link" : null
                    }
                    to="/bookmarkedGists"
                    onClick={() => setActiveLink("bookmarked")}
                >
                    Bookmarked Gists
                </Link>
                <Link
                    className={activeLink === "personal" ? "active-link" : null}
                    to="/personalGists"
                    onClick={() => setActiveLink("personal")}
                >
                    Personal Gists
                </Link>
            </ul>
        </div>
    );
}

// requires two clicks for onClick to setState
// export default class Header extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activeLink: ""
//         };
//         this.activatePublicLink = this.activatePublicLink.bind(this)
//         this.activateBookmarkedLink = this.activateBookmarkedLink.bind(this)
//         this.activatePersonalLink = this.activatePersonalLink.bind(this)
//     }

//     componentDidUpdate() {
//         console.log('the activeLink is now: ', this.state.activeLink)
//     }

//     activatePublicLink() {
//         this.setState({ activeLink: "public" });
//         console.log('clicked public')
//     };
//     activateBookmarkedLink() {
//         this.setState({ activeLink: "bookmarked" });
//         console.log('clicked bookmarked')
//     };

//     activatePersonalLink() {
//         this.setState({ activeLink: "personal" });
//         console.log('clicked personal')
//     };

//     render() {
//         return (
//             <div className="header">
//                 <ul class="nav nav-fill">
//                     <Link className={this.state.activeLink === "public" ? 'active-link': null} to="/" onClick={this.activatePublicLink} >
//                         Public Gists
//                     </Link>
//                     <Link className={this.state.activeLink === "bookmarked" ? 'active-link': null} to="/bookmarkedGists" onClick={this.activateBookmarkedLink}>
//                         Bookmarked Gists
//                     </Link>
//                     <Link className={this.state.activeLink === "personal" ? 'active-link': null} to="/personalGists" onClick={this.activatePersonalLink}>
//                         Personal Gists
//                     </Link>
//                 </ul>
//             </div>
//         );
//     }
// }
