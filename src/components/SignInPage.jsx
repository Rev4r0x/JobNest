import React, { useState } from 'react';
import Navbar from './Navbar';

const SignInPage = ({ onNavigate, onSignIn }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === formData.email && u.password === formData.password);

        if (user) {
            // Store authentication
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));

            if (formData.rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }

            onSignIn(user);
            onNavigate('dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-page">
            <Navbar onNavigate={onNavigate} currentView="signin" />

            <div className="auth-container">
                <div className="auth-card fade-in">
                    <div className="auth-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && <div className="auth-error">{error}</div>}

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="auth-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="auth-link-small">Forgot password?</a>
                        </div>

                        <button type="submit" className="auth-button">
                            Sign In
                        </button>

                        <div className="auth-footer">
                            Don't have an account?{' '}
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('signup'); }} className="auth-link">
                                Sign Up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
