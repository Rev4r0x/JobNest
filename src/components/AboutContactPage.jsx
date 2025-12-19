import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactSection from './ContactSection';
import AnimatedCounter from './AnimatedCounter';
// Import images
import heroImg from '../assets/about-hero.png';
import journeyImg from '../assets/journey.png';

const AboutContactPage = ({ onNavigate, targetSection, currentUser }) => {

    useEffect(() => {
        // Scroll to the specific section when targetSection changes or on mount
        const element = document.getElementById(targetSection);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [targetSection]);

    return (
        <div className="dashboard-container">
            <Navbar onNavigate={onNavigate} currentView={targetSection} currentUser={currentUser} />

            <div className="main-content" style={{ marginTop: '2rem' }}>

                {/* ABOUT SECTION */}
                <div id="about" className="about-container section">
                    <h1 className="section-title anim-scale">About JobNest</h1>

                    {/* HERO WITH IMAGE */}
                    <div className="about-hero-section">
                        <div className="about-hero-text anim-left">
                            <h2>Empowering Careers, <br />Connecting Communities</h2>
                            <p>
                                JobNest is more than just a job board. We are a community-driven platform dedicated to
                                bridging the gap between talented professionals and world-class opportunities.
                            </p>
                        </div>
                        <div className="about-hero-image-container anim-right">
                            <img src={heroImg} alt="Team Collaboration" className="floating-image" />
                        </div>
                    </div>

                    <div className="about-grid">
                        <div className="about-card anim-scale anim-delay-200">
                            <h3>Our Mission</h3>
                            <p>To democratize access to career growth by providing a transparent, efficient, and inspiring platform for job seekers and event goers alike.</p>
                        </div>
                        <div className="about-card anim-scale anim-delay-400">
                            <h3>Our Vision</h3>
                            <p>A world where every professional finds their perfect fit, and every event sparks life-changing connections.</p>
                        </div>

                        <div className="about-card anim-scale anim-delay-400">
                            <h3>The Values</h3>
                            <p>Integrity, Innovation, and Inclusivity drive everything we do. We believe in building products that serve everyone.</p>
                        </div>
                    </div>

                    {/* JOURNEY SECTION WITH IMAGE */}
                    <div className="journey-section">
                        <div className="journey-image-container anim-left">
                            <img src={journeyImg} alt="Our Journey Timeline" className="slide-in-image" />
                        </div>
                        <div className="journey-content anim-right">
                            <h3>The Journey</h3>
                            <p>Founded in 2024, started as a small project to help local developers find meetups, JobNest has grown exponentially.</p>
                            <p>From a simple script to a full-fledged platform, our path has been defined by user feedback and constant innovation.</p>
                        </div>
                    </div>

                    <div className="stats-row">
                        <div className="stat-item pulse-anim anim-scale">
                            <span className="stat-number">
                                <AnimatedCounter end={10} suffix="k+" />
                            </span>
                            <span className="stat-label">Jobs Posted</span>
                        </div>
                        <div className="stat-item pulse-anim delay-1 anim-scale anim-delay-200">
                            <span className="stat-number">
                                <AnimatedCounter end={500} suffix="+" />
                            </span>
                            <span className="stat-label">Community Events</span>
                        </div>
                        <div className="stat-item pulse-anim delay-2 anim-scale anim-delay-400">
                            <span className="stat-number">
                                <AnimatedCounter end={50} suffix="k+" />
                            </span>
                            <span className="stat-label">Active Users</span>
                        </div>
                    </div>
                </div>

                {/* Separator / Spacing */}
                <div style={{ margin: '6rem 0' }}></div>

                {/* CONTACT SECTION */}
                <div id="contact" className="section slide-up-group delay-group">
                    <ContactSection />
                </div>

            </div>

            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default AboutContactPage;
