import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './EvenForm.css';

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.eventId || '',
            eventName: '',
            category: '',
            description: '',
            website: '',
            instagramLink: '',
            googleMapsLink: '',
            locality: '',
            city: '',
            isSubmitting: false,
            error: null
        };
    }

    componentDidMount() {
        const { id } = this.state;
        if (id) {
            axios.get(`https://thousif-baba.github.io/Raymish-Backend-Api/EventsApi.json`)
                .then(response => {
                    const event = response.data.events.find(e => e.id === id);
                    if (event) {
                        this.setState({
                            eventName: event.eventName,
                            category: event.category,
                            description: event.description,
                            website: event.website,
                            instagramLink: event.instagramLink,
                            googleMapsLink: event.googleMapsLink,
                            locality: event.locality,
                            city: event.city
                        });
                    }
                })
                .catch(error => this.setState({ error: 'Error fetching event details' }));
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSubmitting: true });
        console.log('Submitted data:', this.state);
        setTimeout(() => {
            this.props.history.push('/');
            this.setState({ isSubmitting: false });
        }, 1000);
    };

    render() {
        const { eventName, category, description, website, instagramLink, googleMapsLink, locality, city, isSubmitting } = this.state;

        return (
            <div className="event-form-container">
                <h1 className="event-form-title">{this.state.id ? 'Edit Event' : 'Add Event'}</h1>
                <form onSubmit={this.handleSubmit} className="event-form">
                    <label className="event-form-label">
                        Event Name:
                        <input type="text" name="eventName" value={eventName} onChange={this.handleChange} required className="event-form-input" />
                    </label>
                    <label className="event-form-label">
                        Category:
                        <input type="text" name="category" value={category} onChange={this.handleChange} required className="event-form-input" />
                    </label>
                    <label className="event-form-label">
                        Description:
                        <textarea name="description" value={description} onChange={this.handleChange} required className="event-form-textarea"></textarea>
                    </label>
                    <label className="event-form-label">
                        Website:
                        <input type="text" name="website" value={website} onChange={this.handleChange} className="event-form-input" />
                    </label>
                    <label className="event-form-label">
                        Instagram Link:
                        <input type="text" name="instagramLink" value={instagramLink} onChange={this.handleChange} className="event-form-input" />
                    </label>
                    <label className="event-form-label">
                        Google Maps Link:
                        <input type="text" name="googleMapsLink" value={googleMapsLink} onChange={this.handleChange} className="event-form-input" />
                    </label>
                    <label className="event-form-label">
                        Locality:
                        <input type="text" name="locality" value={locality} onChange={this.handleChange} className="event-form-input" />
                    </label>
                    <label className="event-form-label">
                        City:
                        <input type="text" name="city" value={city} onChange={this.handleChange} className="event-form-input" />
                    </label>
                    <button type="submit" disabled={isSubmitting} className="event-form-submit-button">
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(EventForm);
