import React, { useState } from 'react';
import Navbar from './Navbar';

const AccountPage = ({ onNavigate, currentUser: initialUser, onSignOut, setCurrentUser }) => {
    const isRecruiter = initialUser?.role === 'recruiter';

    const [user, setUser] = useState(initialUser || {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        role: 'seeker',
        title: 'Senior Frontend Developer',
        location: 'Austin, TX',
        bio: 'Passionate about building accessible and performant web applications. Love React, CSS, and coffee.',
        skills: ['React', 'JavaScript', 'CSS', 'Node.js', 'Figma'],
        company: { name: '', position: '' },
        profile: {
            headline: '',
            about: '',
            skills: [],
            experience: [],
            education: [],
            profilePhoto: ''
        }
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('company.')) {
            const field = name.split('.')[1];
            setUser(prev => ({
                ...prev,
                company: { ...prev.company, [field]: value }
            }));
        } else {
            setUser(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Also update in 'users' list to keep consistency
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(u => u.email === user.email ? user : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        if (setCurrentUser) setCurrentUser(user);
        console.log('User saved:', user);
    };

    return (
        <div className="account-container fade-in">
            <Navbar onNavigate={onNavigate} currentView="account" currentUser={initialUser} />

            <div className="account-content-wrapper" style={{ marginTop: '80px', padding: '2rem' }}>
                <div className="account-header">
                    <div className="profile-cover"></div>
                    <div className="profile-info-wrapper">
                        <div className="profile-avatar">
                            <span className="avatar-initials">{user.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="profile-text">
                            <h1 className="profile-name">{user.name}</h1>
                            <p className="profile-title">
                                {isRecruiter ? `${user.title} @ ${user.company?.name || 'Your Company'}` : user.title}
                            </p>
                            <p className="profile-location">📍 {user.location}</p>
                        </div>
                        <div className="profile-actions">
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
                </div>

                <div className="account-grid">
                    {/* LEFT COLUMN: Stats & Info */}
                    <div className="account-left">
                        <div className="account-card stats-card slide-up-group delay-1">
                            <h3>{isRecruiter ? 'Recruitment Activity' : 'Your Activity'}</h3>
                            <div className="stats-row-small">
                                {isRecruiter ? (
                                    <>
                                        <div className="stat-small">
                                            <span className="stat-val">4</span>
                                            <span className="stat-lbl">Posted</span>
                                        </div>
                                        <div className="stat-small">
                                            <span className="stat-val">28</span>
                                            <span className="stat-lbl">Applicants</span>
                                        </div>
                                        <div className="stat-small">
                                            <span className="stat-val">12</span>
                                            <span className="stat-lbl">Interviews</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="account-card bio-card slide-up-group delay-2">
                            <h3>{isRecruiter ? 'Recruiter Bio' : 'About Me'}</h3>
                            <p>{user.bio}</p>
                            {!isRecruiter && user.skills && (
                                <div className="skills-list">
                                    {user.skills.map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            )}
                            {isRecruiter && user.company?.name && (
                                <div className="company-info-tag">
                                    🏢 <strong>Company:</strong> {user.company.name}
                                </div>
                            )}
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

                                {isRecruiter ? (
                                    <>
                                        <div className="form-group">
                                            <label>Company Name</label>
                                            <input
                                                type="text"
                                                name="company.name"
                                                value={user.company?.name || ''}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className={!isEditing ? 'disabled-input' : ''}
                                                placeholder="Enter company name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Your Role in Company</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={user.title}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className={!isEditing ? 'disabled-input' : ''}
                                                placeholder="e.g. Talent Acquisition"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="form-group">
                                        <label>Job Title / Occupation</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={user.title}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={!isEditing ? 'disabled-input' : ''}
                                        />
                                    </div>
                                )}

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

                                <div className="form-group bio-group">
                                    <label>{isRecruiter ? 'Company/Recruiter Bio' : 'Professional Bio'}</label>
                                    <textarea
                                        name="bio"
                                        value={user.bio}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                        rows="4"
                                    />
                                </div>

                                {isEditing && (
                                    <button type="submit" className="save-btn fade-in">
                                        Save Changes
                                    </button>
                                )}
                            </form>
                        </div>

                        <div className="account-card profile-card slide-up-group delay-4">
                            <h3>LinkedIn-Style Profile</h3>
                            <form className="profile-form">
                                <div className="form-group">
                                    <label>Professional Headline</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Senior Developer | Tech Lead"
                                        value={user.profile?.headline || ''}
                                        onChange={(e) => setUser(prev => ({
                                            ...prev,
                                            profile: { ...prev.profile, headline: e.target.value }
                                        }))}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>About</label>
                                    <textarea
                                        placeholder="Tell more about yourself..."
                                        value={user.profile?.about || ''}
                                        onChange={(e) => setUser(prev => ({
                                            ...prev,
                                            profile: { ...prev.profile, about: e.target.value }
                                        }))}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                        rows="3"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Profile Photo URL</label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com/photo.jpg"
                                        value={user.profile?.profilePhoto || ''}
                                        onChange={(e) => setUser(prev => ({
                                            ...prev,
                                            profile: { ...prev.profile, profilePhoto: e.target.value }
                                        }))}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Experience</label>
                                    <textarea
                                        placeholder="e.g. Senior Developer at TechCorp (2020-2024)"
                                        value={user.profile?.experience?.join('\n') || ''}
                                        onChange={(e) => setUser(prev => ({
                                            ...prev,
                                            profile: { ...prev.profile, experience: e.target.value.split('\n').filter(x => x.trim()) }
                                        }))}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                        rows="3"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Education</label>
                                    <textarea
                                        placeholder="e.g. B.S. Computer Science - University (2020)"
                                        value={user.profile?.education?.join('\n') || ''}
                                        onChange={(e) => setUser(prev => ({
                                            ...prev,
                                            profile: { ...prev.profile, education: e.target.value.split('\n').filter(x => x.trim()) }
                                        }))}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                        rows="3"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Skills (comma-separated)</label>
                                    <input
                                        type="text"
                                        placeholder="React, Node.js, JavaScript"
                                        value={user.profile?.skills?.join(', ') || ''}
                                        onChange={(e) => setUser(prev => ({
                                            ...prev,
                                            profile: { ...prev.profile, skills: e.target.value.split(',').map(s => s.trim()).filter(x => x) }
                                        }))}
                                        disabled={!isEditing}
                                        className={!isEditing ? 'disabled-input' : ''}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
