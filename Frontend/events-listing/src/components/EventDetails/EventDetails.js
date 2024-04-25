import React from 'react';
import axios from 'axios';
import './EventDetails.css';

class EventDetails extends React.Component {
    state = {
        event: null,
        error: null
    };

    componentDidMount() {
        const eventId = this.props.match.params.eventId;
        axios.get('https://thousif-baba.github.io/Raymish-Backend-Api/EventsApi.json')
            .then(response => {
                const event = response.data.events.find(e => e.id === eventId);
                this.setState({ event });
            })
            .catch(error => this.setState({ error: 'Error fetching event details' }));
    }

    render() {
        const { event, error } = this.state;

        if (error) {
            return <div className="event-error">Error: {error}</div>;
        }

        if (!event) {
            return <div className="event-loading">Loading...</div>;
        }

        return (
            <div className="event-details-container">
                <h1 className="event-details-title">{event.eventName}</h1>
                <p className="event-details-description">{event.description}</p>
                <a href={event.website} className="event-details-link">Website</a><br />
                <a href={event.instagramLink} className="event-details-link">Instagram</a><br />
                <a href={event.googleMapsLink} className="event-details-link">Location</a><br />
                <p className="event-details-locality">{event.locality}, {event.city}</p>
            </div>
        );
    }
}

export default EventDetails;
