import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


export default class MicromaniaMap extends Component {

/*getShopPositions() {
 *  var shopData = require('./fixtures/micromania.json');
 *  let shop;
 *  for(var i = 0; i < shopData.length; i++){
 *    shop = shopData[i];
 *    console.log("Name:" + shop.name + " address: " + shop.address)
 *  }
 *}
 */
  state = {
    "name": "Micromania PARIS (Ternes)",
    "address": "1 ave Niel",
    "zipcode": "75017",
    "city": "PARIS (Ternes)",
    "coords": {"lon": 2.294205, "lat": 48.878664}
  }

  render() {
    const position = [this.state.coords.lat, this.state.coords.lon];
    return (
      <Map center={position} zoom="15">
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {shopToStrings(this.state)}
          </Popup>
        </Marker>
      </Map>
    );
  }
}

function shopToStrings(shopData){
  return (
    <p>{shopData.name} <br /> {shopData.address}, {shopData.zipcode}, {shopData.city}</p>
  )
}
