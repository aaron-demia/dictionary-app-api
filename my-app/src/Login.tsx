import {useState} from 'react';

type LoginProps = {
  setToken: (token: string) => void;
};

function Login({ setToken }: LoginProps) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email , password })
        });
        const data = await response.json();
        if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        } else {
        alert("Login failed!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    )

}

export default Login;