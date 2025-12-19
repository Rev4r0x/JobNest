import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage = ({ onStart, onNavigate, currentUser }) => {
    return (
        <React.Fragment>
            <Navbar onNavigate={onNavigate} currentView="landing" currentUser={currentUser} />
            <div className="landing-container">
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
            <Footer onNavigate={onNavigate} />
        </React.Fragment>
    );
};

export default LandingPage;
