import React from 'react';

const LandingPage = ({ onStart, onNavigate }) => {
    return (
        <div className="landing-container">
            {/* Auth Buttons in Top Right */}
            <div className="landing-auth-buttons">
                <button
                    className="landing-signin-btn"
                    onClick={() => onNavigate && onNavigate('signin')}
                >
                    Sign In
                </button>
                <button
                    className="landing-signup-btn"
                    onClick={() => onNavigate && onNavigate('signup')}
                >
                    Sign Up
                </button>
            </div>

            <div className="landing-content">
                <h1 className="landing-title">
                    <span className="slide-in-text">Job</span>
                    <span className="highlight-text delay-1">Nest</span>
                </h1>
                <p className="landing-subtitle fade-in-up">
                    Find your dream career. Connect with your community.
                    <br />
                    The ultimate platform for professionals.
                </p>
                <button
                    className="cta-button fade-in-up delay-4"
                    onClick={() => onNavigate && onNavigate('signin')}
                >
                    Explore Opportunities <span className="arrow-icon">→</span>
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
