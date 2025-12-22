import React, { useState } from 'react';
import Navbar from './Navbar';

const PostAnnouncement = ({ onNavigate, currentUser, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posted, setPosted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title.trim() || !content.trim()) {
            alert('Please fill in all fields');
            return;
        }

        const announcement = {
            id: Date.now(),
            title: title.trim(),
            content: content.trim(),
            postedBy: currentUser.name,
            postedByEmail: currentUser.email,
            createdAt: new Date().toISOString()
        };

        const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
        announcements.push(announcement);
        localStorage.setItem('announcements', JSON.stringify(announcements));

        setPosted(true);
        setTitle('');
        setContent('');

        setTimeout(() => {
            onClose();
        }, 1500);
    };

    return (
        <div className="post-announcement-page">
            <Navbar onNavigate={onNavigate} currentView="announcements" currentUser={currentUser} />

            <div className="post-container">
                {!posted ? (
                    <>
                        <h1>Post Announcement</h1>
                        <form onSubmit={handleSubmit} className="announcement-form">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter announcement title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    maxLength="100"
                                />
                            </div>

                            <div className="form-group">
                                <label>Content</label>
                                <textarea
                                    placeholder="Enter announcement content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows="6"
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Post Announcement
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="success-view">
                        <div className="success-icon">✓</div>
                        <h2>Announcement Posted!</h2>
                        <p>Your announcement has been published successfully.</p>
                    </div>
                )}
            </div>

            <style>{`
                .post-announcement-page {
                    min-height: 100vh;
                    background: #f5f5f5;
                }

                .post-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    margin-top: 80px;
                }

                .post-container h1 {
                    font-size: 28px;
                    color: #333;
                    margin: 0 0 30px 0;
                }

                .announcement-form {
                    background: white;
                    padding: 24px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #333;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-family: inherit;
                    font-size: 14px;
                    box-sizing: border-box;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .form-group textarea {
                    resize: vertical;
                }

                .form-actions {
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                }

                .cancel-btn, .submit-btn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 14px;
                }

                .cancel-btn {
                    background: #f0f0f0;
                    color: #333;
                }

                .cancel-btn:hover {
                    background: #e0e0e0;
                }

                .submit-btn {
                    background: #667eea;
                    color: white;
                }

                .submit-btn:hover {
                    background: #5568d3;
                }

                .success-view {
                    text-align: center;
                    padding: 60px 20px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .success-icon {
                    font-size: 48px;
                    color: #667eea;
                    margin-bottom: 16px;
                }

                .success-view h2 {
                    color: #333;
                    margin: 16px 0;
                }

                .success-view p {
                    color: #666;
                }
            `}</style>
        </div>
    );
};

export default PostAnnouncement;
