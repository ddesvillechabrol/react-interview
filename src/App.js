import React, { Component } from 'react';
import MicromaniaMap from './MicromaniaMap';
import List from './List';

class App extends Component {
  render() {
    return (
      <div>
        <MicromaniaMap/>
        <List/>
      </div>
    );
  }
}

export default App;
