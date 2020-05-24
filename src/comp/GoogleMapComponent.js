import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import apiService from '../api/apiService';
import Geocode from "react-geocode";

const AnyReactComponent = ({text}) => <div>{text}<img src="https://img.icons8.com/material/48/000000/street-view.png"/></div>;

class GoogleMapComponent extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 0
    };
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            geodatas: [],
        };
       // this.handleClick = this.updateRights.bind(this);
        //this.props.hurensohn = "was";
    }

    componentDidMount() {
        console.log("---------GOOLE MAP COMPOENT MOUNT ---------------------");
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
        console.log("@@@@@@@@@@@@@@@@@FETCHING API%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

        apiService.fetchAllUserObjects().then(response => {
            let geos = []
            // success side effects go here
            console.log("API REPSONSE ");
            console.log(response.data);
            response.data.map((value, index) => {
                if(value.city)
                this.getGeoKordFromAdress(value, geos);
            }).then(
                this.setState({
                geodatas: geos,
            }))
        }).catch(error => {
            console.log(error);
        });


    }


    getGeoKordFromAdress(value, geos) {
        Geocode.fromAddress(value.city.trim()).then(
            response => {
                if (value.city) {
                    const {lat, lng} = response.results[0].geometry.location;
                    console.log("KOOOS FUER " + value.city);
                    let geodata = {city: value.city.trim(), name: value.name, coordinates: [lat, lng]}
                    console.log(geodata);
                    geos.push(geodata);
                }
            },
            error => {
                console.error(error);
            }
        );
    }

    render() {
        console.log("---------GOOLE MAP COMPOENT RENDERING ---------------------");
        console.log(this.state.geodatas);

        return (
            // Important! Always set the container height explicitly
            <div style={{height: '100vh', width: '100%'}}>
                <GoogleMapReact id="reactMap"
                    bootstrapURLKeys={{key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {this.state.geodatas.map((anchor) => (

                        <AnyReactComponent id="mapcompnent{anchor.name}"
                            lat={anchor.coordinates[0]}
                            lng={anchor.coordinates[1]}
                            text={anchor.name}
                        ></AnyReactComponent>
                        ))}
                </GoogleMapReact >
            </div>
        );
    }
}

export default GoogleMapComponent;
