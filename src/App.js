import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import ProjectForm from './components/ProjectForm';
import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Datumize: Engineering Qualification Task</h1>
          </header>
          <ProjectForm />
        </div>
      </Provider>
    );
  }
}

export default App;
