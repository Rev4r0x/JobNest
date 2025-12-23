import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';

const ChatBox = ({ currentUser, otherUser, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
        const conversation = allMessages.filter(m => 
            (m.fromId === currentUser.email && m.toId === otherUser.email) ||
            (m.fromId === otherUser.email && m.toId === currentUser.email)
        ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setMessages(conversation);
        scrollToBottom();
    }, [currentUser, otherUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!text.trim()) return;

        const newMessage = {
            fromId: currentUser.email,
            toId: otherUser.email,
            text: text.trim(),
            timestamp: new Date().toISOString()
        };

        const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
        allMessages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(allMessages));

        setMessages([...messages, newMessage]);
        setText('');
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="chat-page">
            <Navbar onNavigate={() => {}} currentView="messages" currentUser={currentUser} />

            <div className="chat-container">
                <div className="chat-header">
                    <button className="back-btn" onClick={onBack}>← Back</button>
                    <h2>{otherUser.name}</h2>
                    <div className="header-spacer"></div>
                </div>

                <div className="messages-list">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`message ${msg.fromId === currentUser.email ? 'sent' : 'received'}`}
                        >
                            <div className="message-content">{msg.text}</div>
                            <div className="message-time">{formatTime(msg.timestamp)}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-area">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>

            <style>{`
                .chat-page {
                    min-height: 100vh;
                    background: #f5f5f5;
                    display: flex;
                    flex-direction: column;
                }

                .chat-container {
                    max-width: 600px;
                    margin: 0 auto;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    height: calc(100vh - 80px);
                    background: white;
                    margin-top: 80px;
                }

                .chat-header {
                    display: flex;
                    align-items: center;
                    padding: 16px 20px;
                    border-bottom: 1px solid #eee;
                    gap: 12px;
                }

                .back-btn {
                    background: none;
                    border: none;
                    color: #667eea;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: 600;
                    padding: 0;
                }

                .back-btn:hover {
                    color: #5568d3;
                }

                .chat-header h2 {
                    margin: 0;
                    font-size: 18px;
                    color: #333;
                    flex: 1;
                }

                .header-spacer {
                    width: 40px;
                }

                .messages-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .message {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    max-width: 70%;
                }

                .message.sent {
                    align-self: flex-end;
                    align-items: flex-end;
                }

                .message.received {
                    align-self: flex-start;
                    align-items: flex-start;
                }

                .message-content {
                    padding: 12px 16px;
                    border-radius: 18px;
                    word-wrap: break-word;
                    font-size: 14px;
                    line-height: 1.4;
                }

                .message.sent .message-content {
                    background: #667eea;
                    color: white;
                }

                .message.received .message-content {
                    background: #f0f0f0;
                    color: #333;
                }

                .message-time {
                    font-size: 12px;
                    color: #999;
                }

                .chat-input-area {
                    display: flex;
                    gap: 8px;
                    padding: 16px 20px;
                    border-top: 1px solid #eee;
                    background: white;
                }

                .chat-input-area input {
                    flex: 1;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    padding: 10px 16px;
                    font-size: 14px;
                    font-family: inherit;
                }

                .chat-input-area input:focus {
                    outline: none;
                    border-color: #667eea;
                }

                .chat-input-area button {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                    transition: background 0.3s;
                }

                .chat-input-area button:hover {
                    background: #5568d3;
                }
            `}</style>
        </div>
    );
};

export default ChatBox;
