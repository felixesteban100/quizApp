import { useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import { API_URL } from '../constants';

type LoginProps = {
    setAuthToken: (token: string) => void;
    setCurrentUserName: (username: string) => void;
    setUserId: (userid: string) => void;
}

function Login({ setUserId, setAuthToken, setCurrentUserName }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    async function loginUser(email: string, password: string) {
        try {
            const response = await axios.post(
                `${API_URL}/api/v1/auth/login`,
                { "email": email, "password": password }
            )
            .catch((error) => {
                setError(error.response.data.msg)
                setAuthToken("")
                setCurrentUserName("")
                setUserId("")
            });
            return response;
        } catch (error) {
            console.log(typeof error)
            console.log(error)
            setError('Opps... an error happend, please try later')
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true)
        const responseLogin = await loginUser(email, password);
        setLoading(false)
        if(typeof responseLogin === "object") {
            setError("")
            setAuthToken(responseLogin.data.token)
            setCurrentUserName(responseLogin.data.user.name)
            setUserId(responseLogin.data.user.id)
        }
    }
    return (
        <div className="min-h-[70vh] mt-[14vh]">
            <div className="m-auto w-96 rounded-lg shadow-sm shadow-primary p-8">
                <h2 className="text-2xl font-bold mb-5">Login</h2>
                <form className="form-control gap-5" onSubmit={handleSubmit}>
                    <label className="join join-vertical">
                        <span>Email</span>
                        <input
                            onClick={() => setError("")}
                            required
                            type="text"
                            placeholder="Enter email..."
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>
                    <label className="join join-vertical">
                        <span>Password</span>
                        <input
                            onClick={() => setError("")}
                            required
                            type="text"
                            placeholder="Enter password..."
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>

                    <div className='flex justify-center gap-5'>
                        <div className="mt-6 self-center">
                            <button
                                type="submit"
                                className="btn btn-primary normal-case"
                            >
                                {loading ? <span className="loading loading-spinner loading-md"></span> : "Sign in"}
                            </button>
                        </div>

                        <div className="mt-6 self-center">
                            <Link
                                to="/register"
                                className="btn btn-secondary normal-case"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>

                    {
                        error !== "" &&
                        <p className='text-red-500'>{error}</p>
                    }

                </form>
            </div>
        </div>
    )

    /* return (
        <div className="card w-[16rem] bg-base-100 shadow-xl image-full group/item">
            <figure>
                <img src="https://upload.wikimedia.org/wikipedia/en/c/c7/Batman_Infobox.jpg" alt="Batman" />
            </figure>

            <div className="card-body group/edit invisible group-hover/item:visible transition delay-150 duration-300 ease-in-out">
                <h2 className="card-title">The Batman</h2>
                <p>#1 Detective of gotham city </p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">More...</button>
                </div>
            </div>
        </div>
    ) */
}



export default Login