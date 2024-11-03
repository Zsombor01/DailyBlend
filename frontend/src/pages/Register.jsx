import React from 'react';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const REGISTER_URL = '/register';

const Register = () => {
	const userRef = useRef();
	const emailRef = useRef();
	const errRef = useRef();
	const navigate = useNavigate();

	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user]);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [user, email, pwd, matchPwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const v1 = USER_REGEX.test(user);
		const v2 = EMAIL_REGEX.test(email);
		const v3 = PWD_REGEX.test(pwd);
		if (!v1 || !v2 || !v3) {
			setErrMsg('Invalid Entry');
			return;
		}
		try {
			const response = await axios.post('http://localhost:3333/register', {
                name: user,
                email: email,
                password: pwd,
                password2: matchPwd
            },
            {
                withCredentials: true
            });

			console.log(JSON.stringify(response?.data));

			setUser('');
			setEmail('');
			setPwd('');
			setMatchPwd('');

			navigate('/login');
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else {
				setErrMsg('Registration Failed');
			}
			errRef.current.focus();
		}
	};

	return (
		<div className='flex flex-col justify-center items-center min-h-screen p-4 bg-white font-sans text-black text-lg'>
			<section className='w-full max-w-md min-h-[400px] flex flex-col justify-start px-4 py-6 bg-black bg-opacity-40 rounded-lg'>
				<p
					ref={errRef}
					className={`${
						errMsg ? 'bg-pink-200 text-red-700 font-bold p-2 mb-1 rounded-lg' : 'hidden'
					}`}
					aria-live='assertive'
				>
					{errMsg}
				</p>
				<h1 className='text-[2.5rem] mb-6 mt-5'>Register</h1>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col justify-evenly flex-grow pb-4'
				>
					<Label htmlFor='username' className='mt-4 pb-0.5 flex items-center text-[1rem]'>
						Username:
						<FontAwesomeIcon
							icon={faCheck}
							className={`ml-1 ${validName ? 'text-green-600' : 'hidden'}`}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={`ml-1 ${
								validName || !user ? 'hidden' : 'text-red-600'
							}`}
						/>
					</Label>
					<Input
						type='text'
						id='username'
						ref={userRef}
						autoComplete='off'
						onChange={(e) => setUser(e.target.value)}
						value={user}
						required
						aria-invalid={validName ? 'false' : 'true'}
						aria-describedby='uidnote'
						onFocus={() => setUserFocus(true)}
						onBlur={() => setUserFocus(false)}
						placeholder='Enter your username'
					/>
					<p
						id='uidnote'
						className={`text-sm bg-black text-white p-1 rounded-lg relative -bottom-2 ${
							userFocus && user && !validName ? 'block' : 'hidden'
						}`}
					>
						<FontAwesomeIcon icon={faInfoCircle} className='mr-1' />
						4 to 24 characters.
						<br />
						Must begin with a letter.
						<br />
						Letters, numbers, underscores, hyphens allowed.
					</p>

					<Label htmlFor='email' className='mt-4 pb-0.5 flex items-center text-[1rem]'>
						Email:
						<FontAwesomeIcon
							icon={faCheck}
							className={`ml-1 ${validEmail ? 'text-green-500' : 'hidden'}`}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={`ml-1 ${
								validEmail || !email ? 'hidden' : 'text-red-500'
							}`}
						/>
					</Label>
					<Input
						type='email'
						id='email'
						ref={emailRef}
						autoComplete='off'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required
						aria-invalid={validEmail ? 'false' : 'true'}
						aria-describedby='uidnote'
						onFocus={() => setEmailFocus(true)}
						onBlur={() => setEmailFocus(false)}
						placeholder='Enter your email'
					/>

					<Label htmlFor='password' className='mt-4 pb-0.5 flex items-center text-[1rem]'>
						Password:
						<FontAwesomeIcon
							icon={faCheck}
							className={`ml-1 ${validPwd ? 'text-green-500' : 'hidden'}`}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={`ml-1 ${validPwd || !pwd ? 'hidden' : 'text-red-500'}`}
						/>
					</Label>
					<Input
						type='password'
						id='password'
						onChange={(e) => setPwd(e.target.value)}
						value={pwd}
						required
						aria-invalid={validPwd ? 'false' : 'true'}
						aria-describedby='pwdnote'
						onFocus={() => setPwdFocus(true)}
						onBlur={() => setPwdFocus(false)}
						placeholder='Enter your password'
					/>
					<p
						id='pwdnote'
						className={`text-[0.8rem] bg-black px-2 text-white rounded-lg relative -bottom-2 ${
							pwdFocus && !validPwd ? 'block' : 'hidden'
						}`}
					>
						<FontAwesomeIcon icon={faInfoCircle} className='mr-1' />
						8 to 24 characters.
						<br />
						Must include uppercase and lowercase letters, a number and a special
						character.
						<br />
						Allowed special characters:{' '}
						<span aria-label='exclamation mark'>!</span>{' '}
						<span aria-label='at symbol'>@</span>{' '}
						<span aria-label='hashtag'>#</span>{' '}
						<span aria-label='dollar sign'>$</span>{' '}
						<span aria-label='percent'>%</span>
					</p>

					<Label htmlFor='confirm_pwd' className='mt-4 pb-0.5 flex items-center text-[1rem]'>
						Confirm Password:
						<FontAwesomeIcon
							icon={faCheck}
							className={`ml-1 ${
								validMatch && matchPwd ? 'text-green-500' : 'hidden'
							}`}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={`ml-1 ${
								validMatch || !matchPwd ? 'hidden' : 'text-red-500'
							}`}
						/>
					</Label>
					<Input
						type='password'
						id='confirm_pwd'
						onChange={(e) => setMatchPwd(e.target.value)}
						value={matchPwd}
						required
						aria-invalid={validMatch ? 'false' : 'true'}
						aria-describedby='confirmnote'
						onFocus={() => setMatchFocus(true)}
						onBlur={() => setMatchFocus(false)}
						placeholder='Confirm your password'
					/>
					<p
						id='confirmnote'
						className={`text-[0.8rem] bg-black text-white px-2 rounded-lg relative -bottom-2 ${
							matchFocus && !validMatch ? 'block' : 'hidden'
						}`}
					>
						<FontAwesomeIcon icon={faInfoCircle} className='mr-1' />
						Must match the first password input field.
					</p>

					<Button
						disabled={!validName || !validPwd || !validMatch}
						className='mt-5'
						>
						Sign Up
					</Button>
				</form>
				<p className='text-[1rem]'>
					Already registered?
					<br />
					<span className='inline-block'>
						<Link to='/login' className='text-white hover:underline hover:text-black'>
							Sign In
						</Link>
					</span>
				</p>
			</section>
			<ToastContainer
				position='top-center'
				autoClose={4000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
				transition:Bounce
			/>
		</div>
	);
};

export default Register;
