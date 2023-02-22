import "./navbar.scss"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import jwtDecode from "jwt-decode";
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const Navbar = () => {
    
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { token } = useContext(AuthContext);

    
    function getUuid() {
        const decodedToken = jwtDecode(token)
        return decodedToken.uuid
    }
    
    function getProfilePage() {
        return "/profile/" + getUuid()
    }
    
    const {isLoading, error, data} = useQuery(['name'], () => 
        axios.get("http://localhost:8000/api/users/user-profile?uuid=" + getUuid()).then(res => {
            return res.data.data.name
        })
    )

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span>hive</span>
                </Link>
                {/* <HomeOutlinedIcon /> */}
                {darkMode ? <WbSunnyIcon onClick={toggle}/> : <DarkModeIcon onClick={toggle}/>}
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="right">
                <PersonOutlineOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsNoneOutlinedIcon />
                <div className="user">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                    <Link to={getProfilePage()} style={{textDecoration:"none"}}>
                    {error ? <span>Something went wrong</span> : isLoading ? " " : <span>{data}</span>}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
