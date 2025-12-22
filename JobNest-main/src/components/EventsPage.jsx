import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import EventCard from './EventCard';
import Footer from './Footer';
import RegistrationModal from './RegistrationModal';
import { events as defaultEvents } from '../data';

const EventsPage = ({ onNavigate, currentUser }) => {
    // Search & Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLocation, setFilterLocation] = useState('All');
    const [filterCategory, setFilterCategory] = useState('All');

    // Event Modal State
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Events State
    const [events, setEvents] = useState([]);

    // Load events from localStorage on mount
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events') || 'null');
        const eventsData = storedEvents || defaultEvents;
        
        // Sort by date (upcoming first)
        const sorted = eventsData.sort((a, b) => {
            const dateA = new Date(a.date || 0);
            const dateB = new Date(b.date || 0);
            return dateA - dateB;
        });
        
        setEvents(sorted);
    }, []);

    // Extract Unique Locations and categories
    const allLocations = ['All', ...new Set(events.map(e => e.location))];
    const eventCategories = ['All', 'Networking', 'Workshop', 'Conference', 'Webinar'];

    // Filter Logic
    const filteredEvents = events.filter(event => {
        const matchesSearch =
            (event.name || event.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = filterLocation === 'All' || event.location === filterLocation;
        const matchesCategory = filterCategory === 'All' || (event.category === filterCategory);
        return matchesSearch && matchesLocation && matchesCategory;
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

    return (
        <div className="dashboard-container">
            <Navbar onNavigate={onNavigate} currentView="events" currentUser={currentUser} />

            <header className="app-header dashboard-header">
                <h1>Upcoming Events</h1>
                <p>Network and learn at professional events</p>
            </header>

            <main className="app-main">
                <div className="page-layout">
                    {/* Sidebar on Left */}
                    <aside className="filter-sidebar">
                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Search</h3>
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="sidebar-search"
                            />
                        </div>

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Event Category</h3>
                            <div className="filter-options">
                                {eventCategories.map((category) => (
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
                        <h2 className="section-title">Featured Events ({filteredEvents.length})</h2>
                        <div className="cards-grid">
                            {filteredEvents.map((event) => (
                                <EventCard key={event.id} event={event} onRegister={handleRegisterClick} />
                            ))}
                        </div>
                        {filteredEvents.length === 0 && (
                            <p className="no-results">No events found matching your criteria.</p>
                        )}
                    </section>
                </div>
            </main>

            <Footer onNavigate={onNavigate} />

            {isEventModalOpen && selectedEvent && (
                <RegistrationModal event={selectedEvent} onClose={handleCloseEventModal} />
            )}
        </div>
    );
};

export default EventsPage;
