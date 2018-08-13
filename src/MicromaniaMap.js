import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


const markers = [{
  "name": "Micromania PARIS (Ternes)",
  "address": "1 ave Niel",
  "zipcode": "75017",
  "city": "PARIS (Ternes)",
  "coords": {"lon": 2.294205, "lat": 48.878664}
},
{
  "name": "Micromania MONTPARNASSE Rue de Rennes",
  "address": "126. Rue de Rennes",
  "zipcode": "75006",
  "city": "Paris",
  "coords": {"lon": 2.326222, "lat": 48.846652}
}]

export default class MicromaniaMap extends Component {

  render() {
    const markers = require('./fixtures/micromania.json');
    const shopMarkers = markers.map(marker => (
      <Marker position={coordsToList(marker.coords)} key='{marker_${marker.name}}'>
        <Popup>
          {shopToStrings(marker)}
        </Popup>
      </Marker>
    ));
    const position = [48.878664, 2.294205]
    return (
      <Map center={position} zoom="12">
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shopMarkers}
      </Map>
    );
  }
}

function shopToStrings(shopData){
  return (
    <span>{shopData.name} <br /> {shopData.address}, {shopData.zipcode}, {shopData.city}</span>
  )
}

function coordsToList(shopCoord){
  return (
    [shopCoord.lat, shopCoord.lon]
  )
}
