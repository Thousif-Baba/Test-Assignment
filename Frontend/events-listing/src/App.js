import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventList from './components/EventList/EventList';
import EventDetails from './components/EventDetails/EventDetails';
import EventForm from './components/EventForm/EventForm';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={EventList} />
          <Route path="/events/new" component={EventForm} />
          <Route path="/events/edit/:eventId" component={EventForm} />
          <Route path="/events/:eventId" exact component={EventDetails} />
        </Switch>
      </Router>
    );
  }
}

export default App;
