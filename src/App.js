import './App.css';
import React from 'react';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Table from './components/Table';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <h1>Covid-19 Countries Data</h1>
        <Table></Table>
      </div>
    )
  }
}

export default App;
