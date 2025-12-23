import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PlacementsPage = ({ onNavigate, currentUser }) => {
    const stats = [
        { label: 'Total Placements', value: '2,500+', icon: '🎓' },
        { label: 'Highest Package', value: '45 LPA', icon: '💰' },
        { label: 'Average Package', value: '8.5 LPA', icon: '📈' },
        { label: 'Hiring Partners', value: '500+', icon: '🤝' }
    ];

    const partners = [
        'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix',
        'Adobe', 'Salesforce', 'Uber', 'Airbnb', 'Spotify'
    ];

    const stories = [
        {
            name: 'Sarah Chen',
            role: 'Software Engineer @ Google',
            text: 'JobNest helped me find my dream role within weeks. The interface and curated listings are top-notch!',
            avatar: 'SC'
        },
        {
            name: 'Michael Ross',
            role: 'Product Manager @ Microsoft',
            text: 'The events hosted here are game-changers. I met my current manager at a networking workshop found on JobNest.',
            avatar: 'MR'
        }
    ];

    return (
        <div className="placements-page">
            <Navbar onNavigate={onNavigate} currentView="placements" currentUser={currentUser} />

            <section className="placements-hero">
                <div className="hero-content">
                    <h1 className="anim-scale">Your Career <span className="highlight-text">Launchpad</span></h1>
                    <p className="anim-up">Connecting top talent with industry leaders. See where our community is headed.</p>
                </div>
            </section>

            <section className="placements-stats">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card anim-scale" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="partners-section">
                <h2 className="section-title">Top Recruiting Partners</h2>
                <div className="partners-ticker">
                    <div className="ticker-content">
                        {[...partners, ...partners].map((partner, index) => (
                            <div key={index} className="partner-logo">
                                {partner}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="success-stories">
                <h2 className="section-title">Success Stories</h2>
                <div className="stories-grid">
                    {stories.map((story, index) => (
                        <div key={index} className="story-card anim-up" style={{ animationDelay: `${index * 200}ms` }}>
                            <div className="story-avatar">{story.avatar}</div>
                            <p className="story-text">"{story.text}"</p>
                            <div className="story-info">
                                <strong>{story.name}</strong>
                                <span>{story.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default PlacementsPage;
