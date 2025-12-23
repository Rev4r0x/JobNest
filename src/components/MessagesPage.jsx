import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ChatBox from './ChatBox';

const MessagesPage = ({ onNavigate, currentUser }) => {
    const [connections, setConnections] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const conns = JSON.parse(localStorage.getItem('connections') || '[]');
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');

        const acceptedConnections = conns
            .filter(c => c.status === 'accepted' && 
                   (c.senderId === currentUser.email || c.receiverId === currentUser.email))
            .map(c => c.senderId === currentUser.email ? c.receiverId : c.senderId);

        const connectedUsers = allUsers.filter(u => acceptedConnections.includes(u.email));
        setConnections(connectedUsers);
        setUsers(allUsers);
    }, [currentUser]);

    if (selectedUser) {
        return (
            <ChatBox 
                currentUser={currentUser} 
                otherUser={selectedUser}
                onBack={() => setSelectedUser(null)}
            />
        );
    }

    return (
        <div className="messages-page">
            <Navbar onNavigate={onNavigate} currentView="messages" currentUser={currentUser} />

            <div className="messages-container">
                <div className="connections-list">
                    <h1>Messages</h1>
                    {connections.length === 0 ? (
                        <div className="no-connections">
                            <p>No connections yet. Connect with users to message them!</p>
                        </div>
                    ) : (
                        <div className="connection-items">
                            {connections.map((user) => (
                                <div
                                    key={user.email}
                                    className="connection-item"
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <div className="connection-avatar">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="connection-info">
                                        <p className="connection-name">{user.name}</p>
                                        <p className="connection-title">{user.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .messages-page {
                    min-height: 100vh;
                    background: #f5f5f5;
                }

                .messages-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    margin-top: 80px;
                }

                .connections-list h1 {
                    font-size: 28px;
                    color: #333;
                    margin: 0 0 20px 0;
                }

                .no-connections {
                    text-align: center;
                    padding: 60px 20px;
                    background: white;
                    border-radius: 8px;
                    color: #999;
                }

                .connection-items {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .connection-item {
                    display: flex;
                    gap: 12px;
                    padding: 16px;
                    background: white;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .connection-item:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    background: #f9f9f9;
                }

                .connection-avatar {
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

                .connection-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .connection-name {
                    margin: 0;
                    font-weight: 600;
                    color: #333;
                    font-size: 15px;
                }

                .connection-title {
                    margin: 4px 0 0 0;
                    color: #666;
                    font-size: 13px;
                }
            `}</style>
        </div>
    );
};

export default MessagesPage;
