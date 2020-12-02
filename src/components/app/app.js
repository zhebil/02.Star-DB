import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "../header";
import RandomPlanet from "../random-planet";

import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import ErrorBoundry from "../error-boundry";
import { SwapiServiceProvider } from "../swapi-service-context";

import "./app.css";
import {
  LoginPage,
  PeoplePage,
  PlanetsPage,
  SecretPage,
  StarshipsPage,
} from "../pages";
import { StarshipDetails } from "../sw-components";

export default class App extends Component {
  state = {
    isLoggedIn: false,
    swapiSerwice: new SwapiService(),
  };
  onServiceChange = () => {
    this.setState(({ swapiSerwice }) => {
      const Service =
        swapiSerwice instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiSerwice: new Service(),
      };
    });
  };
  onLogin = () => {
    this.setState({ isLoggedIn: true });
  };
  render() {
    const { isLoggedIn } = this.state;
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiSerwice}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Switch>
                <Route
                  path="/"
                  render={() => <h2>Welcome to StarDB</h2>}
                  exact
                />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetsPage} />
                <Route path="/starships" exact component={StarshipsPage} />
                <Route
                  path="/starships/:id"
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />;
                  }}
                />
                <Route
                  path="/login"
                  render={() => {
                    return (
                      <LoginPage
                        isLoggedIn={isLoggedIn}
                        onLogin={this.onLogin}
                      />
                    );
                  }}
                />
                <Route
                  path="/secret"
                  render={() => {
                    return <SecretPage isLoggedIn={isLoggedIn} />;
                  }}
                />
                <Route render={() => <h2>Page not found</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
