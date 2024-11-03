import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
    const logout = useLogout();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const { setAuth } = useAuth();

    const handleLogout = async () => {
        await logout();
        setAuth({loggedIn: false});
        navigate("/login");
    };

    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center w-full max-w-3xl">
                <h1 className="flex justify-center text-[4rem] mt-5 mb-7">{userData?.name}</h1>
                <Avatar className="w-64 h-64 mb-32">
                    <AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button onClick={handleLogout} className="px-12 py-6">Logout</Button>
            </div>
        </div>
    );
};

export default Profile;
