import React from "react";
import { Link, useLocation } from "react-router-dom";
import {useEffect} from 'react';
import getStatus from '../hooks/getStatus';
import useAuth from '../hooks/useAuth';

const Header = () => {
    const location = useLocation();
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const status = await getStatus();
            setAuth({loggedIn: status?.loggedIn});
        }
        if(location.pathname.includes('/login') || location.pathname.includes('/profile')){
            checkLoginStatus();
        }
    }, [location.pathname])


    return (
        <div className="w-full flex justify-between items-center bg-black text-white text-lg px-6">
            <nav className="flex justify-center gap-6 py-4">
                <h1 className="font-bold">DailyBlend</h1>
                <Link className="px-2 hover:underline decoration-2" to="/">
                    Home
                </Link>
            </nav>
            <div className="flex content-center">
                { auth.loggedIn ? (
                    <Link to="/profile" className="hover:underline decoration-2">Profile</Link>
                ) : (
                    <Link to="/login" className="hover:underline decoration-2">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Header;
