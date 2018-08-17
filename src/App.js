import React, { Component } from 'react';
import MicromaniaMap from './MicromaniaMap';
import List from './List';

class App extends Component {
  constructor(props){
    super(props);
    const markers = require('./fixtures/micromania.json');
    /* add selected state to know if a marker is selected or not */
    this.state = {
      markers: markers.map((marker) => {
        return {
          ...marker,
          selected: false,
        }
      }),
      selectedList: [],
    };
  }

  mapClick(index) {
    const markers = this.state.markers.slice();
    if (markers[index].selected) {
      return;
    }
    const selectedList = this.state.selectedList.slice();
    selectedList.push(index);
    markers[index].selected = true;
    this.setState({
      markers: markers,
      selectedList: selectedList,
    })
  }

  selectedToInfo() {
    /*transform selected index array to json entry*/
    const { selectedList, markers } = this.state;
    return selectedList.map((shop) => {
      return markers[shop];
    });
  }

  removeSelected(i) { 
    /* Remove selected shop */
    const selectedList = this.state.selectedList.slice();
    const markers = this.state.markers.slice();
    const markerIndex = selectedList[i];
    markers[markerIndex].selected = false;
    selectedList.splice(i, 1);
    this.setState({
      markers: markers,
      selectedList: selectedList,
    })
  }

  render() {
    return (
      <div>
        <MicromaniaMap
          markers={this.state.markers}
          onClick={(index) => this.mapClick(index)}
        />
        <List 
          selectedList={this.selectedToInfo()}
          onClick={(index) => this.removeSelected(index)}
        />
      </div>
    );
  }
}

export default App;
