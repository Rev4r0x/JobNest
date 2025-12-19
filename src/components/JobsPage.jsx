import React, { useState } from 'react';
import Navbar from './Navbar';
import JobCard from './JobCard';
import Footer from './Footer';
import JobApplicationModal from './JobApplicationModal';
import { jobs } from '../data';

const JobsPage = ({ onNavigate }) => {
    // Search & Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLocation, setFilterLocation] = useState('All');
    const [filterCategory, setFilterCategory] = useState('All');

    // Job Modal State
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    // Extract Unique Locations and Categories
    const allLocations = ['All', ...new Set(jobs.map(j => j.location))];
    const jobCategories = ['All', 'Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'];

    // Filter Logic
    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = filterLocation === 'All' || job.location === filterLocation;
        const matchesCategory = filterCategory === 'All' || job.type === filterCategory;
        return matchesSearch && matchesLocation && matchesCategory;
    });

    // Job Handlers
    const handleApplyClick = (job) => {
        setSelectedJob(job);
        setIsJobModalOpen(true);
    };

    const handleCloseJobModal = () => {
        setIsJobModalOpen(false);
        setSelectedJob(null);
    };

    return (
        <div className="dashboard-container">
            <Navbar onNavigate={onNavigate} currentView="jobs" />

            <header className="app-header dashboard-header">
                <h1>Job Opportunities</h1>
                <p>Find your dream career at top companies</p>
            </header>

            <main className="app-main">
                <div className="page-layout">
                    {/* Sidebar on Left */}
                    <aside className="filter-sidebar">
                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Search</h3>
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="sidebar-search"
                            />
                        </div>

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Job Type</h3>
                            <div className="filter-options">
                                {jobCategories.map((category) => (
                                    <label key={category} className="filter-option">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={category}
                                            checked={filterCategory === category}
                                            onChange={(e) => setFilterCategory(e.target.value)}
                                        />
                                        <span>{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Location</h3>
                            <div className="filter-options">
                                {allLocations.map((location) => (
                                    <label key={location} className="filter-option">
                                        <input
                                            type="radio"
                                            name="location"
                                            value={location}
                                            checked={filterLocation === location}
                                            onChange={(e) => setFilterLocation(e.target.value)}
                                        />
                                        <span>{location === 'All' ? 'All Locations' : location}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Cards on Right */}
                    <section className="content-area">
                        <h2 className="section-title">Available Positions ({filteredJobs.length})</h2>
                        <div className="cards-grid">
                            {filteredJobs.map((job) => (
                                <JobCard key={job.id} job={job} onApply={handleApplyClick} />
                            ))}
                        </div>
                        {filteredJobs.length === 0 && (
                            <p className="no-results">No jobs found matching your criteria.</p>
                        )}
                    </section>
                </div>
            </main>

            <Footer onNavigate={onNavigate} />

            {isJobModalOpen && selectedJob && (
                <JobApplicationModal job={selectedJob} onClose={handleCloseJobModal} />
            )}
        </div>
    );
};

export default JobsPage;
