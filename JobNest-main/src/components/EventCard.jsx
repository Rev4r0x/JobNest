import React from 'react';

const EventCard = ({ event, onRegister }) => {

    const handleRegisterClick = () => {
        if (onRegister) {
            onRegister(event);
        }
    };

    return (
        <div className="card event-card">
            <div className="card-image-wrapper">
                <img src={event.image} alt={event.name} className="card-image" />
            </div>
            <div className="card-content">
                <h3 className="card-title">{event.name}</h3>
                <h4 className="card-subtitle">{event.date}</h4>
                <p className="card-location"><strong>Venue:</strong> {event.location}</p>
                <p className="card-description">{event.description}</p>
                <button className="card-button" onClick={handleRegisterClick}>Register</button>
            </div>
        </div>
    );
};

export default EventCard;
