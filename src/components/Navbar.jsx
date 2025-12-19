import React from 'react';

const Navbar = ({ onNavigate, currentView }) => {

    const handleNavClick = (target) => {
        if (target === 'home') {
            onNavigate('landing');
        } else if (target === 'contact') {
            onNavigate('contact');
        } else if (target === 'about') {
            onNavigate('about');
        } else if (target === 'jobs') {
            onNavigate('jobs');
        } else if (target === 'events') {
            onNavigate('events');
        }
    };

    // Check if we're on auth pages
    const isAuthPage = currentView === 'signin' || currentView === 'signup';

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-brand" onClick={() => handleNavClick('home')}>
                    JobNest
                </div>
                {!isAuthPage && (
                    <ul className="nav-links">
                        <li
                            className={currentView === 'jobs' ? 'active-link' : ''}
                            onClick={() => handleNavClick('jobs')}
                        >
                            Jobs
                        </li>
                        <li
                            className={currentView === 'events' ? 'active-link' : ''}
                            onClick={() => handleNavClick('events')}
                        >
                            Events
                        </li>
                        <li
                            className={currentView === 'about' ? 'active-link' : ''}
                            onClick={() => handleNavClick('about')}
                        >
                            About
                        </li>
                        <li
                            className={currentView === 'contact' ? 'active-link' : ''}
                            onClick={() => handleNavClick('contact')}
                        >
                            Contact
                        </li>
                        <li className="nav-btn" onClick={() => handleNavClick('home')}>Home</li>
                        <li
                            className={currentView === 'account' ? 'active-link account-icon' : 'account-icon'}
                            onClick={() => onNavigate('account')}
                            title="Account"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
