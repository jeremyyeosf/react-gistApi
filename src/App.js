import "./App.css";
import { PublicGists } from "./pages/PublicGists";
import { PersonalGists } from "./pages/PersonalGists";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookmarkedGists from "./pages/BookmarkedGists";


export default function App() {
    return (
        <div>
            <Router>
                <div>
                    <nav className="nav-bar sticky">
                        <Link className="navtext router-link" to="/">PUBLIC</Link>
                        <Link className="navtext router-link" to="/personalGists">PERSONAL</Link>
                        <Link className="navtext router-link" to="/bookmarkedGists">
                            BOOKMARKS
                        </Link>
                    </nav>
                    <Switch>
                        <Route path="/bookmarkedGists">
                            <BookmarkedGists />
                        </Route>
                        <Route path="/personalGists">
                            <PersonalGists />
                        </Route>
                        <Route path="/">
                            <PublicGists />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}
