import React, { useState, useEffect } from 'react';

const JobCard = ({ job, onApply, currentUser }) => {
    const [isApplied, setIsApplied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (!currentUser) return;

        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');

        setIsApplied(applications.some(
            app => app.jobId === job.id && app.userId === currentUser.email
        ));

        setIsSaved(savedJobs.some(
            saved => saved.jobId === job.id && saved.userId === currentUser.email
        ));
    }, [job, currentUser]);

    const handleApplyClick = () => {
        if (onApply) {
            onApply(job);
        }
    };

    const handleSaveClick = (e) => {
        e.stopPropagation();
        
        if (!currentUser) {
            alert('Please log in to save jobs');
            return;
        }

        const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        
        if (isSaved) {
            // Remove from saved
            const filtered = savedJobs.filter(
                s => !(s.jobId === job.id && s.userId === currentUser.email)
            );
            localStorage.setItem('savedJobs', JSON.stringify(filtered));
            setIsSaved(false);
        } else {
            // Add to saved
            savedJobs.push({
                jobId: job.id,
                userId: currentUser.email,
                savedAt: new Date().toISOString()
            });
            localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
            setIsSaved(true);
        }
    };

    return (
        <div className="card job-card">
            <div className="card-image-wrapper">
                <img src={job.image} alt={job.title} className="card-image" />
            </div>
            <div className="card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                        <h3 className="card-title">{job.title}</h3>
                        <h4 className="card-subtitle">{job.company}</h4>
                    </div>
                    {currentUser && (
                        <button
                            onClick={handleSaveClick}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                padding: '0',
                                color: isSaved ? '#667eea' : '#ccc'
                            }}
                            title={isSaved ? 'Unsave job' : 'Save job'}
                        >
                            ☆
                        </button>
                    )}
                </div>
                <p className="card-location"><strong>Location:</strong> {job.location}</p>
                <p className="card-description">{job.description}</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                        className="card-button"
                        onClick={handleApplyClick}
                        disabled={isApplied}
                        style={{ opacity: isApplied ? 0.6 : 1 }}
                    >
                        {isApplied ? '✓ Applied' : 'Apply Now'}
                    </button>
                    {isSaved && <span style={{ fontSize: '12px', color: '#667eea', fontWeight: '600' }}>Saved</span>}
                </div>
            </div>
        </div>
    );
};

export default JobCard;
