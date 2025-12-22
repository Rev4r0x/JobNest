import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const ProfessionalsPage = ({ onNavigate, currentUser }) => {
    const [professionals, setProfessionals] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
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
    }, [currentUser]);

    const handleBook = (professional) => {
        const existingBooking = bookings.find(
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

        const updatedBookings = [...bookings, newBooking];
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
        alert('Booking confirmed!');
    };

    return (
        <div className="professionals-page">
            <Navbar onNavigate={onNavigate} currentView="professionals" currentUser={currentUser} />

            <div className="professionals-container">
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
            `}</style>
        </div>
    );
};

export default ProfessionalsPage;
