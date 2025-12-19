import React, { useState } from 'react';
import Navbar from './Navbar';

const AccountPage = ({ onNavigate, currentUser: initialUser, onSignOut }) => {
    const [user, setUser] = useState(initialUser || {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        title: 'Senior Frontend Developer',
        location: 'Austin, TX',
        bio: 'Passionate about building accessible and performant web applications. Love React, CSS, and coffee.',
        skills: ['React', 'JavaScript', 'CSS', 'Node.js', 'Figma']
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Update user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Simulate API call
        console.log('User saved:', user);
    };

    return (
        <div className="account-container fade-in">
            <Navbar onNavigate={onNavigate} currentView="account" />

            <div className="account-content-wrapper" style={{ marginTop: '80px', padding: '2rem' }}>
                <div className="account-header">
                    <div className="profile-cover"></div>
                    <div className="profile-info-wrapper">
                        <div className="profile-avatar">
                            <span className="avatar-initials">{user.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="profile-text">
                            <h1 className="profile-name">{user.name}</h1>
                            <p className="profile-title">{user.title}</p>
                            <p className="profile-location">📍 {user.location}</p>
                        </div>
                        <button
                            className="edit-profile-btn"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                        </button>
                        {onSignOut && (
                            <button
                                className="signout-btn"
                                onClick={onSignOut}
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>

                <div className="account-grid">
                    {/* LEFT COLUMN: Stats & Bio */}
                    <div className="account-left">
                        <div className="account-card stats-card slide-up-group delay-1">
                            <h3>Your Activity</h3>
                            <div className="stats-row-small">
                                <div className="stat-small">
                                    <span className="stat-val">12</span>
                                    <span className="stat-lbl">Applied</span>
                                </div>
                                <div className="stat-small">
                                    <span className="stat-val">5</span>
                                    <span className="stat-lbl">Events</span>
                                </div>
                                <div className="stat-small">
                                    <span className="stat-val">8</span>
                                    <span className="stat-lbl">Saved</span>
                                </div>
                            </div>
                        </div>

                        <div className="account-card bio-card slide-up-group delay-2">
                            <h3>About Me</h3>
                            <p>{user.bio}</p>
                            <div className="skills-list">
                                {user.skills.map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Settings Form */}
                    <div className="account-right">
                        <div className="account-card settings-card slide-up-group delay-3">
                            <h3>Account Settings</h3>
                            <form onSubmit={handleSave} className="settings-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Job Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={user.title}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={user.location}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                    />
                                </div>

                                {isEditing && (
                                    <button type="submit" className="save-btn fade-in">
                                        Save Changes
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
