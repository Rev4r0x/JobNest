import React, { useState } from 'react';
import Navbar from './Navbar';
import JobCard from './JobCard';
import EventCard from './EventCard';
import Footer from './Footer';
import RegistrationModal from './RegistrationModal';
import JobApplicationModal from './JobApplicationModal';
import { jobs, events } from '../data';

const Dashboard = ({ onNavigate, currentUser }) => {
    // Search & Filter State
    const [searchTerm, setSearchTerm] = useState('');
    // Filter State
    const [filterLocation, setFilterLocation] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Event Modal State
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Job Modal State
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    // Extract Unique Locations
    const allLocations = ['All', ...new Set([...jobs.map(j => j.location), ...events.map(e => e.location)])];

    // Filter Logic
    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterLocation === 'All' || job.location === filterLocation;
        return matchesSearch && matchesFilter;
    });

    const filteredEvents = events.filter(event => {
        const matchesSearch =
            event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterLocation === 'All' || event.location === filterLocation;
        return matchesSearch && matchesFilter;
    });

    // Event Handlers
    const handleRegisterClick = (event) => {
        setSelectedEvent(event);
        setIsEventModalOpen(true);
    };

    const handleCloseEventModal = () => {
        setIsEventModalOpen(false);
        setSelectedEvent(null);
    };

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
            {/* Pass onNavigate and currentView */}
            <Navbar onNavigate={onNavigate} currentView="dashboard" currentUser={currentUser} />

            <header className="app-header dashboard-header">
                <h1>Welcome to JobNest</h1>
                <p>Your gateway to career growth and networking</p>
                <div className="search-filter-wrapper">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search jobs or events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filters-container">
                        {/* Custom Dropdown */}
                        <div className="custom-select-wrapper" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <div className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''}`}>
                                <span>{filterLocation === 'All' ? 'Location' : filterLocation}</span>
                                <div className="arrow"></div>
                            </div>
                            {isDropdownOpen && (
                                <div className="custom-options">
                                    {allLocations.map((loc, index) => (
                                        <span
                                            key={index}
                                            className={`custom-option ${filterLocation === loc ? 'selected' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFilterLocation(loc);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {loc === 'All' ? 'All Locations' : loc}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <section id="jobs" className="section jobs-section slide-up-group">
                    <h2 className="section-title">Latest Jobs</h2>
                    {filteredJobs.length > 0 ? (
                        <div className="cards-grid">
                            {filteredJobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    onApply={handleApplyClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="no-results">No jobs found matching your criteria.</p>
                    )}
                </section>

                <section id="events" className="section events-section slide-up-group delay-group">
                    <h2 className="section-title">Upcoming Events</h2>
                    {filteredEvents.length > 0 ? (
                        <div className="cards-grid">
                            {filteredEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onRegister={handleRegisterClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="no-results">No events found matching your criteria.</p>
                    )}
                </section>
            </main>

            <Footer onNavigate={onNavigate} />

            <RegistrationModal
                isOpen={isEventModalOpen}
                onClose={handleCloseEventModal}
                event={selectedEvent}
            />

            <JobApplicationModal
                isOpen={isJobModalOpen}
                onClose={handleCloseJobModal}
                job={selectedJob}
            />
        </div>
    );
};

export default Dashboard;
