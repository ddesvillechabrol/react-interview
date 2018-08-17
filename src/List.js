import React, { Component } from 'react';
import { CSVDownload } from 'react-csv';


export default class List extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      renderCsv: false,
    }
  }

  handleClick() {
    this.setState({
      renderCsv: true,
    })
  }

  generateCsv() {
    const { selectedList } = this.props;
    const csvData = [["name", "address", "zipcode", "city", "lon", "lat"]];
    const shopData = [
      ...csvData,
      ...selectedList.map(({name, address, zipcode, city, coords}) => {
        return [name, address, zipcode, city, coords.lon, coords.lat];
      }),
    ]
    this.setState({
      renderCsv: false,
    });
    return <CSVDownload data={shopData} target="_blank" />
  }

  render() {
    const { selectedList } = this.props;
    const selected = selectedList.map((shop, index) => {
      return (
        <li 
          key={`shop_${shop.name}`}
          onClick={() => this.props.onClick(index)}
        >
          {shop.name}
        </li>
      );
    });
    return (
      <div>
        <ul>
          {selected}
        </ul>
        <button onClick={() => this.handleClick()}> Import CSV </button>
        {this.state.renderCsv && this.generateCsv()}
      </div>
    );
  }
}
