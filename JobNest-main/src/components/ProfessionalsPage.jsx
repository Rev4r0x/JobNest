import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const ProfessionalsPage = ({ onNavigate, currentUser }) => {
    const [professionals, setProfessionals] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadProfessionalsAndBookings();
    }, [currentUser]);

    const loadProfessionalsAndBookings = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const profsData = JSON.parse(localStorage.getItem('professionals') || '[]');
        const bookingsData = JSON.parse(localStorage.getItem('bookings') || '[]');

        const profs = users.filter(u => 
            u.email !== currentUser.email && 
            profsData.some(p => p.email === u.email)
        ).map(u => {
            const profInfo = profsData.find(p => p.email === u.email);
            return { ...u, ...profInfo };
        });

        setProfessionals(profs);
        setBookings(bookingsData);
    };

    const getMyBookings = () => {
        return bookings.filter(b => b.userId === currentUser.email);
    };

    const getBookingsReceived = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return bookings.filter(b => b.professionalEmail === currentUser.email).map(b => {
            const user = users.find(u => u.email === b.userId);
            return { ...b, userName: user?.name || 'Unknown' };
        });
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString();
    };

    const isProfessional = bookings.some(b => b.professionalEmail === currentUser.email);

    const handleBook = (professional) => {
        const currentBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const existingBooking = currentBookings.find(
            b => b.professionalEmail === professional.email && 
                 b.userId === currentUser.email
        );

        if (existingBooking) {
            alert('You have already booked this professional');
            return;
        }

        const newBooking = {
            professionalEmail: professional.email,
            professionalName: professional.name,
            userId: currentUser.email,
            bookedAt: new Date().toISOString()
        };

        const updatedBookings = [...currentBookings, newBooking];
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
        loadProfessionalsAndBookings();
        alert('Booking confirmed!');
    };

    return (
        <div className="professionals-page">
            <Navbar onNavigate={onNavigate} currentView="professionals" currentUser={currentUser} />

            <div className="professionals-container">
                {isProfessional && getBookingsReceived().length > 0 && (
                    <div className="bookings-section">
                        <h2>Bookings Received</h2>
                        <div className="bookings-list">
                            {getBookingsReceived().map((booking, idx) => (
                                <div key={idx} className="booking-item">
                                    <div className="booking-info">
                                        <p className="booking-user">{booking.userName}</p>
                                        <p className="booking-date">Booked on {formatDate(booking.bookedAt)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {getMyBookings().length > 0 && (
                    <div className="bookings-section">
                        <h2>My Bookings</h2>
                        <div className="bookings-list">
                            {getMyBookings().map((booking, idx) => (
                                <div key={idx} className="booking-item">
                                    <div className="booking-info">
                                        <p className="booking-user">{booking.professionalName}</p>
                                        <p className="booking-date">Booked on {formatDate(booking.bookedAt)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <h1>Professional Services</h1>
                <p>Connect with skilled professionals for freelance work</p>

                {professionals.length === 0 ? (
                    <div className="no-professionals">
                        <p>No professionals available yet</p>
                    </div>
                ) : (
                    <div className="professionals-grid">
                        {professionals.map((prof) => (
                            <div key={prof.email} className="professional-card">
                                <div className="prof-avatar">
                                    {prof.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3>{prof.name}</h3>
                                <p className="prof-skill">{prof.skill || 'Skill not specified'}</p>
                                <p className="prof-fee">Fee: ${prof.fee || 'N/A'}/hr</p>
                                <p className="prof-availability">
                                    Available: {prof.availability || 'Not specified'}
                                </p>
                                <button
                                    className="book-btn"
                                    onClick={() => handleBook(prof)}
                                >
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .professionals-page {
                    min-height: 100vh;
                    background: #f5f5f5;
                }

                .professionals-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    margin-top: 80px;
                }

                .professionals-container h1 {
                    font-size: 32px;
                    color: #333;
                    margin: 0 0 10px 0;
                }

                .professionals-container > p {
                    color: #666;
                    margin: 0 0 30px 0;
                }

                .no-professionals {
                    text-align: center;
                    padding: 60px 20px;
                    background: white;
                    border-radius: 8px;
                    color: #999;
                }

                .professionals-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                }

                .professional-card {
                    background: white;
                    border-radius: 8px;
                    padding: 24px;
                    text-align: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    transition: all 0.3s;
                }

                .professional-card:hover {
                    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
                    transform: translateY(-4px);
                }

                .prof-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: #667eea;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 24px;
                    margin: 0 auto 16px;
                }

                .professional-card h3 {
                    margin: 12px 0;
                    font-size: 18px;
                    color: #333;
                }

                .prof-skill {
                    color: #667eea;
                    font-weight: 600;
                    margin: 8px 0;
                }

                .prof-fee {
                    color: #333;
                    font-weight: 600;
                    margin: 8px 0;
                }

                .prof-availability {
                    color: #666;
                    font-size: 14px;
                    margin: 12px 0;
                }

                .book-btn {
                    width: 100%;
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    margin-top: 16px;
                    transition: background 0.3s;
                }

                .book-btn:hover {
                    background: #5568d3;
                }

                .bookings-section {
                    margin-bottom: 40px;
                    padding: 24px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .bookings-section h2 {
                    margin: 0 0 20px 0;
                    font-size: 24px;
                    color: #333;
                }

                .bookings-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .booking-item {
                    padding: 16px;
                    background: #f9f9f9;
                    border-left: 4px solid #667eea;
                    border-radius: 4px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .booking-info {
                    flex: 1;
                }

                .booking-user {
                    margin: 0;
                    font-weight: 600;
                    color: #333;
                    font-size: 15px;
                }

                .booking-date {
                    margin: 4px 0 0 0;
                    color: #666;
                    font-size: 13px;
                }
            `}</style>
        </div>
    );
};

export default ProfessionalsPage;
