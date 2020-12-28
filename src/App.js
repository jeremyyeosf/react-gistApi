import "./App.css";
import { DisplayPage } from "./pages/DisplayPage";
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
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/bookmark">Bookmarked Gists</Link>
                        </li>
                        <li>
                            <Link to="/my-gists">My Gists</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/bookmark">
                        <BookmarkedGists />
                    </Route>
                    <Route path="/my-gists">
                        <PersonalGists />
                    </Route>
                    <Route path="/">
                        <DisplayPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
