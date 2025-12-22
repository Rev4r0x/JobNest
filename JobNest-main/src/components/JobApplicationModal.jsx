import React, { useState, useEffect } from 'react';

const JobApplicationModal = ({ isOpen, onClose, job }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        portfolioUrl: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Reset state when modal is opened/closed or job changes
    useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', portfolioUrl: '' });
        }
    }, [isOpen, job]);

    if (!isOpen || !job) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        
        // Check if already applied
        const alreadyApplied = applications.some(
            app => app.jobId === job.id && app.userId === currentUser.email
        );
        
        if (alreadyApplied) {
            alert('You have already applied for this job');
            return;
        }
        
        // Save application
        const newApplication = {
            jobId: job.id,
            userId: currentUser.email,
            appliedAt: new Date().toISOString(),
            ...formData
        };
        
        applications.push(newApplication);
        localStorage.setItem('applications', JSON.stringify(applications));
        
        setIsSubmitted(true);
    };

    const handleClose = () => {
        onClose();
        setIsSubmitted(false);
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={handleClose} style={{ position: 'absolute', right: '1.5rem', top: '1rem' }}>&times;</button>

                {!isSubmitted ? (
                    <>
                        <div className="modal-header">
                            <h2>Apply for {job.title}</h2>
                        </div>
                        <div className="modal-body">
                            <p className="modal-subtitle">Applying to <strong>{job.company}</strong></p>
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
                                <div className="form-group">
                                    <label htmlFor="portfolioUrl">Portfolio / LinkedIn URL (Optional)</label>
                                    <input
                                        type="url"
                                        id="portfolioUrl"
                                        name="portfolioUrl"
                                        value={formData.portfolioUrl}
                                        onChange={handleChange}
                                        placeholder="https://linkedin.com/in/johndoe"
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="cancel-btn" onClick={handleClose}>Cancel</button>
                                    <button type="submit" className="submit-btn modal-submit-btn">Submit Application</button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="success-view">
                        <div className="success-icon">✅</div>
                        <h2 className="success-title">Application Sent!</h2>
                        <p className="success-message">
                            Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been received.
                            Best of luck!
                        </p>
                        <button className="submit-btn" onClick={handleClose} style={{ marginTop: '1.5rem' }}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApplicationModal;
