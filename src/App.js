import "./App.css";
import { PublicGists } from "./pages/PublicGists";
import { PersonalGists } from "./pages/PersonalGists";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookmarkedGists from "./pages/BookmarkedGists";


export default function App() {

    const [active, setActive] = useState('public')

    console.log(active)

    function setActivePublic() {
        setActive('public')
    }

    function setActivePersonal() {
        setActive('personal')
    }

    function setActiveBookmarked() {
        setActive('bookmarked')
    }

    const isStateActiveClassPublic = active === 'public' ? 'active' : null
    const activePublic = `navtext router-link ${isStateActiveClassPublic}`

    const isStateActiveClassPersonal = active === 'personal' ? 'active' : null
    const activePersonal = `navtext router-link ${isStateActiveClassPersonal}`

    const isStateActiveClassBookmarked = active === 'bookmarked' ? 'active' : null
    const activeBookmarked = `navtext router-link ${isStateActiveClassBookmarked}`

    return (
        <div>
            <Router>
                <div>
                    <nav className="nav-bar sticky">
                        <Link className={activePublic} to="/" onClick={setActivePublic}>PUBLIC</Link>
                        <Link className={activePersonal} to="/personalGists" onClick={setActivePersonal}>PERSONAL</Link>
                        <Link className={activeBookmarked} to="/bookmarkedGists" onClick={setActiveBookmarked}>
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
