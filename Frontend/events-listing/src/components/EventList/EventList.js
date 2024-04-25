import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EventList.css';

class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            filter: '',
            loading: false
        };
    }

    componentDidMount() {
        this.fetchEvents();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.key !== prevProps.location.key) {
            this.fetchEvents();
        }
    }

    fetchEvents = () => {
        this.setState({ loading: true });
        axios.get('https://thousif-baba.github.io/Raymish-Backend-Api/EventsApi.json')
            .then(response => {
                this.setState({ events: response.data.events, loading: false });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false });
            });
    }

    handleDelete = (eventId) => {
        axios.delete(`https://api.example.com/events/${eventId}`)
            .then(() => {
                alert('Event deleted successfully');
                this.fetchEvents();
            })
            .catch(error => {
                console.error('Error deleting the event:', error);
                alert(`Failed to delete event: ${error.response ? error.response.data : 'Server error'}`);
            });
    };

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value });
    };

    render() {
        const { events, filter, loading } = this.state;
        const filteredEvents = events.filter(event => event.category.includes(filter));

        return (
            <div className="event-list-container">
                <h1 className="event-list-title">Events</h1>
                <Link to="/events/new">
                    <button className="event-list-button">Add New Event</button>
                </Link>
                <select onChange={this.handleFilterChange} value={this.state.filter} className="event-list-select">
                    <option value="">All Categories</option>
                    <option value="Kids">Kids</option>
                    <option value="Sports">Sports</option>
                    <option value="Family">Family</option>
                    <option value="Nightlife">Nightlife</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Meetups">Meetups</option>
                    <option value="Fair">Fair</option>
                    <option value="Dance">Dance</option>
                    <option value="Music">Music</option>
                </select>
                {loading ? <p>Loading events...</p> : (
                    <ul>
                        {filteredEvents.map(event => (
                            <li key={event.id} className="event-item">
                                <Link to={`/events/${event.id}`} className="event-item-link">{event.eventName}</Link>
                                &nbsp;|&nbsp;
                                <Link to={`/events/edit/${event.id}`} className="event-item-link">Edit</Link>
                                <button onClick={() => this.handleDelete(event.id)} className="event-item-button">Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default EventList;
