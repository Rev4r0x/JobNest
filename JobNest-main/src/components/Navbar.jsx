import React from 'react';

const Navbar = ({ onNavigate, currentView, currentUser }) => {

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
        } else if (target === 'placements') {
            onNavigate('placements');
        } else if (target === 'pricing') {
            onNavigate('pricing');
        } else if (target === 'signin') {
            onNavigate('signin');
        } else if (target === 'signup') {
            onNavigate('signup');
        } else if (target === 'network') {
            onNavigate('network');
        } else if (target === 'feed') {
            onNavigate('feed');
        } else if (target === 'messages') {
            onNavigate('messages');
        } else if (target === 'professionals') {
            onNavigate('professionals');
        }
    };

    // Check if we're on auth pages
    const isAuthPage = currentView === 'signin' || currentView === 'signup';
    const isRecruiter = currentUser?.role === 'recruiter';

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-brand" onClick={() => handleNavClick('home')}>
                    JobNest {isRecruiter ? <span className="role-badge">Recruiter</span> : ''}
                </div>
                {!isAuthPage && (
                    <ul className="nav-links">
                        {!currentUser ? (
                            // Landing Page Nav for unauthenticated users
                            <>
                                <li
                                    className={currentView === 'placements' ? 'active-link' : ''}
                                    onClick={() => handleNavClick('placements')}
                                >
                                    Placements
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
                                <li
                                    className={currentView === 'pricing' ? 'active-link' : ''}
                                    onClick={() => handleNavClick('pricing')}
                                >
                                    Pricing
                                </li>
                                <li className="nav-btn-outline" onClick={() => handleNavClick('signin')}>Sign In</li>
                                <li className="nav-btn" onClick={() => handleNavClick('signup')}>Sign Up</li>
                            </>
                        ) : (
                            // Full Nav for authenticated users
                            <>
                                <li
                                    className={currentView === 'feed' ? 'active-link' : ''}
                                    onClick={() => handleNavClick('feed')}
                                >
                                    Feed
                                </li>
                                <li
                                    className={currentView === 'messages' ? 'active-link' : ''}
                                    onClick={() => handleNavClick('messages')}
                                >
                                    Messages
                                </li>
                                <li
                                    className={currentView === 'professionals' ? 'active-link' : ''}
                                    onClick={() => handleNavClick('professionals')}
                                >
                                    Professionals
                                </li>
                                <li
                                    className={currentView === 'jobs' ? 'active-link' : ''}
                                    onClick={() => handleNavClick('jobs')}
                                >
                                    {isRecruiter ? 'Manage Jobs' : 'Find Jobs'}
                                </li>
                                <li
                                    className={currentView === 'placements' ? 'active-link' : ''}
                                    onClick={() => handleNavClick('placements')}
                                >
                                    Placements
                                </li>
                                <li
                                    className={currentView === 'events' ? 'active-link' : ''}
                                    onClick={() => handleNavClick('events')}
                                >
                                    Events
                                </li>
                                <li
                                    className={currentView === 'network' ? 'active-link' : ''}
                                    onClick={() => handleNavClick('network')}
                                >
                                    Network
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
                                <li
                                    className={currentView === 'pricing' ? 'active-link' : ''}
                                    onClick={() => handleNavClick('pricing')}
                                >
                                    Pricing
                                </li>
                                <li className="nav-btn" onClick={() => handleNavClick('home')}>Home</li>
                                <li
                                    className={currentView === 'account' ? 'active-link account-icon' : 'account-icon'}
                                    onClick={() => onNavigate('account')}
                                    title="Profile"
                                >
                                    <div className="nav-user-info">
                                        <span className="nav-user-name">{currentUser?.name?.split(' ')[0]}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
