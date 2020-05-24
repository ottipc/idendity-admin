import React from 'react';
import {Button, Drawer} from '@material-ui/core';
import {
    BooleanField,
    BooleanInput,
    ChipField,
    Create,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    EmailField,
    List,
    ReferenceField,
    ReferenceManyField,
    SimpleForm,
    SingleFieldList,
    TextField,
    TextInput
} from 'react-admin';
import MapChart from "./comp/MapChart";
import Modal from '@material-ui/core/Modal';
import {RoleListBox} from './comp/rolelistbox';
// in src/posts.js
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import GoogleMapComponent from "./comp/GoogleMapComponent";
import ReactDOM from "react-dom";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Map from "./comp/Map";

import $ from "jquery";

const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var hideModal = hideModalInfo => {
    console.log("Downset Modal");
    $("#myModal").modal("hide");
};

const googleMapsApiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const modalMapStyles = [
    {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on"
            },
            {
                color: "#e0efef"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on"
            },
            {
                hue: "#1900ff"
            },
            {
                color: "#c0e8e8"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                lightness: 100
            },
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
            {
                visibility: "on"
            },
            {
                lightness: 700
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: "#7dcdcd"
            }
        ]
    }
];


const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        //flexGrow: 1,
    }, heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const validateUserCreation = (values) => {
    //alert("Validating....")
    const errors = {};
    if (!values.name) {
        errors.name = ['The name is required'];
    }

    if (!values.email) {
        errors.email = ['The Email is required'];
    }
    //if (!validateEmail(values.email)) {
    //    errors.email = ['The Email is wrong format'];
    //}
    return errors
};


export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm validate={validateUserCreation}>
            <TextInput required="The name is required" source="name"/>
            <TextInput required="The Email is required" label="Email" source="email" type="email"/>
            <TextInput label="Firstname" source="first_name"/>
            <TextInput label="Lastname" source="last_name"/>
            <DateInput source="date_of_birth"/>
            <TextInput label="City" source="city"/>
            <BooleanInput source="activated"/>
        </SimpleForm>
    </Create>
);


export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm validate={validateUserCreation}>
            <div style={{width: '100%'}}>
                <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                    <Box width="40%" bgcolor="white.300">
                        <TextInput required="The name is required" source="name"/>
                        <TextInput required="The Email is required" label="Email" source="email" type="email"/>
                        <TextInput label="Firstname" source="first_name"/>
                        <TextInput label="Lastname" source="last_name"/>
                        <TextInput label="City" source="city"/>
                        <DateInput source="date_of_birth"/>
                        <BooleanInput source="activated"/>
                    </Box>
                    <Box width="60%" bgcolor="white.300">

                                <RoleListBox user_id="1"/>
                    </Box>
                </Box>
            </div>

        </SimpleForm>
    </Edit>

);

export default function CreateDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, [anchor]: open});
    };

    return (
        <div>
            {['left', 'right', 'top', 'bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button variant="contained" color="primary" data-class="MuiChip-label" data-animation="true" data-toggle="tooltip" title="Klick to Quick Create user"  onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <UserCreate {...props}/>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export const UserList = (props) => (
    <React.Fragment>
        {CreateDrawer(props)}

        <List {...props} sort={{field: 'name', order: 'ASC'}}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="name" type="email"/>

                <TextField source="activated" type="boolean"/>
                <EmailField source="email"/>
                <TextField source="first_name"/>
                <TextField source="last_name"/>
                <TextField source="city"/>
                <BooleanField source="activated" type="boolean"/>
                <DateField source="date_of_birth"/>
                <ReferenceManyField label="Roles " reference="user_role" target="user_id">
                    <SingleFieldList>
                        <ReferenceField source="role_id" reference="role">
                            <ChipField source="name"/>
                        </ReferenceField>
                    </SingleFieldList>

                </ReferenceManyField>
                <EditButton/>
            </Datagrid>
        </List>
        <div>
            <div className="container py-2 d-flex flex-column mvh-100 text-center">
                <div className="row">
                    <div className="col-auto mx-auto">
                        <button
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#myModal"
                        >
                            Open Modal
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal" tabIndex="-1" role="dialog" id="myModal">
                <div
                    className="modal-dialog modal-lg mvh-90 w-100 d-flex flex-column"
                    role="document"
                >
                    <div className="modal-content flex-grow-1">
                        <div className="modal-header">
                            <h5 className="modal-title">Map inside Modal</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body p-0 h-100">
                            <div className="h-100 w-100 position-absolute">
                                {/*modal map is defined here- custom styles and zoom are passed in*/}
                                <Map
                                    apiKey={googleMapsApiKey}
                                    center={[42.302, -71.033]}
                                    styles={modalMapStyles}
                                    zoom={13}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="mx-auto btn btn-secondary"
                                onClick={hideModal}
                            >
                                Close
                            </button>

                        </div>
                        </div>
                </div>
            </div>
        </div>
    </React.Fragment>
);
