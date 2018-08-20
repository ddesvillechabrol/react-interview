import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


export default class MicromaniaMap extends Component {

  shopToStrings(shopData){
    return(
      <span>{shopData.name} <br /> {shopData.address}, {shopData.zipcode}, {shopData.city}</span>
    )
  }

  coordsToList(shopCoord){
    return (
      [shopCoord.lat, shopCoord.lon]
    )
  }

  renderMarker(marker){
    const { markers } = this.props;
    return markers.map((marker, index) => {
      const coord = this.coordsToList(marker.coords);
      const text = this.shopToStrings(marker);
      return (
        <Marker
          key={`marker_${marker.name}`}
          position={coord}
          onClick={() => this.props.onClick(index)}
        >
          <Popup>
            {text}
          </Popup>
        </Marker>
      )
    })
  }

  render() {
    const position = [48.878664, 2.294205]
    return (
      <Map center={position} zoom="4">
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.renderMarker()}
      </Map>
    );
  }
}
