import React, { Component } from 'react';
import { CSVLink } from 'react-csv';


export default class List extends Component { 
  toCsv() {
    const { selectedList } = this.props;
    const header = [["name", "address", "zipcode", "city", "lon", "lat"]];
    const shopData = [
      ...header,
      ...selectedList.map(({name, address, zipcode, city, coords}) => {
        return [name, address, zipcode, city, coords.lon, coords.lat];
      }),
    ];
    return (
      <CSVLink filename="selected_shop.csv" data={shopData}>
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
