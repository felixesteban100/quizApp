import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [response, setResponse] = useState("")

    async function registerUser(name: string, email: string, password: string) {
        const response = await axios.post(
            `${API_URL}/api/v1/auth/register`,
            { "name": name, "email": email, "password": password }
        )
            .catch((error) => {
                setError(error.response.data.msg)
            });
        return response;
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true)
        const responseRegister = await registerUser(name, email, password);
        setLoading(false)

        if (typeof responseRegister === "object") setError("")

        if (responseRegister!.statusText === "Created") setResponse("User created")
    }

    return (
        <div className="min-h-[70vh] mt-[14vh]">
            <div className="m-auto w-96 rounded-lg shadow-sm shadow-primary p-8">
                <h2 className="text-2xl font-bold mb-5">Register</h2>
                <form className="form-control gap-5" onSubmit={handleSubmit}>
                    <label className="join join-vertical">
                        <span>Name</span>
                        <input
                            required
                            type="text"
                            placeholder="Enter name..."
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </label>

                    <label className="join join-vertical">
                        <span>Email</span>
                        <input
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
                                className="btn btn-secondary normal-case"
                            >
                                {loading ? <span className="loading loading-spinner loading-md"></span> : "Sign up / Register"}
                            </button>
                        </div>

                        <div className="mt-6 self-center">
                            <Link
                                to="/login"
                                className="btn btn-primary normal-case"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>

                    {
                        error !== "" &&
                        <div className="toast">
                            <div className="alert alert-error">
                                <span>{error} ❗</span>
                            </div>
                        </div>
                    }

                    {
                        response !== "" &&
                        <div className="toast">
                            <div className="alert alert-success">
                                <span>{response} ✔</span>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default Register