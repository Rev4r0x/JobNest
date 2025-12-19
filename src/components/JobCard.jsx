import React from 'react';

const JobCard = ({ job, onApply }) => {

    const handleApplyClick = () => {
        if (onApply) {
            onApply(job);
        }
    };

    return (
        <div className="card job-card">
            <div className="card-image-wrapper">
                <img src={job.image} alt={job.title} className="card-image" />
            </div>
            <div className="card-content">
                <h3 className="card-title">{job.title}</h3>
                <h4 className="card-subtitle">{job.company}</h4>
                <p className="card-location"><strong>Location:</strong> {job.location}</p>
                <p className="card-description">{job.description}</p>
                <button className="card-button" onClick={handleApplyClick}>Apply Now</button>
            </div>
        </div>
    );
};

export default JobCard;
