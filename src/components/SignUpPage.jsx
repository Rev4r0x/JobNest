import React, { useState } from 'react';
import Navbar from './Navbar';

const SignUpPage = ({ onNavigate, onSignIn }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: 'seeker' // Default to job seeker
    });
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Check password strength
        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    const handleRoleSelect = (role) => {
        setFormData(prev => ({
            ...prev,
            accountType: role
        }));
    };

    const checkPasswordStrength = (password) => {
        if (password.length === 0) {
            setPasswordStrength('');
        } else if (password.length < 6) {
            setPasswordStrength('weak');
        } else if (password.length < 10) {
            setPasswordStrength('medium');
        } else if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) {
            setPasswordStrength('strong');
        } else {
            setPasswordStrength('medium');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === formData.email)) {
            setError('Email already registered');
            return;
        }

        // Create new user
        const newUser = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.accountType, // Store the selected role
            title: formData.accountType === 'seeker' ? 'Job Seeker' : 'Recruiter',
            location: 'Not specified',
            bio: 'Welcome to JobNest!',
            skills: formData.accountType === 'seeker' ? [] : undefined,
            company: formData.accountType === 'recruiter' ? { name: '', position: '' } : undefined,
            applications: formData.accountType === 'seeker' ? [] : undefined,
            postedJobs: formData.accountType === 'recruiter' ? [] : undefined
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Redirect to sign in page instead of auto-login
        onNavigate('signin');
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 'weak': return '#dc3545';
            case 'medium': return '#ffc107';
            case 'strong': return '#28a745';
            default: return '#e2e8f0';
        }
    };

    return (
        <div className="auth-page">
            <Navbar onNavigate={onNavigate} currentView="signup" />

            <div className="auth-container">
                <div className="auth-card fade-in">
                    <div className="auth-header">
                        <h1>Create Account</h1>
                        <p>Join JobNest to find your dream job or hire talent</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="role-selector">
                            <button
                                type="button"
                                className={`role-btn ${formData.accountType === 'seeker' ? 'active' : ''}`}
                                onClick={() => handleRoleSelect('seeker')}
                            >
                                <span className="role-icon">👤</span>
                                <span>Job Seeker</span>
                            </button>
                            <button
                                type="button"
                                className={`role-btn ${formData.accountType === 'recruiter' ? 'active' : ''}`}
                                onClick={() => handleRoleSelect('recruiter')}
                            >
                                <span className="role-icon">💼</span>
                                <span>Recruiter</span>
                            </button>
                        </div>

                        {error && <div className="auth-error">{error}</div>}

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>

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
                                placeholder="Create a strong password"
                                required
                            />
                            {passwordStrength && (
                                <div className="password-strength">
                                    <div className="strength-bar">
                                        <div
                                            className="strength-fill"
                                            style={{
                                                width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%',
                                                backgroundColor: getStrengthColor()
                                            }}
                                        ></div>
                                    </div>
                                    <span className="strength-label" style={{ color: getStrengthColor() }}>
                                        {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter your password"
                                required
                            />
                        </div>

                        <button type="submit" className="auth-button">
                            Create Account
                        </button>

                        <div className="auth-footer">
                            Already have an account?{' '}
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('signin'); }} className="auth-link">
                                Sign In
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
