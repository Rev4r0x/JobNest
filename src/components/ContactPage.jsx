import React from 'react';
import Navbar from './Navbar';
import ContactSection from './ContactSection';
import Footer from './Footer';

const ContactPage = ({ onNavigate }) => {
    return (
        <div className="dashboard-container">
            <Navbar onNavigate={onNavigate} currentView="contact" />

            <div className="main-content" style={{ marginTop: '2rem' }}>
                {/* Reusing Contact Section component but allowing it to take full width context */}
                <ContactSection />
            </div>

            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default ContactPage;
