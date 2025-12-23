import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import PostAnnouncement from './PostAnnouncement';

const AnnouncementsPage = ({ onNavigate, currentUser }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = () => {
        const data = JSON.parse(localStorage.getItem('announcements') || '[]');
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAnnouncements(sorted);
    };

    const handlePostClose = () => {
        setShowPostForm(false);
        loadAnnouncements();
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (showPostForm) {
        return <PostAnnouncement onNavigate={onNavigate} currentUser={currentUser} onClose={handlePostClose} />;
    }

    return (
        <div className="announcements-page">
            <Navbar onNavigate={onNavigate} currentView="announcements" currentUser={currentUser} />

            <div className="announcements-container">
                <div className="announcements-header">
                    <h1>Announcements</h1>
                    <button className="post-btn" onClick={() => setShowPostForm(true)}>
                        + Post Announcement
                    </button>
                </div>

                {announcements.length === 0 ? (
                    <div className="no-announcements">
                        <p>No announcements yet</p>
                    </div>
                ) : (
                    <div className="announcements-list">
                        {announcements.map((announcement) => (
                            <div key={announcement.id} className="announcement-card">
                                <h2>{announcement.title}</h2>
                                <p className="announcement-meta">
                                    <span className="author">{announcement.postedBy}</span>
                                    <span className="date">{formatDate(announcement.createdAt)}</span>
                                </p>
                                <p className="announcement-content">{announcement.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .announcements-page {
                    min-height: 100vh;
                    background: #f5f5f5;
                }

                .announcements-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    margin-top: 80px;
                }

                .announcements-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }

                .announcements-header h1 {
                    font-size: 32px;
                    color: #333;
                    margin: 0;
                }

                .post-btn {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                    transition: background 0.3s;
                }

                .post-btn:hover {
                    background: #5568d3;
                }

                .no-announcements {
                    text-align: center;
                    padding: 60px 20px;
                    background: white;
                    border-radius: 8px;
                    color: #999;
                }

                .announcements-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .announcement-card {
                    background: white;
                    padding: 24px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    border-left: 4px solid #667eea;
                }

                .announcement-card h2 {
                    margin: 0 0 12px 0;
                    font-size: 20px;
                    color: #333;
                }

                .announcement-meta {
                    margin: 0 0 16px 0;
                    font-size: 13px;
                    color: #666;
                    display: flex;
                    gap: 16px;
                }

                .author {
                    font-weight: 600;
                    color: #667eea;
                }

                .announcement-content {
                    margin: 0;
                    color: #333;
                    line-height: 1.6;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
            `}</style>
        </div>
    );
};

export default AnnouncementsPage;
