import React, {useContext} from "react";
import {Link } from "react-router-dom"
import Home from "../Home/Home";
import UserContext from "../Auth/UserContext";
import SignUp from "../Auth/SignUp";
import LeagueList from "../Leagues/LeagueList";
import TeamList from "../Teams/TeamList";
import LeagueForm from "../Leagues/LeagueForm";
import TeamForm from "../Teams/TeamForm";
import UserDetail from "../Users/UserDetail";



const Nav = ({logout}) => {

    const { currentUser } = useContext(UserContext);

    const loggedInNav = () => {
        return(
            <>
            <ul> 
                <Link to="/" element={<Home />}>LeagueOne</Link>
                <Link to="/leagues" element={<LeagueList />}>Leagues</Link>
                <Link to="/teams" element={<TeamList />}>Teams</Link>
                <Link to={`/users/${currentUser.username}`} element={<UserDetail />}>{currentUser.username}</Link>
                <Link to="/" onClick={logout}>Log Out</Link>
            </ul>
            </>
        )
    }

    const loggedOutNav =() => {
        return(
            <>
             <ul>
             <Link to="/" element={<Home />}>LeagueOne</Link>
             <Link to="/signup" element={<SignUp />}>Sign Up</Link>
            </ul>
            </>
        )
    }


    return(
        <nav className="nav">
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    )
} 


export default Nav