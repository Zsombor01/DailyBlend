import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

const Login = () => {
    const userInputRef = useRef();
    const errRef = useRef();

    const [userInput, setUserInput] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        userInputRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [userInput, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form");
        try {
            const response = await axios.post(
                "http://localhost:5555/login",
                {
                    identifier: userInput,
                    password: pwd,
                },
                {
                    withCredentials: true,
                }
            );
            console.log(response?.data);

            if (response?.data?.msg == "Login successful") {
                setAuth({loggedIn: true});
                navigate("/");
            }

            console.log(JSON.stringify(response?.data));
        } catch (err) {
            if (err?.response?.status === 403) {
                navigate("/");
                return;
            }
            console.error(err);
            setErrMsg("Error logging in. Please try again.");
            toast.error("Error logging in. Please try again.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-white font-sans text-black text-lg">
            <section className="w-full max-w-md min-h-[400px] flex flex-col justify-start px-4 py-6 bg-black bg-opacity-40 rounded-lg">
                <p
                    ref={errRef}
                    className={`${
                        errMsg
                            ? "bg-pink-200 text-red-700 font-bold p-2 mb-1 rounded-lg"
                            : "hidden"
                    }`}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <h1 className="text-[2.5rem] mb-6 mt-5">Sign In</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-evenly flex-grow pb-4"
                >
                    <Label
                        htmlFor="userInput"
                        className="mt-4 pb-0.5 text-[1rem]"
                    >
                        Username or Email:
                    </Label>
                    <Input
                        type="text"
                        id="userInput"
                        ref={userInputRef}
                        autoComplete="off"
                        onChange={(e) => setUserInput(e.target.value)}
                        value={userInput}
                        required
                        placeholder="Enter your username or email"
                    />
                    <Label
                        htmlFor="password"
                        className="mt-4 pb-0.5 text-[1rem]"
                    >
                        Password:
                    </Label>
                    <Input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        placeholder="Enter your password"
                    />
                    <Button className="mt-5">Sign In</Button>
                </form>
                <p className="text-[1rem]">
                    Need an Account?
                    <br />
                    <span className="inline-block">
                        <Link
                            to="/register"
                            className="text-white hover:underline hover:text-black"
                        >
                            Sign Up
                        </Link>
                    </span>
                </p>
            </section>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
        </div>
    );
};

export default Login;
