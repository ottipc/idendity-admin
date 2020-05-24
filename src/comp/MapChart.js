import React from "react";
import Geocode from "react-geocode";
import apiService from '../api/apiService';

import {ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";
//AIzaSyDvOrmJCu4YG4dg_BydULFfRvNGHmm-Hi8
const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyBFM7enK7EFAStnRoBxZZtOGU3_DeRB5I8");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

var markers = [];
/*apiService.fetchAllUserObjects().then(response => {
    let geos = []
    // success side effects go here
    response.data.map((value, index) => {
        Geocode.fromAddress(value.city).then(
            response => {
                if(value.city){
                const {lat, lng} = response.results[0].geometry.location;
                console.log("KOOOS FUER " + value.city);
                let geodata = {markerOffset: 15, name: value.name, coordinates: [lat, lng]}
                console.log(geodata);
                markers.push(geodata);
                }
            },
            error => {
                console.error(error);
            }
        );
    })
}).catch(error => {
        console.log(error);
});*/

// Get address from latidude & longitude.
/*Geocode.fromLatLng("48.8583701", "2.2922926").then(
   response => {
       const address = response.results[0].formatted_address;
       console.log("ADDRESSSS");
       console.log(address);
   },
   error => {
       console.error(error);
   }
);*/

// Get latidude & longitude from address.
/*Geocode.fromAddress("Muenchen").then(
   response => {
       const { lat, lng } = response.results[0].geometry.location;
       console.log("KOOOS FUER MUENCHEN");
       console.log(lat, lng);
   },
   error => {
       console.error(error);
   }
);*/

//navigator.geolocation.

//const markers = [

    // Get latidude & longitude from address.
    // set response language. Defaults to english.


   /* {
        markerOffset: -30,
        name: "Buenos Aires",
        coordinates: [-58.3816, -34.6037]
    },*/

//    navigator.geolocation
 /*   {markerOffset: 15, name: "La Paz", coordinates: [-68.1193, -16.4897]},
    {markerOffset: 15, name: "Brasilia", coordinates: [-47.8825, -15.7942]},
    {markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489]},
    {markerOffset: 15, name: "Bogota", coordinates: [-74.0721, 4.711]},
    {markerOffset: 15, name: "Quito", coordinates: [-78.4678, -0.1807]},
    {markerOffset: -30, name: "Georgetown", coordinates: [-58.1551, 6.8013]},
    {markerOffset: -30, name: "Asuncion", coordinates: [-57.5759, -25.2637]},
    {markerOffset: 15, name: "Paramaribo", coordinates: [-55.2038, 5.852]},
    {markerOffset: 15, name: "Montevideo", coordinates: [-56.1645, -34.9011]},
    {markerOffset: 15, name: "Caracas", coordinates: [-66.9036, 10.4806]},
//];*/

const MapChart = () => {
    console.log("HUREN MAKERS");
    console.log(markers);

    return (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
                rotate: [58, 20, 0],
                scale: 100
            }}
        >
            <Geographies geography={geoUrl}>
                {({geographies}) =>
                    geographies
                        .filter(d => d.properties.REGION_UN === "Germany")
                        .map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#EAEAEC"
                                stroke="#D6D6DA"
                            />
                        ))
                }
            </Geographies>
            {markers.map(({name, coordinates, markerOffset}) => (
                <Marker key={name} coordinates={coordinates}>
                    <g
                        fill="none"
                        stroke="#FF5533"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="translate(-12, -24)"
                    >
                        <circle cx="12" cy="10" r="3"/>
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/>
                    </g>
                    <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{fontFamily: "system-ui", fill: "#5D5A6D"}}
                    >
                        {name}
                    </text>
                </Marker>
            ))}
        </ComposableMap>
    );
};

export default MapChart;
