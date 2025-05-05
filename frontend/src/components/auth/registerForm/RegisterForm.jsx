import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const { register } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register(name, email, password);
            // Redirect or update UI after successful registration
            navigate('/tasks')
            navigate
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
            <h2 className="text-2xl mb-4">Register</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <div className="mb-2">
                <label className="block">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;