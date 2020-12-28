import "./App.css";
import { PublicGists } from "./pages/PublicGists";
import { PersonalGists } from "./pages/PersonalGists";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookmarkedGists from "./pages/BookmarkedGists";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/publicGists">Public Gists</Link>
                        </li>
                        <li>
                            <Link to="/bookmarkedGists">Bookmarked Gists</Link>
                        </li>
                        <li>
                            <Link to="/personalGists">Personal Gists</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/publicGists">
                        <PublicGists />
                    </Route>
                    <Route path="/bookmarkedGists">
                        <BookmarkedGists />
                    </Route>
                    <Route path="/personalGists">
                        <PersonalGists />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
