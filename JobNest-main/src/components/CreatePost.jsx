import React, { useState } from 'react';

const CreatePost = ({ currentUser, onPostCreated }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePost = () => {
        if (!content.trim()) return;

        setLoading(true);
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const newPost = {
            id: Date.now().toString(),
            userId: currentUser.email,
            userName: currentUser.name,
            content: content.trim(),
            likes: [],
            comments: [],
            createdAt: new Date().toISOString()
        };

        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        setContent('');
        setLoading(false);
        if (onPostCreated) onPostCreated();
    };

    return (
        <div className="create-post-container">
            <div className="post-input-box">
                <div className="post-author">
                    <div className="post-avatar">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <textarea
                        placeholder={`What's on your mind, ${currentUser.name?.split(' ')[0]}?`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="3"
                    />
                </div>
                <div className="post-actions">
                    <button
                        className="post-btn"
                        onClick={handlePost}
                        disabled={!content.trim() || loading}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </div>

            <style>{`
                .create-post-container {
                    margin-bottom: 30px;
                }

                .post-input-box {
                    background: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .post-author {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .post-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: #667eea;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .post-author textarea {
                    flex: 1;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    padding: 12px 16px;
                    font-family: inherit;
                    font-size: 14px;
                    resize: none;
                    transition: border-color 0.3s;
                }

                .post-author textarea:focus {
                    outline: none;
                    border-color: #667eea;
                }

                .post-actions {
                    display: flex;
                    justify-content: flex-end;
                }

                .post-btn {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 8px 24px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                    transition: background 0.3s;
                }

                .post-btn:hover:not(:disabled) {
                    background: #5568d3;
                }

                .post-btn:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default CreatePost;
