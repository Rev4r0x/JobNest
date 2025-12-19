import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutPage = ({ onNavigate }) => {
    return (
        <div className="dashboard-container">
            <Navbar onNavigate={onNavigate} currentView="about" />

            <div className="main-content" style={{ marginTop: '2rem' }}>
                <div className="about-container section slide-up-group">
                    <h1 className="section-title">About JobNest</h1>

                    <div className="about-hero">
                        <h2>Empowering Careers, Connecting Communities</h2>
                        <p>
                            JobNest is more than just a job board. We are a community-driven platform dedicated to
                            bridging the gap between talented professionals and world-class opportunities.
                        </p>
                    </div>

                    <div className="about-grid">
                        <div className="about-card">
                            <h3>Our Mission</h3>
                            <p>To democratize access to career growth by providing a transparent, efficient, and inspiring platform for job seekers and event goers alike.</p>
                        </div>
                        <div className="about-card">
                            <h3>Our Vision</h3>
                            <p>A world where every professional finds their perfect fit, and every event sparks life-changing connections.</p>
                        </div>
                        <div className="about-card">
                            <h3>The Journey</h3>
                            <p>Founded in 2024, started as a small project to help local developers find meetups, now scaling to serve professionals globally.</p>
                        </div>
                    </div>

                    <div className="stats-row">
                        <div className="stat-item">
                            <span className="stat-number">10k+</span>
                            <span className="stat-label">Jobs Posted</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Community Events</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50k+</span>
                            <span className="stat-label">Active Users</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default AboutPage;
