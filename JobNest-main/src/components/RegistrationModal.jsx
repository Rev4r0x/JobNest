import React, { useState, useEffect } from 'react';

const RegistrationModal = ({ isOpen, onClose, event }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Reset state when modal is opened/closed or event changes
    useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '' });
        }
    }, [isOpen, event]);

    if (!isOpen || !event) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to a backend
        console.log(`Registered for ${event.name}:`, formData);
        setIsSubmitted(true);
    };

    const handleClose = () => {
        onClose();
        setIsSubmitted(false); // Reset on close
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={handleClose} style={{ position: 'absolute', right: '1.5rem', top: '1rem' }}>&times;</button>

                {!isSubmitted ? (
                    <>
                        <div className="modal-header">
                            <h2>Register for {event.name}</h2>
                        </div>
                        <div className="modal-body">
                            <p className="modal-subtitle">Enter your details to secure your spot.</p>
                            <form onSubmit={handleSubmit} className="registration-form">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="cancel-btn" onClick={handleClose}>Cancel</button>
                                    <button type="submit" className="submit-btn modal-submit-btn">Complete Registration</button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="success-view">
                        <div className="success-icon">✅</div>
                        <h2 className="success-title">Registration Successful!</h2>
                        <p className="success-message">
                            You have successfully registered for <strong>{event.name}</strong>.
                            We have sent a confirmation email to {formData.email}.
                        </p>
                        <button className="submit-btn" onClick={handleClose} style={{ marginTop: '1.5rem' }}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationModal;
