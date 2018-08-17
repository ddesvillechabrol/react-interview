import React, { Component } from 'react';
import { CSVLink } from 'react-csv';


export default class List extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      csvData: [["name", "address", "zipcode", "city", "lon", "lat"]],
    }
  }

  toCsv() {
    const { selectedList } = this.props;
    const csvData = this.state.csvData.slice();
    let shopData = selectedList.map(({name, address, zipcode, city, coords}) => {
        return [name, address, zipcode, city, coords.lon, coords.lat];
    });
    shopData = [...csvData, ...shopData];
    return (
      <CSVLink data={shopData}>
        Download CSV
      </CSVLink>
    )
  }

  render() {
    const { selectedList } = this.props;
    console.log(selectedList);
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
        {this.toCsv()}
      </div>
  )

  }
}
