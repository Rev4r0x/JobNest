import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const NetworkPage = ({ onNavigate, currentUser }) => {
    const [users, setUsers] = useState([]);
    const [connections, setConnections] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const conns = JSON.parse(localStorage.getItem('connections') || '[]');
        
        const filteredUsers = allUsers.filter(u => u.email !== currentUser?.email);
        setUsers(filteredUsers);
        setConnections(conns);
    }, [currentUser, refreshTrigger]);

    const getConnectionStatus = (userId) => {
        const conn = connections.find(
            c => (c.senderId === currentUser.email && c.receiverId === userId) ||
                 (c.senderId === userId && c.receiverId === currentUser.email)
        );
        return conn?.status || null;
    };

    const getSentRequest = (userId) => {
        return connections.find(
            c => c.senderId === currentUser.email && c.receiverId === userId
        );
    };

    const getReceivedRequest = (userId) => {
        return connections.find(
            c => c.senderId === userId && c.receiverId === currentUser.email
        );
    };

    const sendRequest = (userId) => {
        const newConnection = {
            senderId: currentUser.email,
            receiverId: userId,
            status: 'pending',
            timestamp: new Date().toISOString()
        };
        const conns = JSON.parse(localStorage.getItem('connections') || '[]');
        conns.push(newConnection);
        localStorage.setItem('connections', JSON.stringify(conns));
        setRefreshTrigger(prev => prev + 1);
    };

    const acceptRequest = (userId) => {
        const conns = JSON.parse(localStorage.getItem('connections') || '[]');
        const updated = conns.map(c => 
            c.senderId === userId && c.receiverId === currentUser.email
                ? { ...c, status: 'accepted' }
                : c
        );
        localStorage.setItem('connections', JSON.stringify(updated));
        setRefreshTrigger(prev => prev + 1);
    };

    const rejectRequest = (userId) => {
        const conns = JSON.parse(localStorage.getItem('connections') || '[]');
        const updated = conns.filter(c => 
            !(c.senderId === userId && c.receiverId === currentUser.email)
        );
        localStorage.setItem('connections', JSON.stringify(updated));
        setRefreshTrigger(prev => prev + 1);
    };

    const getButtonStatus = (user) => {
        const status = getConnectionStatus(user.email);
        const sentReq = getSentRequest(user.email);
        const receivedReq = getReceivedRequest(user.email);

        if (status === 'accepted') {
            return { text: 'Connected', disabled: true, type: 'connected' };
        }
        if (sentReq && sentReq.status === 'pending') {
            return { text: 'Pending', disabled: true, type: 'pending' };
        }
        if (receivedReq && receivedReq.status === 'pending') {
            return { text: 'Requests', disabled: false, type: 'request', userId: user.email };
        }
        return { text: 'Connect', disabled: false, type: 'connect', userId: user.email };
    };

    return (
        <div className="network-page">
            <Navbar onNavigate={onNavigate} currentView="network" currentUser={currentUser} />

            <div className="network-container">
                <h1>Professional Network</h1>
                <p className="subtitle">Expand your network and connect with professionals</p>

                <div className="users-grid">
                    {users.map((user) => {
                        const btnStatus = getButtonStatus(user);
                        const receivedReq = getReceivedRequest(user.email);
                        
                        return (
                            <div key={user.email} className="user-card">
                                <div className="user-avatar">
                                    {user.profile?.profilePhoto ? (
                                        <img src={user.profile.profilePhoto} alt={user.name} />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    )}
                                </div>
                                <h3>{user.name}</h3>
                                <p className="title">{user.title}</p>
                                {user.profile?.headline && (
                                    <p className="headline">{user.profile.headline}</p>
                                )}
                                <p className="location">{user.location}</p>

                                {btnStatus.type === 'request' ? (
                                    <div className="request-actions">
                                        <button 
                                            className="accept-btn"
                                            onClick={() => acceptRequest(user.email)}
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            className="reject-btn"
                                            onClick={() => rejectRequest(user.email)}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className={`action-btn ${btnStatus.type}`}
                                        disabled={btnStatus.disabled}
                                        onClick={() => {
                                            if (btnStatus.type === 'connect') {
                                                sendRequest(user.email);
                                            }
                                        }}
                                    >
                                        {btnStatus.text}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {users.length === 0 && (
                    <div className="empty-state">
                        <p>No users available to connect with</p>
                    </div>
                )}
            </div>

            <style>{`
                .network-page {
                    min-height: 100vh;
                    background: #f5f5f5;
                    padding-bottom: 40px;
                }

                .network-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    margin-top: 80px;
                }

                .network-container h1 {
                    font-size: 32px;
                    color: #333;
                    margin: 0 0 8px 0;
                }

                .subtitle {
                    color: #666;
                    font-size: 16px;
                    margin: 0 0 40px 0;
                }

                .users-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                }

                .user-card {
                    background: white;
                    border-radius: 8px;
                    padding: 24px;
                    text-align: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    transition: box-shadow 0.3s;
                }

                .user-card:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }

                .user-avatar {
                    width: 100px;
                    height: 100px;
                    margin: 0 auto 16px;
                    border-radius: 50%;
                    overflow: hidden;
                    background: #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .user-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .avatar-placeholder {
                    font-size: 36px;
                    font-weight: 600;
                    color: #667eea;
                }

                .user-card h3 {
                    margin: 12px 0 4px 0;
                    font-size: 18px;
                    color: #333;
                }

                .title {
                    color: #667eea;
                    font-size: 14px;
                    font-weight: 600;
                    margin: 0 0 4px 0;
                }

                .headline {
                    color: #666;
                    font-size: 13px;
                    margin: 0 0 8px 0;
                    font-style: italic;
                }

                .location {
                    color: #999;
                    font-size: 13px;
                    margin: 0 0 16px 0;
                }

                .action-btn {
                    width: 100%;
                    padding: 10px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s;
                }

                .action-btn.connect {
                    background: #667eea;
                    color: white;
                }

                .action-btn.connect:hover {
                    background: #5568d3;
                }

                .action-btn.pending {
                    background: #f0f0f0;
                    color: #999;
                    cursor: default;
                }

                .action-btn.connected {
                    background: #d4edda;
                    color: #155724;
                    cursor: default;
                }

                .request-actions {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                }

                .accept-btn, .reject-btn {
                    padding: 10px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 13px;
                    transition: all 0.3s;
                }

                .accept-btn {
                    background: #28a745;
                    color: white;
                }

                .accept-btn:hover {
                    background: #218838;
                }

                .reject-btn {
                    background: #dc3545;
                    color: white;
                }

                .reject-btn:hover {
                    background: #c82333;
                }

                .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    color: #999;
                    font-size: 18px;
                }
            `}</style>
        </div>
    );
};

export default NetworkPage;
