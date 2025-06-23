import {useState} from 'react';

function Login({ setToken }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8000/api/user/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
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
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    )

}

export default Login;