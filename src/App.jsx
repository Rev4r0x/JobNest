import React, { useState, useEffect } from 'react';
import './App.css';
import ParticlesBackground from './components/ParticlesBackground';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AboutContactPage from './components/AboutContactPage';
import AccountPage from './components/AccountPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import JobsPage from './components/JobsPage';
import EventsPage from './components/EventsPage';

function App() {
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const [currentUser, setCurrentUser] = useState(() => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    });

    // Read initial view from localStorage, but default to 'landing' if not authenticated
    const [view, setView] = useState(() => {
        const savedView = localStorage.getItem('currentView');
        const isAuth = localStorage.getItem('isAuthenticated') === 'true';

        // If not authenticated, always start at landing page
        if (!isAuth) {
            return 'landing';
        }

        // If authenticated, restore saved view or default to dashboard
        return savedView || 'dashboard';
    });
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Save view to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('currentView', view);
    }, [view]);

    // Unified navigation handler
    const navigateTo = (targetView) => {
        if (view === targetView) return;

        // Check if we are switching between about and contact (same page)
        const isSharedPage = (v) => v === 'about' || v === 'contact';

        if (isSharedPage(view) && isSharedPage(targetView)) {
            // Skip transition animation, just update view to trigger scroll
            setView(targetView);
            return;
        }

        setIsTransitioning(true);
        setTimeout(() => {
            setView(targetView);
            setIsTransitioning(false);
            // Scroll to top when changing full pages
            window.scrollTo(0, 0);
        }, 500);
    };

    // Handle sign in
    const handleSignIn = (user) => {
        setIsAuthenticated(true);
        setCurrentUser(user);
    };

    // Handle sign out
    const handleSignOut = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        localStorage.setItem('currentView', 'signin');
        setView('signin'); // Immediately set view to signin
        window.scrollTo(0, 0);
    };

    const renderView = () => {
        switch (view) {
            case 'landing':
                return <LandingPage onStart={() => navigateTo('dashboard')} onNavigate={navigateTo} />;
            case 'dashboard':
                return <Dashboard onNavigate={navigateTo} currentUser={currentUser} />;
            case 'jobs':
                return <JobsPage onNavigate={navigateTo} currentUser={currentUser} />;
            case 'events':
                return <EventsPage onNavigate={navigateTo} currentUser={currentUser} />;
            case 'contact':
                return <AboutContactPage onNavigate={navigateTo} targetSection="contact" currentUser={currentUser} />;
            case 'about':
                return <AboutContactPage onNavigate={navigateTo} targetSection="about" currentUser={currentUser} />;
            case 'signin':
                return <SignInPage onNavigate={navigateTo} onSignIn={handleSignIn} />;
            case 'signup':
                return <SignUpPage onNavigate={navigateTo} onSignIn={handleSignIn} />;
            case 'account':
                // Protect account route
                if (!isAuthenticated) {
                    navigateTo('signin');
                    return <SignInPage onNavigate={navigateTo} onSignIn={handleSignIn} />;
                }
                return (
                    <React.Fragment>
                        <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
                            <AccountPage onNavigate={navigateTo} currentUser={currentUser} onSignOut={handleSignOut} />
                        </div>
                    </React.Fragment>
                );
            default:
                return <LandingPage onStart={() => navigateTo('dashboard')} />;
        }
    };

    return (
        <div className="root-container">
            {/* Particles only for Landing Page */}
            {view === 'landing' && <ParticlesBackground />}

            <div className={`view-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                {renderView()}
            </div>
        </div>
    );
}

export default App;
