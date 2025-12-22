import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const ProfilePage = ({ onNavigate, currentUser, onProfileUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(
        currentUser?.profile || {
            headline: '',
            about: '',
            skills: [],
            experience: [],
            education: [],
            profilePhoto: ''
        }
    );
    const [skillInput, setSkillInput] = useState('');
    const [expInput, setExpInput] = useState('');
    const [eduInput, setEduInput] = useState('');
    const [message, setMessage] = useState('');

    const handleProfileChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addSkill = () => {
        if (skillInput.trim()) {
            setProfile(prev => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()]
            }));
            setSkillInput('');
        }
    };

    const removeSkill = (index) => {
        setProfile(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const addExperience = () => {
        if (expInput.trim()) {
            setProfile(prev => ({
                ...prev,
                experience: [...prev.experience, expInput.trim()]
            }));
            setExpInput('');
        }
    };

    const removeExperience = (index) => {
        setProfile(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }));
    };

    const addEducation = () => {
        if (eduInput.trim()) {
            setProfile(prev => ({
                ...prev,
                education: [...prev.education, eduInput.trim()]
            }));
            setEduInput('');
        }
    };

    const removeEducation = (index) => {
        setProfile(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    const handleSave = () => {
        const updatedUser = {
            ...currentUser,
            profile
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
        }

        onProfileUpdate(updatedUser);
        setIsEditing(false);
        setMessage('Profile saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="profile-page">
            <Navbar onNavigate={onNavigate} currentView="profile" currentUser={currentUser} />

            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-photo">
                        {profile.profilePhoto ? (
                            <img src={profile.profilePhoto} alt={currentUser?.name} />
                        ) : (
                            <div className="photo-placeholder">📷</div>
                        )}
                    </div>
                    <div className="profile-info">
                        <h1>{currentUser?.name}</h1>
                        <p className="email">{currentUser?.email}</p>
                        {profile.headline && <p className="headline">{profile.headline}</p>}
                    </div>
                    {!isEditing && (
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    )}
                </div>

                {message && <div className="success-message">{message}</div>}

                {isEditing ? (
                    <div className="profile-form">
                        <div className="form-group">
                            <label>Headline</label>
                            <input
                                type="text"
                                placeholder="Your professional headline"
                                value={profile.headline}
                                onChange={(e) => handleProfileChange('headline', e.target.value)}
                                maxLength="100"
                            />
                        </div>

                        <div className="form-group">
                            <label>About</label>
                            <textarea
                                placeholder="Tell us about yourself"
                                value={profile.about}
                                onChange={(e) => handleProfileChange('about', e.target.value)}
                                rows="4"
                            />
                        </div>

                        <div className="form-group">
                            <label>Profile Photo URL</label>
                            <input
                                type="text"
                                placeholder="https://example.com/photo.jpg"
                                value={profile.profilePhoto}
                                onChange={(e) => handleProfileChange('profilePhoto', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Skills</label>
                            <div className="list-input-group">
                                <input
                                    type="text"
                                    placeholder="Add a skill"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                />
                                <button type="button" onClick={addSkill} className="add-btn">
                                    Add
                                </button>
                            </div>
                            <div className="tags-list">
                                {profile.skills.map((skill, idx) => (
                                    <div key={idx} className="tag">
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(idx)}
                                            className="remove-btn"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Experience</label>
                            <div className="list-input-group">
                                <input
                                    type="text"
                                    placeholder="Add experience"
                                    value={expInput}
                                    onChange={(e) => setExpInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addExperience()}
                                />
                                <button type="button" onClick={addExperience} className="add-btn">
                                    Add
                                </button>
                            </div>
                            <div className="list-items">
                                {profile.experience.map((exp, idx) => (
                                    <div key={idx} className="list-item">
                                        {exp}
                                        <button
                                            type="button"
                                            onClick={() => removeExperience(idx)}
                                            className="remove-btn"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Education</label>
                            <div className="list-input-group">
                                <input
                                    type="text"
                                    placeholder="Add education"
                                    value={eduInput}
                                    onChange={(e) => setEduInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addEducation()}
                                />
                                <button type="button" onClick={addEducation} className="add-btn">
                                    Add
                                </button>
                            </div>
                            <div className="list-items">
                                {profile.education.map((edu, idx) => (
                                    <div key={idx} className="list-item">
                                        {edu}
                                        <button
                                            type="button"
                                            onClick={() => removeEducation(idx)}
                                            className="remove-btn"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button className="save-btn" onClick={handleSave}>
                                Save Changes
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setIsEditing(false);
                                    setProfile(currentUser?.profile || {
                                        headline: '',
                                        about: '',
                                        skills: [],
                                        experience: [],
                                        education: [],
                                        profilePhoto: ''
                                    });
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="profile-view">
                        {profile.about && (
                            <div className="section">
                                <h2>About</h2>
                                <p>{profile.about}</p>
                            </div>
                        )}

                        {profile.skills.length > 0 && (
                            <div className="section">
                                <h2>Skills</h2>
                                <div className="tags-list">
                                    {profile.skills.map((skill, idx) => (
                                        <span key={idx} className="tag-view">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {profile.experience.length > 0 && (
                            <div className="section">
                                <h2>Experience</h2>
                                <ul className="list-view">
                                    {profile.experience.map((exp, idx) => (
                                        <li key={idx}>{exp}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {profile.education.length > 0 && (
                            <div className="section">
                                <h2>Education</h2>
                                <ul className="list-view">
                                    {profile.education.map((edu, idx) => (
                                        <li key={idx}>{edu}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                .profile-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .profile-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 40px 20px;
                }

                .profile-header {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    margin-bottom: 30px;
                }

                .profile-photo {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                    background: #f0f0f0;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .profile-photo img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .photo-placeholder {
                    font-size: 48px;
                }

                .profile-info {
                    flex: 1;
                }

                .profile-info h1 {
                    margin: 0 0 8px 0;
                    font-size: 32px;
                    color: #333;
                }

                .profile-info .email {
                    margin: 0 0 8px 0;
                    color: #666;
                    font-size: 14px;
                }

                .profile-info .headline {
                    margin: 0;
                    color: #667eea;
                    font-size: 16px;
                    font-weight: 500;
                }

                .edit-btn {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                }

                .edit-btn:hover {
                    background: #5568d3;
                }

                .success-message {
                    background: #d4edda;
                    color: #155724;
                    padding: 12px 20px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                    border: 1px solid #c3e6cb;
                }

                .profile-form {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .form-group {
                    margin-bottom: 25px;
                }

                .form-group label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #333;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 14px;
                    font-family: inherit;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .list-input-group {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .list-input-group input {
                    flex: 1;
                }

                .add-btn {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                }

                .add-btn:hover {
                    background: #5568d3;
                }

                .tags-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .tag,
                .tag-view {
                    background: #f0f0f0;
                    padding: 8px 12px;
                    border-radius: 20px;
                    font-size: 14px;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }

                .tag {
                    background: #e8eaf6;
                    color: #667eea;
                }

                .tag-view {
                    background: #f0f0f0;
                    color: #333;
                }

                .remove-btn {
                    background: none;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 0;
                }

                .list-items {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .list-item {
                    background: #f9f9f9;
                    padding: 12px;
                    border-radius: 6px;
                    border: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .form-actions {
                    display: flex;
                    gap: 15px;
                    margin-top: 30px;
                }

                .save-btn {
                    flex: 1;
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 16px;
                }

                .save-btn:hover {
                    background: #5568d3;
                }

                .cancel-btn {
                    flex: 1;
                    background: #f0f0f0;
                    color: #333;
                    border: 1px solid #ddd;
                    padding: 12px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 16px;
                }

                .cancel-btn:hover {
                    background: #e8e8e8;
                }

                .profile-view {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .section {
                    margin-bottom: 30px;
                }

                .section h2 {
                    font-size: 20px;
                    margin: 0 0 15px 0;
                    color: #333;
                    border-bottom: 2px solid #667eea;
                    padding-bottom: 10px;
                }

                .section p {
                    color: #666;
                    line-height: 1.6;
                    margin: 0;
                }

                .list-view {
                    margin: 0;
                    padding-left: 20px;
                    color: #666;
                    line-height: 1.8;
                }

                .list-view li {
                    margin-bottom: 8px;
                }
            `}</style>
        </div>
    );
};

export default ProfilePage;
