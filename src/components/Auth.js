import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Auth = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn) {
            navigate('/forum');
        }
    }, [navigate]);

    const handleLogin = async () => {
        const { error, data } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            if(error.code === 'email_not_confirmed') {
                setErrorMessage('Por favor, confirma tu correo electrónico antes de continuar.');
            }
            if(error.code === 'invalid_credentials') {
                setErrorMessage('Por favor, ingresa un correo electrónico válido.');
            }
        } else {
            console.log(data.user.email);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('loggedIn', 'true');
            navigate('/forum');
        }
    };

    return (
        <div className='bodyAuth'>
            <div className="auth-container">
                <h1 className="auth-title">Bienvenido a la Comunidad</h1>
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
                <button onClick={handleLogin} className="auth-button login-button">
                    Iniciar sesión
                </button>
                <button onClick={() => navigate('/register')} className="auth-button signup-button">
                    Registrarse
                </button>
            </div>
        </div>
    );
};

export default Auth;
