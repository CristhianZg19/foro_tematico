import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Register = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async () => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            setErrorMessage(error.message);
        } else {
            navigate('/');
        }
    };

    return (
        <div className='bodyAuth'>
            <div className="auth-container">
                <h1 className="auth-title">Registro</h1>
                <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                    />
                </div>
                <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button onClick={handleSignUp} className="auth-button signup-button">
                    Registrarse
                </button>
            </div>
        </div>
    );
};

export default Register;
