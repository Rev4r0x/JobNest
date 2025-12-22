import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CreatePost from './CreatePost';

const FeedPage = ({ onNavigate, currentUser }) => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const connections = JSON.parse(localStorage.getItem('connections') || '[]');

        const getAcceptedConnections = () => {
            return connections
                .filter(c => c.status === 'accepted' && 
                       (c.senderId === currentUser.email || c.receiverId === currentUser.email))
                .map(c => c.senderId === currentUser.email ? c.receiverId : c.senderId);
        };

        const acceptedConnections = getAcceptedConnections();
        const feedUserEmails = [currentUser.email, ...acceptedConnections];

        const feedPosts = allPosts
            .filter(p => feedUserEmails.includes(p.userId))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPosts(feedPosts);
        setUsers(allUsers);
    }, [currentUser, refresh]);

    const getUserName = (email) => {
        const user = users.find(u => u.email === email);
        return user?.name || 'Unknown User';
    };

    const toggleLike = (postId) => {
        const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        const updated = allPosts.map(p => {
            if (p.id === postId) {
                const likes = p.likes || [];
                const hasLiked = likes.includes(currentUser.email);
                return {
                    ...p,
                    likes: hasLiked
                        ? likes.filter(l => l !== currentUser.email)
                        : [...likes, currentUser.email]
                };
            }
            return p;
        });
        localStorage.setItem('posts', JSON.stringify(updated));
        setRefresh(prev => prev + 1);
    };

    const addComment = (postId, comment) => {
        if (!comment.trim()) return;
        
        const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        const updated = allPosts.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    comments: [...(p.comments || []), {
                        userId: currentUser.email,
                        userName: currentUser.name,
                        text: comment.trim(),
                        createdAt: new Date().toISOString()
                    }]
                };
            }
            return p;
        });
        localStorage.setItem('posts', JSON.stringify(updated));
        setRefresh(prev => prev + 1);
    };

    return (
        <div className="feed-page">
            <Navbar onNavigate={onNavigate} currentView="feed" currentUser={currentUser} />

            <div className="feed-container">
                <CreatePost currentUser={currentUser} onPostCreated={() => setRefresh(prev => prev + 1)} />

                <div className="feed">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            currentUser={currentUser}
                            onLike={() => toggleLike(post.id)}
                            onComment={(comment) => addComment(post.id, comment)}
                        />
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="empty-feed">
                        <p>No posts yet. Start connecting or create your first post!</p>
                    </div>
                )}
            </div>

            <style>{`
                .feed-page {
                    min-height: 100vh;
                    background: #f5f5f5;
                    padding-bottom: 40px;
                }

                .feed-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    margin-top: 80px;
                }

                .feed {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .empty-feed {
                    text-align: center;
                    padding: 60px 20px;
                    color: #999;
                    background: white;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
};

const PostCard = ({ post, currentUser, onLike, onComment }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const hasLiked = post.likes?.includes(currentUser.email);
    const comments = post.comments || [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor(diff / (1000 * 60));

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (mins > 0) return `${mins}m ago`;
        return 'just now';
    };

    const handleComment = () => {
        if (commentText.trim()) {
            onComment(commentText);
            setCommentText('');
        }
    };

    return (
        <div className="post-card">
            <div className="post-header">
                <div className="post-avatar">{post.userName.split(' ').map(n => n[0]).join('')}</div>
                <div className="post-meta">
                    <p className="post-author">{post.userName}</p>
                    <p className="post-time">{formatDate(post.createdAt)}</p>
                </div>
            </div>

            <div className="post-content">
                <p>{post.content}</p>
            </div>

            <div className="post-stats">
                {post.likes?.length > 0 && <span>{post.likes.length} like{post.likes.length !== 1 ? 's' : ''}</span>}
                {comments.length > 0 && <span>{comments.length} comment{comments.length !== 1 ? 's' : ''}</span>}
            </div>

            <div className="post-actions">
                <button
                    className={`action-btn ${hasLiked ? 'liked' : ''}`}
                    onClick={onLike}
                >
                    👍 {hasLiked ? 'Unlike' : 'Like'}
                </button>
                <button
                    className="action-btn"
                    onClick={() => setShowComments(!showComments)}
                >
                    💬 Comment
                </button>
            </div>

            {showComments && (
                <div className="comments-section">
                    <div className="comments-list">
                        {comments.map((comment, idx) => (
                            <div key={idx} className="comment">
                                <p className="comment-author">{comment.userName}</p>
                                <p className="comment-text">{comment.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="comment-input">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                        />
                        <button onClick={handleComment}>Post</button>
                    </div>
                </div>
            )}

            <style>{`
                .post-card {
                    background: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .post-header {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .post-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: #667eea;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 14px;
                    flex-shrink: 0;
                }

                .post-meta {
                    flex: 1;
                }

                .post-author {
                    margin: 0;
                    font-weight: 600;
                    color: #333;
                    font-size: 14px;
                }

                .post-time {
                    margin: 2px 0 0 0;
                    font-size: 12px;
                    color: #999;
                }

                .post-content {
                    margin-bottom: 12px;
                    line-height: 1.5;
                    color: #333;
                }

                .post-content p {
                    margin: 0;
                }

                .post-stats {
                    display: flex;
                    gap: 16px;
                    font-size: 12px;
                    color: #666;
                    padding: 12px 0;
                    border-top: 1px solid #eee;
                    border-bottom: 1px solid #eee;
                    margin-bottom: 12px;
                }

                .post-actions {
                    display: flex;
                    gap: 12px;
                }

                .action-btn {
                    flex: 1;
                    padding: 8px;
                    border: none;
                    background: #f0f0f0;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 13px;
                    color: #333;
                    transition: background 0.3s;
                }

                .action-btn:hover {
                    background: #e0e0e0;
                }

                .action-btn.liked {
                    background: #e8f5e9;
                    color: #2e7d32;
                }

                .comments-section {
                    margin-top: 16px;
                    padding-top: 16px;
                    border-top: 1px solid #eee;
                }

                .comments-list {
                    margin-bottom: 12px;
                    max-height: 300px;
                    overflow-y: auto;
                }

                .comment {
                    margin-bottom: 12px;
                    padding: 8px;
                    background: #f9f9f9;
                    border-radius: 4px;
                }

                .comment-author {
                    margin: 0 0 4px 0;
                    font-weight: 600;
                    font-size: 12px;
                    color: #333;
                }

                .comment-text {
                    margin: 0;
                    font-size: 13px;
                    color: #666;
                }

                .comment-input {
                    display: flex;
                    gap: 8px;
                }

                .comment-input input {
                    flex: 1;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 8px 12px;
                    font-size: 13px;
                }

                .comment-input input:focus {
                    outline: none;
                    border-color: #667eea;
                }

                .comment-input button {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 12px;
                }

                .comment-input button:hover {
                    background: #5568d3;
                }
            `}</style>
        </div>
    );
};

export default FeedPage;
