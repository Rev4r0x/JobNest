import React, { useState } from 'react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log('Contact Form Submitted:', formData);

        setFormData({ name: '', email: '', message: '' });
        setIsSuccessOpen(true);
    };

    return (
        <section id="contact" className="section contact-section slide-up-group delay-group">
            <h2 className="section-title">Contact Us</h2>
            <div className="contact-container">
                <div className="contact-info">
                    <h3>Get in Touch</h3>
                    <p>Have questions about a job listing or an event? We're here to help.</p>
                    <div className="info-item">
                        <strong>Email:</strong> support@jobnest.com
                    </div>
                    <div className="info-item">
                        <strong>Phone:</strong> +1 (555) 123-4567
                    </div>
                    <div className="info-item">
                        <strong>Address:</strong> 123 Career Blvd, Tech City, USA
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
            </div>

            {isSuccessOpen && (
                <div className="modal-overlay" onClick={() => setIsSuccessOpen(false)}>
                    <div className="modal-content success-view" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setIsSuccessOpen(false)} style={{ position: 'absolute', right: '1.5rem', top: '1rem' }}>&times;</button>
                        <div className="success-icon">✅</div>
                        <h2 className="success-title">Message Sent!</h2>
                        <p className="success-message">
                            Thank you for reaching out. We have received your message and will get back to you shortly.
                        </p>
                        <button className="submit-btn" onClick={() => setIsSuccessOpen(false)} style={{ marginTop: '1.5rem' }}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactSection;
